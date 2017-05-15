namespace KIKAKU {

  const MATH_REGEX = /Math\s*\.\s*(?:E|LN2|LN10|LOG2E|LOG10E|PI|SQRT1_2|SQRT2|abs|acos|asin|atan2|atan|ceil|exp|floor|log|max|min|pow|random|round|sin|cos|sqrt|tan)/g;
  const FORMULA_REGEX = /^(?:[0-9.eE]|NaN|Infinifty|\!|\=|\?|\:|\+|\-|\*|\/|\%|\~|\&|\||\^|\<|\>|\(|\)|\s)*$/;
  const noop = () => { }

  function parseNumber(value): number {
    if (Utils.isString(value)) {
      if (FORMULA_REGEX.test(value.replace(MATH_REGEX, ''))) {
        try {
          value = eval(value);
        } catch (e) {
          //pass
        }
      }
    }
    value = parseFloat(value);
    if (isNaN(value) || !isFinite(value)) {
      value = 0;
    }
    return value;
  }

  export interface UIParameterOptions {
    title?: boolean | string;
    helpTip?: string | string[];
    height?: number;
    filter?: string;
    stack?: boolean;
    autoSave?: boolean;
    callback?: Function | Function[];
    onDoubleClick?: Function | Function[];
    onChanging?: Function | Function[];
    onEnterKey?: Function | Function[];
    onActivate?: Function | Function[];
    onDeactivate?: Function | Function[];
  }

  class ParameterBase {
    static DEFAULT_HEIGHT = 24;
    private static DEFAULT_OPTIONS: UIParameterOptions = {
      title: true,
      helpTip: null,
      height: null,
      filter: null,
      stack: false,
      autoSave: true,
      callback: noop,
      onDoubleClick: noop,
      onChanging: noop,
      onEnterKey: noop,
      onActivate: noop,
      onDeactivate: noop,
    };
    protected _name: string;
    protected _value;
    protected _options: UIParameterOptions;
    constructor(name: string, value?, options?: UIParameterOptions | Function) {
      this._name = name;
      this._value = value;
      if (Utils.isFunction(options)) {
        this._options = Utils.assign({}, ParameterBase.DEFAULT_OPTIONS, {
          callback: options
        });
      } else {
        this._options = Utils.assign({}, ParameterBase.DEFAULT_OPTIONS, options);
      }
    }
    getHeight(): number { return Parameter.DEFAULT_HEIGHT; }
    doAutoSave(): boolean { return Utils.isUndefined(this._options.autoSave) ? true : this._options.autoSave; }
    build(group: Group, builder: UIBuilder): void { }
    init(obj?: { value?, items?: string[] }) { }
    get(index?: number): any { }
    set(value_or_index, value2?): void { }
    execute(undo = true, ...args): void { }
    enable(index?: number): void { }
    disable(index?: number): void { }
    visiblize(index: number): void { }
    getItems(index?: number): string[] | string[][] { return []; }
    addItems(items_or_index: string | string[] | (string | string[])[] | number, items2?: string | string[]): void { }
    removeItem(item_or_index: string | string[] | number, item2?: string): void { }
    replaceItems(items_or_index: string[] | string[][] | number, items2?: string[]): void { }
    toJSON(): { value?: any; items?: string[] | string[][]; } { return {} }
  }

  class Parameter extends ParameterBase {
    protected _group: Group | Panel;
    protected _builder: UIBuilder;
    protected _initialized: () => boolean = () => { return false; }
    build(group: Group, builder: UIBuilder) {
      this._group = group;
      this._builder = builder;
      this.buildUI();
    }
    protected buildUI() {
      let group = this._group;
      let builder = this._builder;

      let is_title = Utils.isBoolean(this._options.title) ? <boolean>this._options.title : true;
      let title_width = is_title ? builder.getTitleWidth() : 0;
      if (is_title) {
        this.buildTitle(title_width);
      }

      let parameter_width = group.size[0] - title_width;
      this.buildParameter(parameter_width);
    }
    protected buildTitle(width: number) {
      let group = this._group;
      let height = this.getHeight();
      let title_group = <Group>group.add('group', [0, 0, width, height]);
      title_group.minimumSize = title_group.maximumSize = [width, height];
      title_group.spacing = title_group.margins = 0;
      title_group.alignment = ['left', 'top'];

      let title = Utils.isString(this._options.title) ? <string>this._options.title : this._name;
      title_group.add('statictext', undefined, title);
    }
    protected buildParameter(width: number): void { }
    init(obj?: { value?, items?: string[] }) {
      if (Utils.isObject(obj)) {
        if (!Utils.isUndefined(obj.items)) {
          this.replaceItems(obj.items);
        }
        if (!Utils.isUndefined(obj.value)) {
          this.set(obj.value);
        }
      }
      this._initialized = () => { return true; }
    }
    enable() {
      this._group.enabled = true;
    }
    disable() {
      this._group.enabled = false;
    }
    toJSON(): { value?: any; items?: string[] | string[][]; } {
      return {
        value: this.get()
      };
    }
  }

  class SingleParameter extends Parameter {
    protected onChange() {
      this.on('callback');
    }
    protected on(event: string, update = true) {
      if (!this._initialized()) {
        return;
      }

      let builder = this._builder;
      let callback = this._options[event];
      if (Utils.isFunction(callback)) {
        callback.call(builder);
      }
      if (update) {
        builder.update();
      }
    }
  }

  class MultipleParameter<T extends _Control> extends Parameter {
    protected _uis: T[] = [];
    protected onChange(index: number) {
      this.on(index, 'callback', true);
    }
    protected on(index: number, event: string, update = true) {
      if (!this._initialized()) {
        return;
      }

      let builder = this._builder;
      let callback = this._options[event];
      let done = false;
      if (Utils.isFunction(callback)) {
        callback.call(builder, index);
        done = true;
      } else if (Utils.isArray(callback) && Utils.isFunction(callback[index])) {
        callback[index].call(builder, index);
        done = true;
      }

      if (done && update) {
        builder.update();
      }
    }
    enable(index?: number) {
      if (Utils.isNumber(index)) {
        this._uis[index].enabled = true;
      } else {
        super.enable();
      }
    }
    disable(index?: number) {
      if (Utils.isNumber(index)) {
        this._uis[index].enabled = false;
      } else {
        super.disable();
      }
    }
  }

  class HeadingParameter extends Parameter {
    protected _ui: StaticText;
    buildUI() {
      let group = this._group;
      let width = group.size[0];
      let height = group.size[1];

      let heading_group = <Group>group.add('group', [0, 0, width, height]);
      heading_group.minimumSize = [width, height];
      heading_group.spacing = heading_group.margins = 0;
      heading_group.orientation = 'row';
      heading_group.alignment = ['fill', 'top'];
      heading_group.alignChildren = ['fill', 'fill'];

      let heading = this._name;
      if (Utils.isString(this._value)) {
        heading = <string>this._value;
      } else if (Utils.isString(this._options.title)) {
        heading = <string>this._options.title;
      }

      let heading_ui = this._ui = <StaticText>heading_group.add('statictext', [0, 0, width, height], heading);
      heading_ui.justify = 'center';
      if (this._options.helpTip) {
        heading_ui.helpTip = <string>this._options.helpTip;
      }
    }
    get() {
      return this._ui.text;
    }
    set(value) {
      let text = String(value);
      if (text !== this.get()) {
        this._ui.text = text;
        this._builder.update();
      }
    }
  }

  class SeparatorParameter extends Parameter {
    static DEFAULT_HEIGHT = 12;
    getHeight() {
      return SeparatorParameter.DEFAULT_HEIGHT;
    }
    buildUI() {
      let group = this._group;
      let width = group.size[0];
      group.alignChildren = ['fill', 'center'];
      group.add('panel', [0, 0, width, 2]);
    }
  }

  class SpaceParameter extends Parameter {
    getHeight() {
      if (Utils.isNumber(this._value)) {
        this._value = Math.max(this._value, 0);
      } else {
        this._value = 5;
      }
      return this._value;
    }
    buildUI() { }
    enable() { }
    disable() { }
  }

  class PanelParameter extends Parameter {
    private _stack: boolean = false;
    buildUI() {
      let group = <Panel>this._group;
      let text = this._name;
      if (Utils.isString(this._value)) {
        text = this._value;
      } else if (Utils.isString(this._options.title)) {
        text = <string>this._options.title;
      }
      if (Utils.isBoolean(this._options.stack)) {
        this._stack = this._options.stack;
        if (this._stack) {
          this._group.orientation = 'stack';
        }
      }
      group.text = text;
    }
    init() {
      if (this._stack) {
        let children = this._group.children;
        for (let i = 1, l = children.length; i < l; ++i) {
          children[i].visible = false;
        }
      }
    }
    get() {
      return (<Panel>this._group).text;
    }
    set(value) {
      let text = String(value);
      if (text !== this.get()) {
        (<Panel>this._group).text = text;
        this._builder.update();
      }
    }
    visiblize(index: number) {
      if (this._stack) {
        let children = this._group.children;
        let children_num = children.length;
        if (index < 0 || index >= children_num) {
          throw new RangeError;
        }
        for (let i = 0; i < children_num; ++i) {
          if (i === index) {
            children[i].visible = true;
          } else {
            children[i].visible = false;
          }
        }
      }
    }
  }

  class PanelEndParameter extends ParameterBase { }

  class GroupParameter extends Parameter {
    buildUI() { }
  }

  class GroupEndParameter extends ParameterBase { }

  //text parameter
  class TextBaseParameter extends SingleParameter {
    protected getCreationProperties(): any {
      return {};
    }
    protected _ui: EditText | StaticText;
    get() {
      return this._ui.text;
    }
    set(value) {
      let text = String(value);
      if (text !== this.get()) {
        this._ui.text = text;
        this.onChange();
      }
    }
  }


  class TextsBaseParameter extends MultipleParameter<(EditText | StaticText)> {
    protected getCreationProperties(): any {
      return {};
    }
    init(obj?) {
      this.set(this._value);
      super.init(obj);
    }
    get(index?: number): string | string[] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        return this._uis[index].text;
      }

      let values: string[] = [];
      for (let ui of this._uis) {
        values.push(ui.text);
      }

      return values;
    }
    set(value_or_index, value2?) {
      if (!Utils.isUndefined(value2)) {
        let index: number = value_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let value = String(value2);
        if (value !== this.get(index)) {
          this._uis[index].text = value;
          this.onChange(index);
        }
      } else {
        if (Utils.isArray(value_or_index)) {
          let value = (<any[]>value_or_index).slice(0, this._uis.length);
          Utils.forEach(value, (value, i: number) => {
            this.set(i, value);
          });
        }
      }
    }
  }

  class TextParameter extends TextBaseParameter {
    buildParameter(width: number) {
      let group = this._group;
      let value: string = this._value || '';

      let text_ui = this._ui = <EditText>group.add('edittext', undefined, value, this.getCreationProperties());
      if (this._options.helpTip) {
        text_ui.helpTip = <string>this._options.helpTip;
      }
      text_ui.onChange = () => { this.onChange(); };
      text_ui.onChanging = () => { this.on('onChanging', false); };
      text_ui.onEnterKey = () => { this.on('onEnterKey', false); };
      text_ui.onActivate = () => { this.on('onActivate', false); };
      text_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
  }

  class TextsParameter extends TextsBaseParameter {
    buildParameter() {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let ui = <EditText>group.add('edittext', undefined, '', this.getCreationProperties());
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.onChange = ((index: number) => {
          return () => { this.onChange(index); };
        })(i);
        ui.onChanging = ((index: number) => {
          return () => { this.on(index, 'onChanging', false); };
        })(i);
        ui.onEnterKey = ((index: number) => {
          return () => { this.on(index, 'onEnterKey', false); };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);
        this._uis.push(ui);
      });
    }
  }

  class TextAreaParameter extends TextParameter {
    static DEFAULT_HEIGHT = 80;
    protected getCreationProperties(): any {
      return {
        multiline: true,
        scrolling: true
      };
    }
    getHeight() {
      let height = TextAreaParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = this._options.height;
      }
      return height;
    }
  }

  class TextAreasParameter extends TextsParameter {
    static DEFAULT_HEIGHT = 80;
    protected getCreationProperties(): any {
      return {
        multiline: true,
        scrolling: true
      };
    }
    getHeight() {
      let height = TextAreasParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = this._options.height;
      }
      return height;
    }
  }

  class StaticTextParameter extends TextBaseParameter {
    buildParameter(width: number) {
      let group = this._group;
      let value: string = this._value || '';

      let text_ui = this._ui = <StaticText>group.add('statictext', undefined, value, this.getCreationProperties());
      if (this._options.helpTip) {
        text_ui.helpTip = <string>this._options.helpTip;
      }
    }
  }

  class StaticTextsParameter extends TextsBaseParameter {
    buildParameter() {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let ui = <EditText>group.add('statictext', undefined, '', this.getCreationProperties());
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        this._uis.push(ui);
      });
    }
  }

  class StaticTextAreaParameter extends StaticTextParameter {
    static DEFAULT_HEIGHT = 80;
    protected getCreationProperties(): any {
      return {
        multiline: true,
        truncate: 'end',
      };
    }
    getHeight() {
      let height = TextAreaParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = this._options.height;
      }
      return height;
    }
  }

  class StaticTextAreasParameter extends StaticTextsParameter {
    static DEFAULT_HEIGHT = 80;
    protected getCreationProperties(): any {
      return {
        multiline: true,
        truncate: 'end',
      };
    }
    getHeight() {
      let height = TextAreasParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = this._options.height;
      }
      return height;
    }
  }

  //number parameter
  function numberOnChange(parameter: ParameterBase, options?: { minvalue?: number; maxvalue?: number; index?: number; }) {
    let _options: { minvalue?: number; maxvalue?: number; index?: number; } = Utils.assign({
      minvalue: -Infinity,
      maxvalue: Infinity,
      index: null
    }, options);

    return function () {
      let value = Utils.clamp(parseNumber(this.text), _options.minvalue, _options.maxvalue);
      this.text = value + '';
      (<any>parameter).onChange(_options.index);
    };
  }

  function extractNumberValue(value): { value: number; minvalue: number; maxvalue: number; } {
    let default_value = 0;
    let minvalue = -Infinity;
    let maxvalue = Infinity;

    if (Utils.isObject(value)) {
      if (Utils.isNumber(value.value)) {
        default_value = value.value;
      }
      if (Utils.isNumber(value.minvalue)) {
        minvalue = value.minvalue;
      }
      if (Utils.isNumber(value.maxvalue)) {
        maxvalue = value.maxvalue;
      }
    } else if (Utils.isNumber(value)) {
      default_value = value;
    }

    return {
      value: default_value,
      minvalue: minvalue,
      maxvalue: maxvalue
    };
  }

  class NumberParameter extends SingleParameter {
    protected _ui: EditText;
    protected _minvalue: number;
    protected _maxvalue: number;
    buildParameter(width: number) {
      let group = this._group;
      let minmax = extractNumberValue(this._value);

      this._minvalue = minmax.minvalue;
      this._maxvalue = minmax.maxvalue;

      let number_ui = this._ui = group.add('edittext', undefined, String(minmax.value));
      if (this._options.helpTip) {
        number_ui.helpTip = <string>this._options.helpTip;
      }

      number_ui.onChange = numberOnChange(this, {
        minvalue: this._minvalue,
        maxvalue: this._maxvalue
      });
      number_ui.onEnterKey = () => { this.on('onEnterKey', false); };
      number_ui.onActivate = () => { this.on('onActivate', false); };
      number_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
    get() {
      return parseFloat(this._ui.text);
    }
    set(value) {
      let num = Utils.clamp(parseNumber(value), this._minvalue, this._maxvalue);
      if (num !== this.get()) {
        this._ui.text = num + '';
        this.onChange();
      }
    }
  }

  class NumbersParameter extends MultipleParameter<EditText> {
    protected _default_values: number[] = [];
    protected _minvalues: number[] = [];
    protected _maxvalues: number[] = [];
    buildParameter() {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let minmax = extractNumberValue(value);
        let ui = <EditText>group.add('edittext', undefined, '');
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.onChange = numberOnChange(this, {
          minvalue: minmax.minvalue,
          maxvalue: minmax.maxvalue,
          index: i
        });
        ui.onEnterKey = ((index: number) => {
          return () => { this.on(index, 'onEnterKey', false); };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);

        this._default_values.push(minmax.value);
        this._minvalues.push(minmax.minvalue);
        this._maxvalues.push(minmax.maxvalue);
        this._uis.push(ui);
      });
    }
    init(obj) {
      this.set(this._default_values);
      super.init(obj);
    }
    get(index?: number): number | number[] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        return parseFloat(this._uis[index].text);
      }

      let values: number[] = [];
      for (let ui of this._uis) {
        values.push(parseFloat(ui.text));
      }

      return values;
    }
    set(value_or_index, value2?) {
      if (!Utils.isUndefined(value2)) {
        let index: number = value_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let value = Utils.clamp(parseNumber(value2), this._minvalues[index], this._maxvalues[index]);
        if (value !== this.get(index)) {
          this._uis[index].text = value + '';
          this.onChange(index);
        }
      } else {
        if (Utils.isArray(value_or_index)) {
          let value = (<any[]>value_or_index).slice(0, this._uis.length);
          Utils.forEach(value, (value, i: number) => {
            this.set(i, value);
          });
        }
      }
    }
  }

  function extractSliderValue(obj): { value?: number; minvalue?: number; maxvalue?: number; } {
    let value: { value?: number; minvalue?: number; maxvalue?: number; } = {};

    if (Utils.isObject(obj)) {
      if (Utils.isNumber(obj.minvalue)) {
        value.minvalue = obj.minvalue;
      }
      if (Utils.isNumber(obj.maxvalue)) {
        value.maxvalue = obj.maxvalue;
      }
      if (Utils.isNumber(obj.value)) {
        value.value = obj.value;
      }
    } else if (Utils.isNumber(obj)) {
      value.value = obj;
    }

    return value;
  }

  class SliderParameter extends SingleParameter {
    protected _ui: Slider;
    protected _number_ui: EditText;
    protected _minvalue: number;
    protected _maxvalue: number;
    buildParameter(width: number) {
      const self = this;
      let group = this._group;
      let value: { value: number; minvalue: number; maxvalue: number; } = Utils.assign({
        value: 0,
        minvalue: 0,
        maxvalue: 100
      }, extractSliderValue(this._value));

      this._minvalue = value.minvalue;
      this._maxvalue = value.maxvalue;

      let height = group.size[1];
      let number_width = Math.min(0.25 * width, 50);
      let slider_width = width - number_width;

      let slider_ui = this._ui = <Slider>group.add('slider', undefined, value.value, value.minvalue, value.maxvalue);
      slider_ui.preferredSize = [slider_width, height];

      let number_ui = this._number_ui = <EditText>group.add('edittext', undefined, String(value.value));
      number_ui.preferredSize = [number_width, height];
      number_ui.maximumSize = [Math.max(number_width, 100), height];

      if (this._options.helpTip) {
        slider_ui.helpTip = <string>this._options.helpTip;
        number_ui.helpTip = <string>this._options.helpTip;
      }

      slider_ui.onChange = function () {
        number_ui.text = this.value;
        self.onChange();
      };
      slider_ui.onActivate = () => { this.on('onActivate', false); };
      slider_ui.onDeactivate = () => { this.on('onDeactivate', false); };

      number_ui.onChange = function () {
        let value = Utils.clamp(parseNumber(this.text), self._minvalue, self._maxvalue);
        this.text = value;
        slider_ui.value = value;
        self.onChange();
      };
      number_ui.onEnterKey = () => { this.on('onEnterKey', false); };
      number_ui.onActivate = () => { this.on('onActivate', false); };
      number_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
    get() {
      return this._ui.value;
    }
    set(value) {
      let num = Utils.clamp(parseNumber(value), this._minvalue, this._maxvalue);

      if (num !== this.get()) {
        this._ui.value = num;
        this._number_ui.text = num + '';
        this.onChange();
      }
    }
  }

  //point parameter
  class PointParameterBase extends SingleParameter {
    protected _uis: EditText[] = [];
    protected getDimensions() {
      return 2;
    }
    buildParameter() {
      if (!Utils.isArray(this._value)) {
        this._value = [];
        for (let i = 0; i < this.getDimensions(); i++) {
          this._value.push(0);
        }
      } else {
        for (let i = 0; i < this.getDimensions(); i++) {
          this._value[i] = parseNumber(this._value[i]);
        }
      }

      let group = this._group;
      for (let i = 0; i < this.getDimensions(); i++) {
        let ui = group.add('edittext', undefined, '0');
        if (this._options.helpTip) {
          ui.helpTip = <string>this._options.helpTip;
        }
        ui.onChange = numberOnChange(this);
        ui.onEnterKey = () => { this.on('onEnterKey', false); };
        ui.onActivate = () => { this.on('onActivate', false); };
        ui.onDeactivate = () => { this.on('onDeactivate', false); };
        this._uis.push(ui);
      }
    }
    init(obj) {
      this.set(this._value);
      super.init(obj);
    }
    get() {
      let value: number[] = [];
      for (let i = 0; i < this.getDimensions(); i++) {
        value.push(parseFloat(this._uis[i].text));
      }
      return value;
    }
    set(value) {
      if (!(Utils.isArray(value) && value.length === this.getDimensions())) {
        throw new Error('Invalid value');
      }
      let point: number[] = [];
      let current_point = this.get();
      let is_same = true;
      for (let i = 0; i < this.getDimensions(); i++) {
        point[i] = parseNumber(value[i]);
        if (point[i] !== current_point[i]) {
          is_same = false;
        }
      }
      if (!is_same) {
        for (let i = 0; i < this.getDimensions(); i++) {
          this._uis[i].text = point[i] + '';
        }
        this.onChange();
      }
    }
  }

  class PointParameter extends PointParameterBase { }

  class Point3DParameter extends PointParameterBase {
    protected getDimensions() {
      return 3;
    }
  }

  //file parameter
  class FileParameter extends TextParameter {
    buildParameter(width: number) {
      let group = this._group;
      let height = group.size[1];
      let value = this._value || '';

      let path_ui = this._ui = group.add('edittext', undefined, value);
      if (this._options.helpTip) {
        path_ui.helpTip = <string>this._options.helpTip;
      }
      path_ui.onChange = () => { this.onChange(); }
      path_ui.onEnterKey = () => { this.on('onEnterKey', false); };
      path_ui.onActivate = () => { this.on('onActivate', false); };
      path_ui.onDeactivate = () => { this.on('onDeactivate', false); };

      let filter = Utils.isString(this._options.filter) ? this._options.filter : undefined;
      let browse_ui: Button = group.add('button', undefined, '...');
      browse_ui.maximumSize = [20, height];
      browse_ui.alignment = ['right', 'fill'];
      browse_ui.onClick = browse_ui.onEnterKey = () => {
        let file = <File>File.openDialog(undefined, filter, false);
        if (file) {
          if (path_ui.text !== file.absoluteURI) {
            path_ui.text = file.absoluteURI;
            this.onChange();
          }
        }
      };
    }
  }

  class FolderParameter extends TextParameter {
    buildParameter(width: number) {
      let group = this._group;
      let height = group.size[1];
      let value = this._value || '';

      let path_ui = this._ui = group.add('edittext', undefined, value);
      if (this._options.helpTip) {
        path_ui.helpTip = <string>this._options.helpTip;
      }
      path_ui.onChange = () => { this.onChange(); }
      path_ui.onEnterKey = () => { this.on('onEnterKey', false); };
      path_ui.onActivate = () => { this.on('onActivate', false); };
      path_ui.onDeactivate = () => { this.on('onDeactivate', false); };

      let browse_ui: Button = group.add('button', undefined, '...');
      browse_ui.maximumSize = [20, height];
      browse_ui.alignment = ['right', 'fill'];
      browse_ui.onClick = browse_ui.onEnterKey = () => {
        let folder = <Folder>Folder.selectDialog();
        if (folder && folder instanceof Folder) {
          if (path_ui.text !== folder.absoluteURI) {
            path_ui.text = folder.absoluteURI;
            this.onChange();
          }
        }
      };
    }
  }

  //checkbox parameter
  function extractCheckboxValue(obj): { value: boolean; text: string; } {
    let value: boolean = true;
    let text = '';

    if (Utils.isObject(obj)) {
      if (Utils.isBoolean(obj.value)) {
        value = obj.value;
      }
      if (Utils.isString(obj.text)) {
        text = obj.text;
      }
    } else {
      value = !!obj;
    }

    return {
      value: value,
      text: text
    };
  }

  class CheckboxParameter extends SingleParameter {
    protected _ui: Checkbox;
    buildParameter(width: number) {
      let group = this._group;
      let check = extractCheckboxValue(this._value);

      let checkbox_ui = this._ui = <Checkbox>group.add('checkbox', undefined, check.text);
      if (this._options.helpTip) {
        checkbox_ui.helpTip = <string>this._options.helpTip;
      }
      checkbox_ui.alignment = ['fill', 'bottom'];
      checkbox_ui.value = check.value;
      checkbox_ui.onClick = () => {
        this.onChange();
      };
      checkbox_ui.onActivate = () => { this.on('onActivate', false); };
      checkbox_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
    get() {
      return this._ui.value;
    }
    set(value) {
      let check = !!value;
      if (check !== this.get()) {
        this._ui.value = check;
        this.onChange();
      }
    }
  }

  class CheckboxesParameter extends MultipleParameter<Checkbox> {
    protected _texts: string[] = [];
    buildParameter() {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let check = extractCheckboxValue(value);
        let ui = <Checkbox>group.add('checkbox', undefined, check.text);
        ui.alignment = ['fill', 'bottom'];
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.value = check.value;
        ui.onClick = ((index: number) => {
          return () => { this.onChange(index); };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);
        this._texts.push(check.text);
        this._uis.push(ui);
      });
    }
    init(obj) {
      Utils.forEach(this._uis, (ui: Checkbox, i: number) => {
        ui.text = this._texts[i];
      });
      super.init(obj);
    }
    get(index?: number): boolean | boolean[] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        return this._uis[index].value;
      }

      let values: boolean[] = [];
      for (let ui of this._uis) {
        values.push(ui.value);
      }

      return values;
    }
    set(value_or_index, value2?) {
      if (!Utils.isUndefined(value2)) {
        let index: number = value_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let value = !!value2;
        if (value !== this.get(index)) {
          this._uis[index].value = value;
          this.onChange(index);
        }
      } else {
        if (Utils.isArray(value_or_index)) {
          let value = (<any[]>value_or_index).slice(0, this._uis.length);
          Utils.forEach(value, (value, i: number) => {
            this.set(i, value);
          });
        }
      }
    }
  }

  //radiobutton parameter
  class RadiobuttonParameter extends SingleParameter {
    protected _uis: RadioButton[] = [];
    buildParameter(width: number) {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let ui = <RadioButton>group.add('radiobutton', undefined);
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        if (i === 0) {
          ui.value = true;
        }
        ui.onClick = ((index: number) => {
          return () => { this.onChange(); };
        })(i);
        this._uis.push(ui);
      });
    }
    init(obj) {
      Utils.forEach(this._uis, (ui: RadioButton, i: number) => {
        ui.text = this._value[i] || '';
      });
      super.init(obj);
    }
    get() {
      let text = '';
      for (let ui of this._uis) {
        if (ui.value) {
          text = ui.text;
          break;
        }
      }
      return text;
    }
    set(value) {
      let text = String(value);
      for (let ui of this._uis) {
        if (ui.text === text) {
          if (!ui.value) {
            ui.value = true;
            this.onChange();
          }
          break;
        }
      }
    }
  }

  //color paramter
  type Color = [number, number, number, number];

  function parseColor(value): Color {
    let color: Color = [1, 0, 0, 1];
    if (Utils.isArray(value)) {
      for (let i = 0, l = Math.min(value.length, 3); i < l; i++) {
        color[i] = Utils.clamp(parseNumber(value[i]));
      }
    }
    return color;
  }

  function isSameColor(c1: number[], c2: number[]) {
    for (let i = 0; i < 3; i++) {
      if (c1[i] !== c2[i]) {
        return false;
      }
    }
    return true;
  }

  function hexToRgb(hex: number): Color {
    let r = (hex >> 16) & 255,
      g = (hex >> 8) & 255,
      b = hex & 255;
    return [r / 255, g / 255, b / 255, 1];
  }

  function rgbToHex(rgb: number[]) {
    let r = ~~(255 * rgb[0]) << 16,
      g = ~~(255 * rgb[1]) << 8,
      b = ~~(255 * rgb[2]);
    return r | g | b;
  }

  class ColorParameter extends SingleParameter {
    protected _ui: Button;
    protected _color: Color;
    buildParameter() {
      let group = this._group;
      this._color = parseColor(this._value);

      let color_ui = this._ui = <Button>group.add('button', undefined);
      if (this._options.helpTip) {
        color_ui.helpTip = <string>this._options.helpTip;
      }

      color_ui.onDraw = () => {
        let graphics = color_ui.graphics;
        graphics.rectPath(0, 0, color_ui.size[0], color_ui.size[1]);
        graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, this._color));
        if (!color_ui.enabled) {
          graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0.3]));
        }
      };
      color_ui.onClick = color_ui.onEnterKey = () => {
        let hex = $.colorPicker(rgbToHex(this._color));
        if (hex !== -1) {
          this._color = hexToRgb(hex);
          this.onChange();
        }
      };
      color_ui.onActivate = () => { this.on('onActivate', false); };
      color_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
    onChange() {
      super.onChange();
      this._ui.notify('onDraw');
    }
    get() {
      return this._color;
    }
    set(value) {
      let color = parseColor(value);
      if (!isSameColor(color, this._color)) {
        this._color = color;
        this.onChange();
      }
    }
  }

  class ColorsParameter extends MultipleParameter<Button> {
    protected _colors: Color[] = [];
    buildParameter() {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let color = parseColor(value);
        let ui = <Button>group.add('button', undefined, '');
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.onDraw = ((index: number) => {
          return () => {
            let graphics = ui.graphics;
            graphics.rectPath(0, 0, ui.size[0], ui.size[1]);
            graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, this._colors[i]));
            if (!ui.enabled) {
              graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0.3]));
            }
          };
        })(i);
        ui.onClick = ui.onEnterKey = ((index: number) => {
          return () => {
            let hex = $.colorPicker(rgbToHex(this._colors[i]));
            if (hex !== -1) {
              this._colors[i] = hexToRgb(hex);
              this.onChange(i);
            }
          };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);
        this._colors.push(color);
        this._uis.push(ui);
      });
    }
    onChange(index: number) {
      super.onChange(index);
      this._uis[index].notify('onDraw');
    }
    get(index?: number): Color | Color[] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        return this._colors[index];
      }

      let values: Color[] = [];
      for (let color of this._colors) {
        values.push(<Color>color.slice());
      }

      return values;
    }
    set(value_or_index, value2?) {
      if (!Utils.isUndefined(value2)) {
        let index: number = value_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let color = parseColor(value2);
        if (!isSameColor(color, this._colors[index])) {
          this._colors[index] = color;
          this.onChange(index);
        }
      } else {
        if (Utils.isArray(value_or_index)) {
          let value = (<any[]>value_or_index).slice(0, this._uis.length);
          Utils.forEach(value, (value, i: number) => {
            this.set(i, value);
          });
        }
      }
    }
  }

  //item parameter
  function extractItemValue(obj): { value: string; items: string[]; } {
    var value: string = null,
      items: string[] = [];

    if (Utils.isObject(obj)) {
      if (!Utils.isUndefined(obj.value)) {
        value = obj.value;
      }
      if (Utils.isArray(obj.items)) {
        items = obj.items;
      }
    } else if (Utils.isArray(obj)) {
      items = obj;
    }

    return {
      value: value,
      items: items
    };
  }

  function processItemUI(ui: DropDownList | ListBox, lock: { lock: boolean; }, builder: UIBuilder, fn: (ui: DropDownList | ListBox) => void) {
    try {
      lock.lock = true;
      fn(ui);
      if (ui.selection === null) {
        if (ui.items.length) {
          ui.selection = ui.items[0];
        }
      }
    } catch (e) {
      //pass
    } finally {
      lock.lock = false;
      builder.update();
    }
  }

  class ItemParameter extends SingleParameter {
    protected _ui: DropDownList | ListBox;
    protected _default_value: string;
    protected _lock: { lock: boolean; } = { lock: false };
    init(obj) {
      if (this._default_value) {
        this.set(this._default_value);
      }
      super.init(obj);
    }
    get() {
      if (this._ui.selection === null) {
        return null;
      }
      return (<ListItem>this._ui.selection).text;
    }
    set(value) {
      let text = String(value);
      let ui = this._ui;
      let current_index = ui.selection === null ? -1 : (<ListItem>ui.selection).index;
      for (let i = 0, l = ui.items.length; i < l; i++) {
        let item = ui.items[i];
        if (item.text === text) {
          if (current_index !== i) {
            ui.selection = item;
            this.onChange();
          }
          break;
        }
      }
    }
    getItems() {
      let items: string[] = [];
      for (let item of this._ui.items) {
        items.push(item.text);
      }
      return items;
    }
    replaceItems(items: string[]) {
      processItemUI(this._ui, this._lock, this._builder, (ui) => {
        ui.removeAll();
        for (let item of items) {
          ui.add('item', item);
        }
      });
    }
    addItems(items: string | string[]) {
      items = Utils.isArray(items) ? items : [<string>items];
      processItemUI(this._ui, this._lock, this._builder, (ui) => {
        for (let item of <string[]>items) {
          ui.add('item', item);
        }
      });
    }
    removeItem(item: string) {
      processItemUI(this._ui, this._lock, this._builder, (ui) => {
        ui.remove(item);
      });
    }
    toJSON() {
      return {
        value: this.get(),
        items: this.getItems()
      };
    }
  }

  class ItemsParameter extends MultipleParameter<(DropDownList | ListBox)> {
    protected _default_values: { value: string; items: string[]; }[] = [];
    protected _locks: { lock: boolean; }[] = [];
    init(obj) {
      for (let i = 0, l = this._uis.length; i < l; i++) {
        this.replaceItems(i, this._default_values[i].items);
        this.set(i, this._default_values[i].value);
      }
      super.init(obj);
    }
    get(index?: number): string | string[] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let ui = this._uis[index];
        if (ui.selection === null) {
          return null;
        } else {
          return (<ListItem>ui.selection).text;
        }
      }

      let values: string[] = [];
      for (let ui of this._uis) {
        if (ui.selection === null) {
          values.push(null);
        } else {
          values.push((<ListItem>ui.selection).text);
        }
      }
      return values;
    }
    set(value_or_index, value2?) {
      if (!Utils.isUndefined(value2)) {
        let index: number = value_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let text = String(value2);
        let ui = this._uis[index];
        let current_index = ui.selection === null ? -1 : (<ListItem>ui.selection).index;
        for (let i = 0, l = ui.items.length; i < l; i++) {
          let item = ui.items[i];
          if (item.text === text) {
            if (current_index !== i) {
              ui.selection = item;
              this.onChange(index);
            }
            break;
          }
        }

      } else {
        if (Utils.isArray(value_or_index)) {
          let value = (<any[]>value_or_index).slice(0, this._uis.length);
          Utils.forEach(value, (value, i: number) => {
            this.set(i, value);
          });
        }
      }
    }
    getItems(index?: number): string[] | string[][] {
      if (Utils.isNumber(index)) {
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let ui = this._uis[index];
        let items: string[] = [];
        for (let item of ui.items) {
          items.push(item.text);
        }

        return items;
      }

      let items: string[][] = [];
      Utils.forEach(this._uis, (ui, i: number) => {
        items.push(<string[]>this.getItems(i));
      });
      return items;
    }
    replaceItems(items_or_index: string[] | number, items2?: string[]) {
      if (!Utils.isUndefined(items2)) {
        let index = <number>items_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let items = items2;
        processItemUI(this._uis[index], this._locks[index], this._builder, (ui) => {
          ui.removeAll();
          for (let item of items) {
            ui.add('item', item);
          }
        });
        return;
      }

      Utils.forEach(items_or_index, (items: string[], i: number) => {
        this.replaceItems(i, items);
      });
    }
    addItems(items_or_index: string | string[] | (string | string[])[] | number, items2?: string | string[]) {
      if (!Utils.isUndefined(items2)) {
        let index = <number>items_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let items: string[] = Utils.isArray(items2) ? <string[]>items2 : [<string>items2];
        processItemUI(this._uis[index], this._locks[index], this._builder, (ui) => {
          for (let item of items) {
            ui.add('item', item);
          }
        });
        return;
      }

      Utils.forEach(items_or_index, (items: string | string[], i: number) => {
        this.addItems(i, items);
      });
    }
    removeItem(item_or_index: string | string[] | number, item2?: string) {
      if (!Utils.isUndefined(item2)) {
        let index = <number>item_or_index;
        if (index < 0 || index >= this._uis.length) {
          throw new RangeError;
        }
        let item = item2;
        processItemUI(this._uis[index], this._locks[index], this._builder, (ui) => {
          ui.remove(item);
        });
        return;
      }

      Utils.forEach(item_or_index, (item: string, i: number) => {
        this.removeItem(i, item);
      });
    }
    toJSON() {
      return {
        value: this.get(),
        items: this.getItems()
      };
    }
  }

  class PopupParameter extends ItemParameter {
    buildParameter(width: number) {
      let group = this._group;
      let value = extractItemValue(this._value);
      this._default_value = value.value;
      let popup_ui = this._ui = <DropDownList>group.add('dropdownlist', undefined, value.items);
      if (this._options.helpTip) {
        popup_ui.helpTip = <string>this._options.helpTip;
      }
      if (popup_ui.items.length) {
        popup_ui.selection = popup_ui.items[0];
      }
      popup_ui.onChange = () => {
        if (!this._lock.lock) {
          this.onChange();
        }
      };
      popup_ui.onActivate = () => { this.on('onActivate', false); };
      popup_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
  }

  class PopupsParameter extends ItemsParameter {
    buildParameter(width: number) {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let default_value = extractItemValue(value);
        let ui = <DropDownList>group.add('dropdownlist', undefined, []);
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.onChange = ((index: number) => {
          return () => {
            if (!this._locks[index].lock) {
              this.onChange(index);
            }
          };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);
        this._default_values.push(default_value);
        this._locks.push({ lock: false });
        this._uis.push(ui);
      });
    }
  }

  class ListboxParameter extends ItemParameter {
    static DEFAULT_HEIGHT = 80
    getHeight() {
      let height = ListboxParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = Math.max(0, this._options.height);
      }
      return height;
    }
    buildParameter(width: number) {
      let group = this._group;
      let value = extractItemValue(this._value);
      this._default_value = value.value;
      let listbox_ui = this._ui = <ListBox>group.add('listbox', undefined, value.items);
      if (this._options.helpTip) {
        listbox_ui.helpTip = <string>this._options.helpTip;
      }
      listbox_ui.onChange = () => {
        if (!this._lock.lock) {
          this.onChange();
        }
      };
      listbox_ui.onDoubleClick = () => {
        if (!this._lock.lock) {
          this.on('onDoubleClick', false);
        }
      };
      listbox_ui.onActivate = () => { this.on('onActivate', false); };
      listbox_ui.onDeactivate = () => { this.on('onDeactivate', false); };
    }
  }

  class ListboxesParameter extends ItemsParameter {
    static DEFAULT_HEIGHT = 80
    getHeight() {
      let height = ListboxesParameter.DEFAULT_HEIGHT;
      if (Utils.isNumber(this._options.height)) {
        height = Math.max(0, this._options.height);
      }
      return height;
    }
    buildParameter(width: number) {
      let group = this._group;
      let help_tip = this._options.helpTip;

      Utils.forEach(this._value, (value, i: number) => {
        let default_value = extractItemValue(value);
        let ui = <ListBox>group.add('listbox', undefined, []);
        if (Utils.isString(help_tip)) {
          ui.helpTip = <string>help_tip;
        } else if (Utils.isArray(help_tip) && Utils.isString(help_tip[i])) {
          ui.helpTip = help_tip[i];
        }
        ui.onChange = ((index: number) => {
          return () => {
            if (!this._locks[index].lock) {
              this.onChange(index);
            }
          };
        })(i);
        ui.onDoubleClick = ((index: number) => {
          return () => {
            if (!this._locks[index].lock) {
              this.on(index, 'onDoubleClick', false);
            }
          };
        })(i);
        ui.onActivate = ((index: number) => {
          return () => { this.on(index, 'onActivate', false); };
        })(i);
        ui.onDeactivate = ((index: number) => {
          return () => { this.on(index, 'onDeactivate', false); };
        })(i);
        this._default_values.push(default_value);
        this._locks.push({ lock: false });
        this._uis.push(ui);
      });
    }
  }

  //script
  class ScriptParameter extends Parameter {
    protected _ui: Button;
    protected _title: string;
    protected _callback: Function;
    protected _undo: boolean = true;
    buildUI() {
      let group = this._group;
      let builder = this._builder;
      let name = this._name;
      let title = name;
      let callback: Function = noop;
      let help_tip: string = null;
      let value = this._value;
      if (Utils.isFunction(value)) {
        callback = value;
      } else if (Utils.isObject(value)) {
        if (Utils.isString(value.title)) {
          title = value.title;
        }
        if (Utils.isFunction(value.callback)) {
          callback = value.callback;
        }
        if (value.helpTip) {
          help_tip = value.helpTip;
        }
        if (Utils.isBoolean(value.undo)) {
          this._undo = value.undo;
        }
      }

      this._title = title;
      this._callback = callback;

      let ui: Button;
      switch (title.toLowerCase()) {
        case 'ok':
          ui = this._ui = <Button>group.add('button', undefined, 'Dummy', { name: 'ok' });
          break;
        case 'cancel':
          ui = this._ui = <Button>group.add('button', undefined, 'Dummy', { name: 'cancel' });
          break;
        default:
          ui = this._ui = <Button>group.add('button', undefined, 'Dummy');
          break;
      }
      ui.alignment = ['fill', 'fill'];
      if (help_tip) {
        ui.helpTip = help_tip;
      }
      ui.onClick = () => {
        this.execute();
      };
    }
    init() {
      this._ui.text = this._title;
    }
    execute(undo = this._undo, ...args) {
      let builder = this._builder;
      let callback = this._callback;
      let value;
      try {
        if (undo) {
          app.beginUndoGroup(builder.getName() + ': ' + this._name);
        }
        value = callback.apply(builder, args);
      } catch (e) {
        alert(e);
      } finally {
        if (undo) {
          app.endUndoGroup();
        }
      }
      return value;
    }
    enable() {
      this._ui.enabled = true;
    }
    disable() {
      this._ui.enabled = false;
    }
    get() {
      return this._ui.text;
    }
    set(value) {
      let text = String(value);
      if (text !== this.get()) {
        this._ui.text = text;
        this._builder.update();
      }
    }
    toJSON() {
      return {};
    }
  }

  //help parameter
  class HelpParameter extends ParameterBase {
    protected _ui: Button;
    build(group: Group, builder: UIBuilder) {
      let name = this._name;
      let value = this._value;
      let callback: Function = Utils.isFunction(value) ? value : () => {
        alert(value, name);
      };

      let help_ui = this._ui = <Button>group.add('button', [0, 0, 20, 20], '?');
      help_ui.onClick = () => {
        callback.call(builder);
      };
    }
  }

  //setting manager
  class UISettingManger {
    private _setting_manager: SettingManager;
    private _name: string;
    private _obj: any = {};
    private _initilized = () => { return false; }
    constructor(section: string, name: string) {
      this._setting_manager = new SettingManager(section);
      this._name = name;
    }
    private _have() {
      return this._setting_manager.have(this._name);
    }
    private _initialize() {
      if (!this._initilized()) {
        if (this._have()) {
          try {
            this._obj = this._setting_manager.get(this._name, {});
          } catch (e) {
            //pass
          }
        }
        this._initilized = () => { return true; }
      }
    }
    private _empty() {
      for (let key in this._obj) {
        return false;
      }
      return true;
    }
    get(key: string, default_value) {
      this._initialize();
      if (Utils.isUndefined(this._obj[key])) {
        return default_value;
      }
      return this._obj[key];
    }
    private _save() {
      this._setting_manager.save(this._name, this._obj);
    }
    save(key: string, value) {
      this._initialize();

      this._obj[key] = value;
      this._save();
    }
    private _delete() {
      this._setting_manager.delete(this._name);
    }
    delete(key: string) {
      this._initialize();
      if (this._obj[key]) {
        delete this._obj[key];
      }
      if (this._have()) {
        if (this._empty()) {
          this._delete();
        } else {
          this._save();
        }
      }
    }
  }

  //file manager
  export type FileType = 'txt' | 'json';

  class UIFileManager {
    static FILE_TYPE = {
      TEXT: 'txt',
      JSON: 'json'
    };
    private _file_manager: FileManager;
    private _file_type: FileType;
    constructor(root: string, file_type: FileType) {
      this._file_manager = new FileManager(root);
      this._file_type = file_type;
    }
    getFileNames() {
      let file_type = this._file_type;
      let file_names = this._file_manager.getFileNames({
        mask: '*.' + file_type
      });
      let re = new RegExp('\.' + file_type + '$');
      file_names = Utils.map(file_names, (file_name: string) => {
        return file_name.replace(re, '');
      });

      return file_names;
    }
    exists(filename: string) {
      filename += '.' + this._file_type;
      return this._file_manager.exists(filename);
    }
    get(filename: string) {
      filename += '.' + this._file_type;
      let data: any = this._file_manager.get(filename);
      if (data && this._file_type === UIFileManager.FILE_TYPE.JSON) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          //pass
        }
      }
      return data;
    }
    save(filename: string, data) {
      filename += '.' + this._file_type;
      if (this._file_type === UIFileManager.FILE_TYPE.JSON) {
        data = JSON.stringify(data);
      }
      this._file_manager.save(filename, data);
    }
    delete(filename: string) {
      filename += '.' + this._file_type;
      return this._file_manager.delete(filename);
    }
  }

  //api
  export interface UIAPI {
    (script_name: string, api_name: string, ...args): any;
    exists(script_name: string, api_name?: string): boolean;
    add(script_name: string, api_name: string, fn: Function, ctx?): void;
    remove(script_name: string): boolean;
  }

  const api_scripts: {
    [script_name: string]: {
      [api_name: string]: {
        fn: Function;
        ctx;
      };
    };
  } = {};

  let API: UIAPI = <UIAPI>function (script_name: string, api_name: string, ...args) {
    if (api_scripts[script_name] && api_scripts[script_name][api_name]) {
      let api = api_scripts[script_name][api_name];
      return api.fn.apply(api.ctx, args);
    }
    throw new Error('API error');
  };

  API.exists = function (script_name: string, api_name?: string) {
    if (Utils.isUndefined(api_name)) {
      return !!api_scripts[script_name];
    }
    return !!api_scripts[script_name] && !!api_scripts[script_name][api_name];
  };

  API.add = function (script_name: string, api_name: string, fn: Function, ctx?) {
    if (!api_scripts[script_name]) {
      api_scripts[script_name] = {};
    }
    api_scripts[script_name][api_name] = {
      fn: fn,
      ctx: ctx
    };
  };

  API.remove = function (script_name: string) {
    if (api_scripts[script_name]) {
      return delete api_scripts[script_name];
    }
    return true;
  }

  //builder
  export interface UIBuilderOptions {
    version?: string;
    author?: string;
    url?: string;
    title?: string;
    resizeable?: boolean;
    numberOfScriptColumns?: number;
    titleWidth?: number;
    width?: number;
    help?: boolean;
    autoSave?: boolean;
    fileType?: FileType;
    api?: boolean | {
      get?: boolean;
      set?: boolean;
      execute?: boolean;
      enable?: boolean;
      disable?: boolean;
      replaceItems?: boolean;
      addItems?: boolean;
      removeItem?: boolean;
    };
  }

  export class UIBuilder {
    static LIBRARY_NAME = 'KikakuUIBuilder';
    static ALIAS = 'Atarabi';
    static PARAMETER_TYPE = {
      HEADING: 'heading',
      SEPARATOR: 'separator',
      SPACE: 'space',
      PANEL: 'panel',
      PANEL_END: 'panelend',
      GROUP: 'group',
      GROUP_END: 'groupend',
      TEXT: 'text',
      TEXTS: 'texts',
      TEXTAREA: 'textarea',
      TEXTAREAS: 'textareas',
      STATICTEXT: 'statictext',
      STATICTEXTS: 'statictexts',
      STATICTEXTAREA: 'statictextarea',
      STATICTEXTAREAS: 'statictextareas',
      NUMBER: 'number',
      NUMBERS: 'numbers',
      SLIDER: 'slider',
      POINT: 'point',
      POINT3D: 'point3d',
      FILE: 'file',
      FOLDER: 'folder',
      CHECKBOX: 'checkbox',
      CHECKBOXES: 'checkboxes',
      RADIOBUTTON: 'radiobutton',
      COLOR: 'color',
      COLORS: 'colors',
      POPUP: 'popup',
      POPUPS: 'popups',
      LISTBOX: 'listbox',
      LISTBOXES: 'listboxes',
      SCRIPT: 'script',
      HELP: 'help',
    };
    static EVENT_TYPE = {
      INIT: 'init',
      MOUSEDOWN: 'mousedown',
      MOUSEUP: 'mouseup',
      MOUSEMOVE: 'mousemove',
      MOUSEOVER: 'mouseover',
      MOUSEOUT: 'mouseout',
      CLOSE: 'close',
    };
    private static PARAMETERS_KEY = '__parameters__';
    private static SPACING_SIZE = 2;
    private static MARGINS_SIZE = 5;
    static API: UIAPI = API;
    private _ui: Panel | Window;
    private _global: Global | Panel | Window | string;
    private _name: string;
    private _options: UIBuilderOptions;
    private _parameters: { [name: string]: ParameterBase; } = {};
    private _events: { [name: string]: boolean; } = {};
    private _help: HelpParameter;
    private _apis;
    private _layer = 0;
    private _event_dispatcher: EventDispatcher;
    private _setting_manager: UISettingManger;
    private _file_manager: UIFileManager;
    private _built = () => { return false; }
    constructor(global: Global | Panel | Window | 'dialog' | 'palette', name: string, options?: UIBuilderOptions) {
      this._global = global;
      this._name = name;
      this._options = Utils.assign({
        version: '0.0.0',
        author: '',
        url: '',
        title: this._name,
        resizeable: true,
        numberOfScriptColumns: 2,
        titleWidth: 70,
        width: 200,
        help: true,
        autoSave: false,
        fileType: UIFileManager.FILE_TYPE.TEXT,
        api: false,
      }, options);
      this._event_dispatcher = new EventDispatcher;
      this._setting_manager = new UISettingManger(UIBuilder.LIBRARY_NAME, this._name);
      this._file_manager = new UIFileManager(UIBuilder.ALIAS + '/' + UIBuilder.LIBRARY_NAME + '/' + this._name, this._options.fileType);
    }
    getName() { return this._name; }
    getVersion() { return this._options.version; }
    getAuthor() { return this._options.author; }
    getUrl() { return this._options.url; }

    getTitleWidth() { return this._options.titleWidth; }
    getWidth() { return this._options.width; }

    add(type: string, name: string, value?, options?: UIParameterOptions | Function) {
      if (this._built()) {
        throw new Error('Has been built');
      } else if (this._parameters[name]) {
        throw new Error('Give a unique name');
      }

      switch (type) {
        case UIBuilder.PARAMETER_TYPE.HEADING:
          this._parameters[name] = new HeadingParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.SEPARATOR:
          this._parameters[name] = new SeparatorParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.SPACE:
          this._parameters[name] = new SpaceParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.PANEL:
          this._parameters[name] = new PanelParameter(name, value, options);
          this._layer++;
          if (this._options.width < this._layer * 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE)) {
            throw new Error('Too many panels or groups');
          }
          break;
        case UIBuilder.PARAMETER_TYPE.PANEL_END:
          this._parameters[name] = new PanelEndParameter(name, value, options);
          this._layer--;
          break;
        case UIBuilder.PARAMETER_TYPE.GROUP:
          this._parameters[name] = new GroupParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.GROUP_END:
          this._parameters[name] = new GroupEndParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.TEXT:
          this._parameters[name] = new TextParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.TEXTS:
          this._parameters[name] = new TextsParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.TEXTAREA:
          this._parameters[name] = new TextAreaParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.TEXTAREAS:
          this._parameters[name] = new TextAreasParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.STATICTEXT:
          this._parameters[name] = new StaticTextParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.STATICTEXTS:
          this._parameters[name] = new StaticTextsParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.STATICTEXTAREA:
          this._parameters[name] = new StaticTextAreaParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.STATICTEXTAREAS:
          this._parameters[name] = new StaticTextAreasParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.NUMBER:
          this._parameters[name] = new NumberParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.NUMBERS:
          this._parameters[name] = new NumbersParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.SLIDER:
          this._parameters[name] = new SliderParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.POINT:
          this._parameters[name] = new PointParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.POINT3D:
          this._parameters[name] = new Point3DParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.FILE:
          this._parameters[name] = new FileParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.FOLDER:
          this._parameters[name] = new FolderParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.CHECKBOX:
          this._parameters[name] = new CheckboxParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.CHECKBOXES:
          this._parameters[name] = new CheckboxesParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.RADIOBUTTON:
          this._parameters[name] = new RadiobuttonParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.COLOR:
          this._parameters[name] = new ColorParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.COLORS:
          this._parameters[name] = new ColorsParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.POPUP:
          this._parameters[name] = new PopupParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.POPUPS:
          this._parameters[name] = new PopupsParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.LISTBOX:
          this._parameters[name] = new ListboxParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.LISTBOXES:
          this._parameters[name] = new ListboxesParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.SCRIPT:
          this._parameters[name] = new ScriptParameter(name, value, options);
          break;
        case UIBuilder.PARAMETER_TYPE.HELP:
          if (this._help) {
            throw new Error('Help has been defined');
          } else if (!(Utils.isString(value) || Utils.isFunction(value))) {
            throw new Error('Invalid help value');
          }
          this._help = new HelpParameter(name, value);
          break;
        default:
          throw new Error('Invalid parameter type');
      }

      return this;
    }
    addHeading(name: string, title?: string, options?: {
      title?: string;
      helpTip?: string;
      autoSave?: boolean;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.HEADING, name, title, options);
    }
    addSeparator(name: string) {
      return this.add(UIBuilder.PARAMETER_TYPE.SEPARATOR, name);
    }
    addSpace(name: string, height?: number) {
      return this.add(UIBuilder.PARAMETER_TYPE.SPACE, name, height);
    }
    addPanel(name: string, title?: string, options?: {
      stack?: boolean;
      autoSave?: boolean;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.PANEL, name, title, options);
    }
    addPanelEnd(name: string) {
      return this.add(UIBuilder.PARAMETER_TYPE.PANEL_END, name);
    }
    addGroup(name: string) {
      return this.add(UIBuilder.PARAMETER_TYPE.GROUP, name);
    }
    addGroupEnd(name: string) {
      return this.add(UIBuilder.PARAMETER_TYPE.GROUP_END, name);
    }
    addText(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onChanging?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.TEXT, name, initial_value, options);
    }
    addTexts(name: string, initial_values?: string[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onChanging?: Function | Function[];
      onEnterKey?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.TEXTS, name, initial_values, options);
    }
    addTextarea(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onChanging?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.TEXTAREA, name, initial_value, options);
    }
    addTextareas(name: string, initial_values?: string[], options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onChanging?: Function | Function[];
      onEnterKey?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.TEXTAREAS, name, initial_values, options);
    }
    addStatictext(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXT, name, initial_value, options);
    }
    addStatictexts(name: string, initial_values?: string[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTS, name, initial_values, options);
    }
    addStatictextArea(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTAREA, name, initial_value, options);
    }
    addStatictextAreas(name: string, initial_values?: string[], options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTAREAS, name, initial_values, options);
    }
    addNumber(name: string, initial_value?: number | { value?: number; minvalue?: number; maxvalue?: number; }, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.NUMBER, name, initial_value, options);
    }
    addNumbers(name: string, initial_values?: (number | { value?: number; minvalue?: number; maxvalue?: number; })[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onEnterKey?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.NUMBERS, name, initial_values, options);
    }
    addSlider(name: string, initial_value?: number | { value?: number; minvalue?: number; maxvalue?: number }, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.SLIDER, name, initial_value, options);
    }
    addPoint(name: string, initial_value?: [number, number], options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.POINT, name, initial_value, options);
    }
    addPoint3d(name: string, initial_value?: [number, number, number], options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.POINT3D, name, initial_value, options);
    }
    addFile(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
      filter?: string;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.FILE, name, initial_value, options);
    }
    addFolder(name: string, initial_value?: string, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onEnterKey?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.FOLDER, name, initial_value, options);
    }
    addCheckbox(name: string, initial_value?: boolean | { value?: boolean; text?: string; }, options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.CHECKBOX, name, initial_value, options);
    }
    addCheckboxes(name: string, initial_values?: (boolean | { value?: boolean; text?: string; })[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.CHECKBOXES, name, initial_values, options);
    }
    addRadiobutton(name: string, initial_values: string[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.RADIOBUTTON, name, initial_values, options);
    }
    addColor(name: string, initial_value?: [number, number, number], options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.COLOR, name, initial_value, options);
    }
    addColors(name: string, initial_values?: ([number, number, number])[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.COLORS, name, initial_values, options);
    }
    addPopup(name: string, initial_value?: (string[] | { value: string; items: string[] }), options?: Function | {
      title?: boolean | string;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.POPUP, name, initial_value, options);
    }
    addPopups(name: string, initial_values?: (string[] | { value: string; items: string[] })[], options?: Function | {
      title?: boolean | string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.POPUPS, name, initial_values, options);
    }
    addListbox(name: string, initial_value?: (string[] | { value: string; items: string[] }), options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string;
      autoSave?: boolean;
      callback?: Function;
      onDoubleClick?: Function;
      onActivate?: Function;
      onDeactivate?: Function;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.LISTBOX, name, initial_value, options);
    }
    addListboxes(name: string, initial_values?: (string[] | { value: string; items: string[] })[], options?: Function | {
      title?: boolean | string;
      height?: number;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function | Function[];
      onDoubleClick?: Function | Function[];
      onActivate?: Function | Function[];
      onDeactivate?: Function | Function[];
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.LISTBOXES, name, initial_values, options);
    }
    addScript(name: string, value?: Function | {
      title?: string;
      helpTip?: string | string[];
      autoSave?: boolean;
      callback?: Function;
      undo?: boolean;
    }) {
      return this.add(UIBuilder.PARAMETER_TYPE.SCRIPT, name, value);
    }
    addHelp(name: string, value?: string | Function) {
      return this.add(UIBuilder.PARAMETER_TYPE.HELP, name, value);
    }

    api(name: string, fn: Function) {
      UIBuilder.API.add(this.getName(), name, fn, this);
      return this;
    }

    on(type: string, fn: Function) {
      this._events[type] = true;
      this._event_dispatcher.addEventListener(type, fn, this);
      return this;
    }
    off(type: string, fn: Function) {
      this._event_dispatcher.removeEventListener(type, fn, this);
      return this;
    }
    trigger(type: string, ...args: any[]) {
      this._event_dispatcher.dispatchEvent.apply(this._event_dispatcher, [type].concat(args));
      return this;
    }

    private validateParameter(name: string) {
      if (!this._built()) {
        throw new Error('Not bult yet');
      } else if (!this._parameters[name]) {
        throw new Error('Invalid parameter name');
      }
    }
    get(name: string, index?: number) {
      this.validateParameter(name);
      return this._parameters[name].get(index);
    }
    set(name: string, value_or_index?, value2?) {
      this.validateParameter(name);
      this._parameters[name].set(value_or_index, value2);
      return this;
    }
    execute(name: string, undo?: boolean, ...args: any[]) {
      this.validateParameter(name);
      return this._parameters[name].execute.apply(this._parameters[name], [undo].concat(args));
    }
    enable(name: string, index?: number) {
      this.validateParameter(name);
      this._parameters[name].enable(index);
      return this;
    }
    disable(name: string, index?: number) {
      this.validateParameter(name);
      this._parameters[name].disable(index);
      return this;
    }
    visiblize(name: string, index: number) {
      this.validateParameter(name);
      this._parameters[name].visiblize(index);
      return this;
    }
    getItems(name: string, index?: number) {
      this.validateParameter(name);
      return this._parameters[name].getItems(index);
    }
    replaceItems(name: string, items_or_index: string[] | string[][] | number, items2?: string[]) {
      this.validateParameter(name);
      this._parameters[name].replaceItems(items_or_index, items2);
      return this;
    }
    addItems(name: string, items_or_index: string | string[] | (string | string[])[] | number, items2?: string | string[]) {
      this.validateParameter(name);
      this._parameters[name].addItems(items_or_index, items2);
      return this;
    }
    removeItem(name: string, item_or_index: string | string[] | number, item2?: string) {
      this.validateParameter(name);
      this._parameters[name].removeItem(item_or_index, item2);
      return this;
    }

    getSetting(key: string, default_value) {
      return this._setting_manager.get(key, default_value);
    }
    saveSetting(key: string, value) {
      this._setting_manager.save(key, value);
      return this;
    }
    deleteSetting(key: string) {
      this._setting_manager.delete(key);
      return this;
    }

    getFileNames() {
      return this._file_manager.getFileNames();
    }
    existsFile(filename: string) {
      return this._file_manager.exists(filename);
    }
    getFile(filename: string) {
      return this._file_manager.get(filename);
    }
    saveFile(filename: string, data) {
      this._file_manager.save(filename, data);
      return this;
    }
    deleteFile(filename: string) {
      return this._file_manager.delete(filename);
    }

    update() {
      if (!this._built()) {
        throw new Error('Not built yet');
      }
      let auto_save = this._options.autoSave;
      if (auto_save) {
        let parameters: { [name: string]: ParameterBase; } = {};
        for (let name in this._parameters) {
          const parameter = this._parameters[name];
          if (parameter.doAutoSave()) {
            parameters[name] = parameter;
          }
        }
        this._setting_manager.save(UIBuilder.PARAMETERS_KEY, parameters);
      }
    }
    close() {
      if (!this._built()) {
        throw new Error('Not built yet');
      }
      if (this._ui instanceof Window) {
        (<Window>this._ui).close();
      }
    }

    build() {
      if (this._built()) {
        throw new Error('Has been built');
      }

      this._built = () => { return true; }

      let resizeable = this._options.resizeable;
      let title = this._options.title;
      let w: Panel | Window = this._ui = ((global): Panel | Window => {
        if (global instanceof Panel) {
          return global;
        } else if (global === 'dialog') {
          return new Window('dialog', title, undefined, { resizeable: resizeable });
        }
        return new Window('palette', title, undefined, { resizeable: resizeable });
      })(this._global);
      let group: Group;
      let width = this._options.width;

      w.minimumSize = [width, undefined];
      w.spacing = UIBuilder.SPACING_SIZE;
      w.margins = UIBuilder.MARGINS_SIZE;
      if (resizeable) {
        w.onResizing = w.onResize = function () {
          this.layout.resize();
        };
      }

      let current_container: _WindowOrContainer = w;
      let current_width = width - 2 * UIBuilder.MARGINS_SIZE;
      let script_index = 0;
      let script_columns = this._options.numberOfScriptColumns;

      //build parameters
      for (let name in this._parameters) {
        let parameter = this._parameters[name];

        if (parameter instanceof PanelParameter) {
          current_container = <Panel>current_container.add('panel');
          current_container.minimumSize = [current_width, undefined];
          current_container.spacing = UIBuilder.SPACING_SIZE;
          current_container.margins = UIBuilder.MARGINS_SIZE;
          current_container.alignment = ['fill', 'top'];
          current_container.alignChildren = ['fill', 'fill'];
          current_width -= 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE);
          script_index = 0;
          parameter.build(<Group>current_container, this);
        } else if (parameter instanceof PanelEndParameter) {
          current_container = current_container.parent;
          current_width += 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE);
          script_index = 0;
        } else if (parameter instanceof GroupParameter) {
          current_container = <Group>current_container.add('group');
          current_container.orientation = 'column';
          current_container.minimumSize = [current_width, undefined];
          current_container.spacing = 0;
          current_container.margins = 0;
          current_container.alignment = ['fill', 'top'];
          current_container.alignChildren = ['fill', 'fill'];
          script_index = 0;
          parameter.build(<Group>current_container, this);
        } else if (parameter instanceof GroupEndParameter) {
          current_container = current_container.parent;
          script_index = 0;
        } else {
          let create_group = true;
          if (parameter instanceof ScriptParameter) {
            if (script_index % script_columns !== 0) {
              create_group = false;
            }
            script_index++;
          } else {
            if (parameter instanceof SpaceParameter && parameter.getHeight() === 0) {
              create_group = false;
            }
            script_index = 0;
          }

          if (create_group) {
            group = current_container.add('group', [0, 0, current_width, parameter.getHeight()]);
            group.minimumSize = [current_width, parameter.getHeight()];
            group.spacing = 1;
            group.margins = 0;
            group.orientation = 'row';
            group.alignment = ['fill', 'top'];
            group.alignChildren = ['fill', 'fill'];
          }

          parameter.build(group, this);
        }
      }

      //help
      if (this._options.help && !this._help) {
        let text = this.getName() + ' v' + this.getVersion();
        if (this.getAuthor()) {
          text += '\n\n' + this.getAuthor();
        }
        if (this.getUrl()) {
          text += '\n' + this.getUrl();
        }
        this._help = new HelpParameter(this.getName(), text);
      }

      if (this._help) {
        group = w.add('group', undefined);
        group.spacing = group.margins = 0;
        group.alignment = ['right', 'top'];
        group.alignChildren = ['right', 'top'];
        this._help.build(group, this);
      }

      //api
      if (this._options.api) {
        const default_api = {
          get: true,
          set: true,
          execute: true,
          enable: false,
          disable: false,
          replaceItems: false,
          addItems: false,
          removeItem: false,
        };

        let api: {
          get: boolean;
          set: boolean;
          execute: boolean;
          enable: boolean;
          disable: boolean;
          replaceItems: boolean;
          addItems: boolean;
          removeItem: boolean;
        } = Utils.isBoolean(this._options.api) ? default_api : Utils.assign({}, default_api, this._options.api);

        for (let method in api) {
          this.api(method, this[method]);
        }
      }

      //events
      let init = () => {
        let auto_save = this._options.autoSave;
        let values: any = {};
        if (auto_save) {
          values = this.getSetting(UIBuilder.PARAMETERS_KEY, {});
        } else {
          this.deleteSetting(UIBuilder.PARAMETERS_KEY);
        }
        for (var name in this._parameters) {
          this._parameters[name].init(values[name]);
        }
        this.trigger(UIBuilder.EVENT_TYPE.INIT);
      };

      for (let event_key in UIBuilder.EVENT_TYPE) {
        const event_type: string = UIBuilder.EVENT_TYPE[event_key];
        if (event_type !== UIBuilder.EVENT_TYPE.INIT && event_type !== UIBuilder.EVENT_TYPE.CLOSE && this._events[event_type]) {
          w.addEventListener(event_type, (ev) => {
            if (!(w instanceof Panel) || ev.target === w) {
              this.trigger(event_type, ev);
            }
          });
        }
      }

      if (w instanceof Window) {
        w.onShow = () => { init(); }
        w.onClose = () => {
          UIBuilder.API.remove(this.getName());
          this.trigger(UIBuilder.EVENT_TYPE.CLOSE);
        };

        w.center();
        w.show();
      } else {
        w.layout.layout(true);
        init();
      }
    }
  }
}