namespace KIKAKU {

  export class KPropertyBase<T extends PropertyBase> {
    //static
    static isValid(prop) {
      if (prop instanceof KPropertyBase) {
        prop = prop.get();
      }
      return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup || prop instanceof Property);
    }
    //prototype
    protected _name: string;
    constructor(protected _prop: T, protected _parent: KPropertyGroup<PropertyGroup> = null) {
      this._name = this._prop.name;
      if (!this._parent) {
        const parent = this._prop.parentProperty;
        if (parent) {
          this._parent = new KPropertyGroup<PropertyGroup>(parent);
        }
      }
    }
    get() {
      return this._prop;
    }
    isValid() {
      return KPropertyBase.isValid(this);
    }
    validate() {
      if (!this.isValid()) {
        if (this._parent) {
          this._parent.validate();
          if (this._parent.isValid()) {
            this._prop = <T>this._parent.get().property(this._name)
          }
        }
      }
    }
    //cast
    asPropertyGroup() {
      return new KPropertyGroup<PropertyGroup>(<any>this._prop, this._parent);
    }
    ifPropertyGroup(fn: (property: KPropertyGroup<PropertyGroup>) => any) {
      if (KPropertyGroup.isValid(this)) {
        fn(this.asPropertyGroup());
      }
      return this;
    }
    asMaskPropertyGroup() {
      return new KMaskPropertyGroup(<MaskPropertyGroup>(<any>this._prop), this._parent);
    }
    ifMaskPropertyGroup(fn: (property: KMaskPropertyGroup) => any) {
      if (KMaskPropertyGroup.isValid(this)) {
        fn(this.asMaskPropertyGroup());
      }
      return this;
    }
    asProperty() {
      return new KProperty(<any>this._prop, this._parent);
    }
    ifProperty(fn: (property: KProperty<PropertyValue>) => any) {
      if (KProperty.isValid(this)) {
        fn(this.asProperty());
      }
      return this;
    }
    //attributes
    name(name?: string) {
      this.validate();
      if (name !== void 0) this._name = this._prop.name = name;
      return this._prop.name;
    }
    matchName() {
      this.validate();
      return this._prop.matchName;
    }
    propertyIndex() {
      this.validate();
      return this._prop.propertyIndex;
    }
    propertyDepth() {
      this.validate();
      return this._prop.propertyDepth;
    }
    propertyType() {
      this.validate();
      return this._prop.propertyType;
    }
    parentProperty() {
      this.validate();
      if (this._parent) {
        return this._parent;
      }
      return new KPropertyGroup(this._prop.parentProperty);
    }
    isModified() {
      this.validate();
      return this._prop.isModified;
    }
    canSetEnabled() {
      this.validate();
      return this._prop.canSetEnabled;
    }
    enabled(enabled?: boolean) {
      this.validate();
      if (enabled !== void 0) this._prop.enabled = enabled;
      return this._prop.enabled;
    }
    active() {
      this.validate();
      return this._prop.active;
    }
    elided() {
      this.validate();
      return this._prop.elided;
    }
    isEffect() {
      this.validate();
      return this._prop.isEffect;
    }
    isMask() {
      this.validate();
      return this._prop.isMask;
    }
    selected(selected?: boolean) {
      this.validate();
      if (selected !== void 0) this._prop.selected = selected;
      return this._prop.selected;
    }
    //methods
    propertyGroup(countUp = 1) {
      this.validate();
      return new KPropertyGroup(this._prop.propertyGroup(countUp));
    }
    remove() {
      this.validate();
      this._prop.remove();
    }
    moveTo(newIndex: number) {
      this.validate();
      this._prop.moveTo(newIndex);
    }
    duplicate() {
      this.validate();
      return new KPropertyBase(this._prop.duplicate());
    }
  }

  export class KPropertyGroup<T extends PropertyGroup> extends KPropertyBase<T> {
    //static
    static isValid(prop) {
      if (prop instanceof KPropertyBase) {
        prop = prop.get();
      }
      return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup);
    }
    //prototype
    isValid() {
      return KPropertyGroup.isValid(this);
    }
    //attributes
    numProperties() {
      this.validate();
      return this._prop.numProperties;
    }
    //methods
    property(index_or_name: number | string) {
      this.validate();
      return new KPropertyBase(this._prop.property(<any>index_or_name), this);
    }
    propertyAsProperty(index_or_name: number | string) {
      this.validate();
      return new KProperty(<Property>this._prop.property(<any>index_or_name), this);
    }
    propertyAsPropertyGroup(index_or_name: number | string) {
      this.validate();
      return new KPropertyGroup(<PropertyGroup>this._prop.property(<any>index_or_name), this)
    }
    canAddProperty(name: string) {
      this.validate();
      return this._prop.canAddProperty(name);
    }
    addProperty(name: string) {
      this.validate();
      return new KPropertyBase(this._prop.addProperty(name));
    }
    addPropertyAsProperty(name: string) {
      this.validate();
      return new KPropertyBase(this._prop.addProperty(name)).asProperty();
    }
    addPropertyAsPropertyGroup(name: string) {
      this.validate();
      return new KPropertyBase(this._prop.addProperty(name)).asPropertyGroup();
    }
    //custom methods
    forEach(fn: (prop: KPropertyBase<PropertyBase>, index: number) => void) {
      const prop = this._prop;
      const property_num = prop.numProperties;
      for (let i = 1; i <= property_num; ++i) {
        fn(new KPropertyBase(prop.property(i)), i);
      }
    }
  }

  export class KMaskPropertyGroup extends KPropertyGroup<MaskPropertyGroup> {
    //static
    static isValid(prop) {
      if (prop instanceof KPropertyBase) {
        prop = prop.get();
      }
      return isValid(prop) && prop instanceof MaskPropertyGroup;
    }
    //prototype
    isValid() {
      return KMaskPropertyGroup.isValid(this);
    }
    //properties
    maskPath() {
      this.validate();
      return new KShapeProperty(<Property>this._prop.property('ADBE Mask Shape'), this);
    }
    maskFeather() {
      this.validate();
      return new KTwoDProperty(<Property>this._prop.property('ADBE Mask Feather'), this);
    }
    maskOpacity() {
      this.validate();
      return new KOneDProperty(<Property>this._prop.property('ADBE Mask Opacity'), this);
    }
    maskExpansion() {
      this.validate();
      return new KOneDProperty(<Property>this._prop.property('ADBE Mask Offset'), this);
    }
    //attributes
    maskMode(maskMode?: MaskMode) {
      this.validate();
      if (maskMode !== void 0) this._prop.maskMode = maskMode;
      return this._prop.maskMode;
    }
    inverted(inverted?: boolean) {
      this.validate();
      if (inverted !== void 0) this._prop.inverted = inverted;
      return this._prop.inverted;
    }
    rotoBezier(rotoBezier?: boolean) {
      this.validate();
      if (rotoBezier !== void 0) this._prop.rotoBezier = rotoBezier;
      return this._prop.rotoBezier;
    }
    maskMotionBlur(maskMotionBlur?: MaskMotionBlur) {
      this.validate();
      if (maskMotionBlur !== void 0) this._prop.maskMotionBlur = maskMotionBlur;
      return this._prop.maskMotionBlur;
    }
    locked(locked?: boolean) {
      this.validate();
      if (locked !== void 0) this._prop.locked = locked;
      return this._prop.locked;
    }
    color(color?: [number, number, number]) {
      this.validate();
      if (color !== void 0) this._prop.color = color;
      return this._prop.color;
    }
    maskFeatherFalloff(maskFeatherFalloff?: MaskFeatherFalloff) {
      this.validate();
      if (maskFeatherFalloff !== void 0) this._prop.maskFeatherFalloff = maskFeatherFalloff;
      return this._prop.maskFeatherFalloff;
    }
  }

  export class KProperty<T extends PropertyValue> extends KPropertyBase<Property> {
    //static
    static isValid(prop) {
      if (prop instanceof KPropertyBase) {
        prop = prop.get();
      }
      return isValid(prop) && prop instanceof Property;
    }
    //prototype
    isValid() {
      return KProperty.isValid(this);
    }
    //cast
    asNoValue() {
      return new KNoValueProperty(this._prop, this._parent);
    }
    asThreeDSpatial() {
      return new KThreeDSpatialProperty(this._prop, this._parent);
    }
    asThreeD() {
      return new KThreeDProperty(this._prop, this._parent);
    }
    asTwoDSpatial() {
      return new KTwoDSpatialProperty(this._prop, this._parent);
    }
    asTwoD() {
      return new KTwoDProperty(this._prop, this._parent);
    }
    asOneD() {
      return new KOneDProperty(this._prop, this._parent);
    }
    asColor() {
      return new KColorProperty(this._prop, this._parent);
    }
    asCustomValue() {
      return new KCustomValueProperty(this._prop, this._parent);
    }
    asMarker() {
      return new KMarkerProperty(this._prop, this._parent);
    }
    asLayerIndex() {
      return new KLayerIndexProperty(this._prop, this._parent);
    }
    asMaskIndex() {
      return new KMaskIndexProperty(this._prop, this._parent);
    }
    asShape() {
      return new KShapeProperty(this._prop, this._parent);
    }
    asTextDocument() {
      return new KTextDocumentProperty(this._prop, this._parent);
    }
    //attributes
    propertyValueType() {
      return this._prop.propertyValueType;
    }
    value(): T {
      return <T>this._prop.value;
    }
    hasMin() {
      return this._prop.hasMin;
    }
    hasMax() {
      return this._prop.hasMax;
    }
    minValue() {
      return this._prop.minValue;
    }
    maxValue() {
      return this._prop.maxValue;
    }
    isSpatial() {
      return this._prop.isSpatial;
    }
    canVaryOverTime() {
      return this._prop.canVaryOverTime;
    }
    isTimeVarying() {
      return this._prop.isTimeVarying;
    }
    numKeys() {
      return this._prop.numKeys;
    }
    unitsText() {
      return this._prop.unitsText;
    }
    expression(expression?: string) {
      if (expression !== void 0) this._prop.expression = expression;
      return this._prop.expression;
    }
    canSetExpression() {
      return this._prop.canSetExpression;
    }
    expressionEnabled(expressionEnabled?: boolean) {
      if (expressionEnabled !== void 0) this._prop.expressionEnabled = expressionEnabled;
      return this._prop.expressionEnabled;
    }
    expressionError() {
      return this._prop.expressionError;
    }
    selectedKeys() {
      return new KArray(this._prop.selectedKeys.slice());
    }
    propertyIndex() {
      return this._prop.propertyIndex;
    }
    dimensionsSeparated(dimensionsSeparated?: boolean) {
      if (dimensionsSeparated !== void 0) this._prop.dimensionsSeparated = dimensionsSeparated;
      return this._prop.dimensionsSeparated;
    }
    isSeparationFollower() {
      return this._prop.isSeparationFollower;
    }
    isSeparationLeader() {
      return this._prop.isSeparationLeader;
    }
    separationDimension() {
      return this._prop.separationDimension;
    }
    separationLeader() {
      return this._prop.separationLeader;
    }
    //methods
    valueAtTime(time: number, preExpression: boolean): T {
      return <T>this._prop.valueAtTime(time, preExpression);
    }
    setValue(value: T) {
      this._prop.setValue(value);
    }
    setValueAtTime(time: number, newValue: T) {
      this._prop.setValueAtTime(time, newValue);
    }
    setValuesAtTimes(times: number[], newValues: T[]) {
      this._prop.setValuesAtTimes(times, newValues);
    }
    setValueAtKey(keyIndex: number, newValue: T) {
      this._prop.setValueAtKey(keyIndex, newValue);
    }
    nearestKeyIndex(time: number) {
      return this._prop.nearestKeyIndex(time);
    }
    keyTime(keyIndex_or_markerComment: number | string) {
      return this._prop.keyTime(<any>keyIndex_or_markerComment);
    }
    keyValue(keyIndex_or_markerComment: number | string): T {
      return <T>this._prop.keyValue(<any>keyIndex_or_markerComment);
    }
    addKey(time: number) {
      return this._prop.addKey(time);
    }
    removeKey(keyIndex: number) {
      return this._prop.removeKey(keyIndex);
    }
    isInterpolationTypeValid(type: KeyframeInterpolationType) {
      return this._prop.isInterpolationTypeValid(type);
    }
    setInterpolationTypeAtKey(keyIndex: number, inType: KeyframeInterpolationType, outType: KeyframeInterpolationType) {
      this._prop.setInterpolationTypeAtKey(keyIndex, inType, outType);
    }
    keyInInterpolationType(keyIndex: number) {
      return this._prop.keyInInterpolationType(keyIndex);
    }
    keyOutInterpolationType(keyIndex: number) {
      return this._prop.keyOutInterpolationType(keyIndex);
    }
    setSpatialTangentsAtKey(keyIndex: number, inTangent: [number, number] | [number, number, number], outTangent: [number, number] | [number, number, number]) {
      this._prop.setSpatialTangentsAtKey(keyIndex, inTangent, outTangent);
    }
    keyInSpatialTangent(keyIndex: number) {
      return this._prop.keyInSpatialTangent(keyIndex);
    }
    keyOutSpatialTangent(keyIndex: number) {
      return this._prop.keyOutSpatialTangent(keyIndex);
    }
    setTemporalEaseAtKey(keyIndex: number, inTemporalEase: [KeyframeEase] | [KeyframeEase, KeyframeEase] | [KeyframeEase, KeyframeEase, KeyframeEase], outTemporalEase: [KeyframeEase] | [KeyframeEase, KeyframeEase] | [KeyframeEase, KeyframeEase, KeyframeEase]) {
      this._prop.setTemporalEaseAtKey(keyIndex, inTemporalEase, outTemporalEase);
    }
    keyInTemporalEase(keyIndex: number) {
      return new KArray(this._prop.keyInTemporalEase(keyIndex));
    }
    keyOutTemporalEase(keyIndex: number) {
      return new KArray(this._prop.keyOutTemporalEase(keyIndex));
    }
    setTemporalContinuousAtKey(keyIndex: number, newVal: boolean) {
      this._prop.setTemporalContinuousAtKey(keyIndex, newVal);
    }
    keyTemporalContinuous(keyIndex: number) {
      return this._prop.keyTemporalContinuous(keyIndex);
    }
    setTemporalAutoBezierAtKey(keyIndex: number, newVal: boolean) {
      this._prop.setTemporalAutoBezierAtKey(keyIndex, newVal);
    }
    keyTemporalAutoBezier(keyIndex: number) {
      return this._prop.keyTemporalAutoBezier(keyIndex);
    }
    setSpatialContinuousAtKey(keyIndex: number, newVal: boolean) {
      this._prop.setSpatialContinuousAtKey(keyIndex, newVal);
    }
    keySpatialContinuous(keyIndex: number) {
      return this._prop.keySpatialContinuous(keyIndex);
    }
    setSpatialAutoBezierAtKey(keyIndex: number, newVal: boolean) {
      this._prop.setSpatialAutoBezierAtKey(keyIndex, newVal);
    }
    keySpatialAutoBezier(keyIndex: number) {
      return this._prop.keySpatialAutoBezier(keyIndex);
    }
    setRovingAtKey(keyIndex: number, newVal: boolean) {
      this._prop.setRovingAtKey(keyIndex, newVal);
    }
    keyRoving(keyIndex: number) {
      return this._prop.keyRoving(keyIndex);
    }
    setSelectedAtKey(keyIndex: number, onOff: boolean) {
      this._prop.setSelectedAtKey(keyIndex, onOff);
    }
    keySelected(keyIndex: number) {
      return this._prop.keySelected(keyIndex);
    }
    getSeparationFollower(dim: number) {
      return new KProperty(this._prop.getSeparationFollower(dim));
    }
  }

  export class KNoValueProperty extends KProperty<void> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.NO_VALUE;
    }
  }

  export class KThreeDSpatialProperty extends KProperty<[number, number] | [number, number, number]> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL;
    }
  }

  export class KThreeDProperty extends KProperty<[number, number] | [number, number, number]> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.ThreeD;
    }
  }

  export class KTwoDSpatialProperty extends KProperty<[number, number]> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.TwoD_SPATIAL;
    }
  }

  export class KTwoDProperty extends KProperty<[number, number]> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.TwoD;
    }
  }

  export class KOneDProperty extends KProperty<number | boolean> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.OneD;
    }
  }

  export class KColorProperty extends KProperty<[number, number, number] | [number, number, number, number]> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.OneD;
    }
  }

  export class KCustomValueProperty extends KProperty<void> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.CUSTOM_VALUE;
    }
  }

  export class KMarkerProperty extends KProperty<MarkerValue> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.MARKER;
    }
  }

  export class KLayerIndexProperty extends KProperty<number> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.LAYER_INDEX;
    }
  }

  export class KMaskIndexProperty extends KProperty<number> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.MASK_INDEX;
    }
  }

  export class KShapeProperty extends KProperty<Shape> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.SHAPE;
    }
  }

  export class KTextDocumentProperty extends KProperty<TextDocument> {
    isValid() {
      return super.isValid() && this._prop.propertyValueType === PropertyValueType.TEXT_DOCUMENT;
    }
  }

  /*
  * Mask Property
  */
  export class KMaskParade extends KPropertyGroup<PropertyGroup> {
    //methods
    addMaskAtom(name?: string) {
      const mask_atom = <MaskPropertyGroup>this._prop.addProperty('ADBE Mask Atom');
      if (name !== void 0) mask_atom.name = name;
      return new KMaskPropertyGroup(mask_atom, this);
    }
  }

  /*
  * Effect Property
  */
  export class KEffectParade extends KPropertyGroup<PropertyGroup> {
    //override
    addProperty(name_or_matchname: string): KEffect {
      const prop = this._prop.addProperty(name_or_matchname);
      return new KEffect(<PropertyGroup>prop, this);
    }
    addPropertyAsPropertyGroup(name: string) {
      return this.addProperty(name);
    }
  }

  export class KEffect extends KPropertyGroup<PropertyGroup> {
    //override
    property(index_or_name: number | string): KProperty<PropertyValue> {
      this.validate();
      return new KProperty(<Property>this._prop.property(<any>index_or_name), this)
    }
  }

  /*
  * Layer Style Property
  */
  export class KLayerStyles extends KPropertyGroup<PropertyGroup> {
    private _layer: AVLayer;
    constructor(prop: PropertyGroup, parent: KPropertyGroup<PropertyGroup> = null) {
      super(prop, parent);
      let parent_property = prop;
      while (parent_property.parentProperty) {
        parent_property = parent_property.parentProperty;
      }
      this._layer = <AVLayer><any>parent_property;
    }
    //properties
    blendingOptions() {
      return new KLayerStylesBlendingOptions(<PropertyGroup>this._prop.property('ADBE Blend Options Group'), this);
    }
    dropShadow() {
      return new KLayerStylesDropShadow(<PropertyGroup>this._prop.property('dropShadow/enabled'), this);
    }
    innerShadow() {
      return new KLayerStylesInnerShadow(<PropertyGroup>this._prop.property('innerShadow/enabled'), this);
    }
    outerGlow() {
      return new KLayerStylesOuterGlow(<PropertyGroup>this._prop.property('outerGlow/enabled'), this);
    }
    innerGlow() {
      return new KLayerStylesInnerGlow(<PropertyGroup>this._prop.property('innerGlow//enabled'), this);
    }
    bevelAndEmboss() {
      return new KLayerStylesBevelAndEmboss(<PropertyGroup>this._prop.property('bevelEmboss/enabled'), this);
    }
    satin() {
      return new KLayerStylesSatin(<PropertyGroup>this._prop.property('chromeFX/enabled'), this);
    }
    colorOverlay() {
      return new KLayerStylesColorOverlay(<PropertyGroup>this._prop.property('solidFill/enabled'), this);
    }
    gradientOverlay() {
      return new KLayerStylesGradientOverlay(<PropertyGroup>this._prop.property('gradientFill/enabled'), this);
    }
    stroke() {
      return new KLayerStylesStroke(<PropertyGroup>this._prop.property('frameFX/enabled'), this);
    }
    //methods
    addDropShadow() {
      this.doCommand(9000);
      return this.dropShadow();
    }
    addInnerShadow() {
      this.doCommand(9001);
      return this.innerShadow();
    }
    addOuterGlow() {
      this.doCommand(9002);
      return this.outerGlow();
    }
    addInnerGlow() {
      this.doCommand(9003);
      return this.innerGlow();
    }
    addBevelAndEmboss() {
      this.doCommand(9004);
      return this.bevelAndEmboss();
    }
    addSatin() {
      this.doCommand(9005);
      return this.satin();
    }
    addColorOverlay() {
      this.doCommand(9006);
      return this.colorOverlay();
    }
    addGradientOverlay() {
      this.doCommand(9007);
      return this.gradientOverlay();
    }
    addStroke() {
      this.doCommand(9008);
      return this.stroke();
    }
    //utility methods
    private doCommand(command_id: number) {
      const active_item = app.project.activeItem;
      const comp = this._layer.containingComp;
      if (comp !== active_item) {
        if (parseFloat(app.version) < AppVersion.CS6) {
          throw 'This method requires CS6 or later."'
        }
        comp.openInViewer();
      }
      const selected_layers = new KArray(comp.selectedLayers.slice());
      try {
        selected_layers.forEach(layer => {
          layer.selected = false;
        });
        this._layer.selected = true;
        app.executeCommand(command_id);
      } catch (e) {
        //pass
      } finally {
        this._layer.selected = false;
        selected_layers.forEach(layer => {
          layer.selected = true;
        });
      }
    }
  }

  export class KLayerStylesBlendingOptions extends KPropertyGroup<PropertyGroup> {
    globalLightAngle() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Global Angle2'), this);
    }
    globalLightAltitude() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Global Altitude2'), this);
    }
    advancedBlending() {
      return new KLayerStylesAdvancedBlending(<PropertyGroup>this._prop.property('ADBE Adv Blend Group'), this);
    }
  }

  export class KLayerStylesAdvancedBlending extends KPropertyGroup<PropertyGroup> {
    fillOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Layer Fill Opacity2'), this);
    }
    red() {
      return new KOneDProperty(<Property>this._prop.property('ADBE R Channel Blend'), this);
    }
    green() {
      return new KOneDProperty(<Property>this._prop.property('ADBE G Channel Blend'), this);
    }
    blue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE B Channel Blend'), this);
    }
    blendInteriorStylesAsGroup() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Blend Interior'), this);
    }
    useBlendRangesFromSource() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Blend Ranges'), this);
    }
  }

  export class KLayerStylesDropShadow extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/mode2'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('dropShadow/color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/opacity'), this);
    }
    useGlobalLight() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/useGlobalAngle'), this);
    }
    angle() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/localLightingAngle'), this);
    }
    distance() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/distance'), this);
    }
    spread() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/chokeMatte'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/blur'), this);
    }
    noise() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/noise'), this);
    }
    layerKnocksOutDropShadow() {
      return new KOneDProperty(<Property>this._prop.property('dropShadow/layerConceals'), this);
    }
  }

  export class KLayerStylesInnerShadow extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/mode2'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('innerShadow/color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/opacity'), this);
    }
    useGlobalLight() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/useGlobalAngle'), this);
    }
    angle() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/localLightingAngle'), this);
    }
    distance() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/distance'), this);
    }
    choke() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/chokeMatte'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/blur'), this);
    }
    noise() {
      return new KOneDProperty(<Property>this._prop.property('innerShadow/noise'), this);
    }
  }

  export class KLayerStylesOuterGlow extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/mode2'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/opacity'), this);
    }
    noise() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/noise'), this);
    }
    colorType() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/AEColorChoice'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('outerGlow/color'), this);
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('outerGlow/gradient'), this);
    }
    gradientSmoothness() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/gradientSmoothness'), this);
    }
    technique() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/glowTechnique'), this);
    }
    spread() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/chokeMatte'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/blur'), this);
    }
    range() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/inputRange'), this);
    }
    jitter() {
      return new KOneDProperty(<Property>this._prop.property('outerGlow/shadingNoise'), this);
    }
  }

  export class KLayerStylesInnerGlow extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/mode2'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/opacity'), this);
    }
    noise() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/noise'), this);
    }
    colorType() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/AEColorChoice'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('innerGlow/color'), this);
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('innerGlow/gradient'), this);
    }
    gradientSmoothness() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/gradientSmoothness'), this);
    }
    technique() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/glowTechnique'), this);
    }
    source() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/innerGlowSource'), this);
    }
    choke() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/chokeMatte'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/blur'), this);
    }
    range() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/inputRange'), this);
    }
    jitter() {
      return new KOneDProperty(<Property>this._prop.property('innerGlow/shadingNoise'), this);
    }
  }

  export class KLayerStylesBevelAndEmboss extends KPropertyGroup<PropertyGroup> {
    style() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/bevelStyle'), this);
    }
    technique() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/bevelTechnique'), this);
    }
    depth() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/strengthRatio'), this);
    }
    direction() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/bevelDirection'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/blur'), this);
    }
    soften() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/softness'), this);
    }
    useGlobalLight() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/useGlobalAngle'), this);
    }
    angle() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/localLightingAngle'), this);
    }
    altitude() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/localLightingAltitude'), this);
    }
    highlightMode() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/highlightMode'), this);
    }
    highlightColor() {
      return new KColorProperty(<Property>this._prop.property('bevelEmboss/highlightColor'), this);
    }
    highlightOpacity() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/highlightOpacity'), this);
    }
    shadowMode() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/shadowMode'), this);
    }
    shadowColor() {
      return new KColorProperty(<Property>this._prop.property('bevelEmboss/shadowColor'), this);
    }
    shadowOpacity() {
      return new KOneDProperty(<Property>this._prop.property('bevelEmboss/shadowOpacity'), this);
    }
  }

  export class KLayerStylesSatin extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/mode2'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('chromeFX/color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/opacity'), this);
    }
    angle() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/localLightingAngle'), this);
    }
    distance() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/distance'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/blur'), this);
    }
    invert() {
      return new KOneDProperty(<Property>this._prop.property('chromeFX/invert'), this);
    }
  }

  export class KLayerStylesColorOverlay extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('solidFill/mode2'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('solidFill/color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('solidFill/opacity'), this);
    }
  }

  export class KLayerStylesGradientOverlay extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/mode2'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/opacity'), this);
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('gradientFill/gradient'), this);
    }
    gradientSmoothness() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/gradientSmoothness'), this);
    }
    angle() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/angle'), this);
    }
    style() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/type'), this);
    }
    reverse() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/reverse'), this);
    }
    alignWithLayer() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/align'), this);
    }
    scale() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/scale'), this);
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('gradientFill/offset'), this);
    }
  }

  export class KLayerStylesStroke extends KPropertyGroup<PropertyGroup> {
    blendMode() {
      return new KOneDProperty(<Property>this._prop.property('frameFX/mode2'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('frameFX/color'), this);
    }
    size() {
      return new KOneDProperty(<Property>this._prop.property('frameFX/size'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('frameFX/opacity'), this);
    }
    position() {
      return new KOneDProperty(<Property>this._prop.property('frameFX/style'), this);
    }
  }

  /*
  * Text Property
  */
  export class KTextProperties extends KPropertyGroup<PropertyGroup> {
    sourceText() {
      return new KTextDocumentProperty(<Property>this._prop.property('ADBE Text Document'), this);
    }
    pathOptions() {
      return new KTextPathOptions(<_TextPathOptions>this._prop.property('ADBE Text Path Options'), this);
    }
    moreOptions() {
      return new KTextMoreOptions(<_TextMoreOptions>this._prop.property('ADBE Text More Options'), this);
    }
    animators() {
      return new KTextAnimators(<PropertyGroup>this._prop.property('ADBE Text Animators'), this);
    }
  }

  export class KTextPathOptions extends KPropertyGroup<_TextPathOptions> {
    path() {
      return new KMaskIndexProperty(<Property>this._prop.property('ADBE Text Path'), this);
    }
  }

  export class KTextMoreOptions extends KPropertyGroup<_TextMoreOptions> {
    anchorPointGrouping() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Anchor Point Option'), this);
    }
    groupingAlignment() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Anchor Point Align'), this);
    }
    fillAndStroke() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Render Order'), this);
    }
    interCharacterBlending() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Blend Mode'), this);
    }
  }

  export class KTextAnimators extends KPropertyGroup<PropertyGroup> {
    addAnimator(name?: string) {
      const animator = <PropertyGroup>this._prop.addProperty('ADBE Text Animator');
      if (name !== void 0) animator.name = name;
      return new KTextAnimator(animator, this);
    }
  }

  export class KTextAnimator extends KPropertyGroup<PropertyGroup> {
    properties() {
      return new KTextAnimatorProperties(<PropertyGroup>this._prop.property('ADBE Text Animator Properties'), this);
    }
    selectors() {
      return new KTextSelectors(<PropertyGroup>this._prop.property('ADBE Text Selectors'), this);
    }
  }

  export class KTextAnimatorProperties extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KThreeDSpatialProperty(<Property>this._prop.property('ADBE Text Anchor Point 3D'), this);
    }
    position() {
      return new KThreeDSpatialProperty(<Property>this._prop.property('ADBE Text Position 3D'), this);
    }
    scale() {
      return new KThreeDProperty(<Property>this._prop.property('ADBE Text Scale 3D'), this);
    }
    skew() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Skew'), this);
    }
    skewAxis() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Skew Axis'), this);
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Rotation'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Opacity'), this);
    }
    fillOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Opacity'), this);
    }
    fillColor() {
      return new KColorProperty(<Property>this._prop.property('ADBE Text Fill Color'), this);
    }
    fillHue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Hue'), this);
    }
    fillSaturation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Saturation'), this);
    }
    fillBrightness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Brightness'), this);
    }
    strokeOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Opacity'), this);
    }
    strokeColor() {
      return new KColorProperty(<Property>this._prop.property('ADBE Text Stroke Color'), this);
    }
    strokeHue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Hue'), this);
    }
    strokeSaturation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Saturation'), this);
    }
    strokeBrightness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Brightness'), this);
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Width'), this);
    }
    lineAnchor() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Line Anchor'), this);
    }
    trackingType() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Track Type'), this);
    }
    trackingAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Tracking Amount'), this);
    }
    characterAlignment() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Change Type'), this);
    }
    characterRange() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Range'), this);
    }
    characterValue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Replace'), this);
    }
    characterOffset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Offset'), this);
    }
    lineSpacing() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Line Spacing'), this);
    }
    blur() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Blur'), this);
    }

    addAnchorPoint() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Anchor Point 3D'), this);
    }
    addPosition() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Position 3D'), this);
    }
    addScale() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Scale 3D'), this);
    }
    addSkew() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Skew'), this);
    }
    addSkewAxis() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Skew Axis'), this);
    }
    addRotation() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Rotation'), this);
    }
    addOpacity() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Opacity'), this);
    }
    addFillOpacity() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Opacity'), this);
    }
    addFillColor() {
      return new KColorProperty(<Property>this._prop.addProperty('ADBE Text Fill Color'), this);
    }
    addFillHue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Hue'), this);
    }
    addFillSaturation() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Saturation'), this);
    }
    addFillBrightness() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Brightness'), this);
    }
    addStrokeOpacity() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Opacity'), this);
    }
    addStrokeColor() {
      return new KColorProperty(<Property>this._prop.addProperty('ADBE Text Stroke Color'), this);
    }
    addStrokeHue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Hue'), this);
    }
    addStrokeSaturation() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Saturation'), this);
    }
    addStrokeBrightness() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Brightness'), this);
    }
    addStrokeWidth() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Width'), this);
    }
    addLineAnchor() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Line Anchor'), this);
    }
    addTrackingType() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Track Type'), this);
    }
    addTrackingAmount() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Tracking Amount'), this);
    }
    addCharacterAlignment() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Change Type'), this);
    }
    addCharacterRange() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Range'), this);
    }
    addCharacterValue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Replace'), this);
    }
    addCharacterOffset() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Offset'), this);
    }
    addLineSpacing() {
      return new KTwoDProperty(<Property>this._prop.addProperty('ADBE Text Line Spacing'), this);
    }
    addBlur() {
      return new KTwoDProperty(<Property>this._prop.addProperty('ADBE Text Blur'), this);
    }
  }

  export class KTextSelectors extends KPropertyGroup<PropertyGroup> {
    addRangeSelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Selector');
      if (name !== void 0) selector.name = name;
      return new KTextRangeSelector(selector, this);
    }
    addWigglySelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Wiggly Selector');
      if (name !== void 0) selector.name = name;
      return new KWigglySelector(selector, this);
    }
    addExpressionSelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Expressible Selector');
      if (name !== void 0) selector.name = name;
      return new KTextExpressionSelector(selector, this);
    }
  }

  export class KTextRangeSelector extends KPropertyGroup<PropertyGroup> {
    start() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent Start'), this);
    }
    end() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent End'), this);
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent Offset'), this);
    }
    advanced() {
      return new KTextRangeAdvanced(<PropertyGroup>this._prop.property('ADBE Text Range Advanced'), this);
    }
  }

  export class KTextRangeAdvanced extends KPropertyGroup<PropertyGroup> {
    units() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Units'), this);
    }
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Type2'), this);
    }
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Mode'), this);
    }
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Max Amount'), this);
    }
    shape() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Shape'), this);
    }
    smoothness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Smoothness'), this);
    }
    easeHigh() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Levels Max Ease'), this);
    }
    easeLow() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Levels Min Ease'), this);
    }
    randomizeOrder() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Randomize Order'), this);
    }
  }

  export class KWigglySelector extends KPropertyGroup<PropertyGroup> {
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Mode'), this);
    }
    maxAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Max Amount'), this);
    }
    minAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Min Amount'), this);
    }
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Min Amount'), this);
    }
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Temporal Freq'), this);
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Correlation'), this);
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Temporal Phase'), this);
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Spatial Phase'), this);
    }
    lockDimensions() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Lock Dim'), this);
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Random Seed'), this);
    }
  }

  export class KTextExpressionSelector extends KPropertyGroup<PropertyGroup> {
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Type2'), this);
    }
    amount() {
      return new KThreeDProperty(<Property>this._prop.property('ADBE Text Expressible Amount'), this);
    }
  }

  /*
  * Shape Property
  */
  export class KVectorsGroup extends KPropertyGroup<PropertyGroup> {
    //group
    addGroup(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Group');
      if (name !== void 0) group.name = name;
      return new KVectorGroup(group, this);
    }
    //shape
    addRectangle(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Rect');
      if (name !== void 0) group.name = name;
      return new KVectorRect(group, this);
    }
    addEllipse(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Ellipse');
      if (name !== void 0) group.name = name;
      return new KVectorEllipse(group, this);
    }
    addPolystar(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Star');
      if (name !== void 0) group.name = name;
      return new KVectorPolystar(group, this);
    }
    addPath(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Group');
      if (name !== void 0) group.name = name;
      return new KVectorPath(group, this);
    }
    //graphic
    addFill(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - Fill');
      if (name !== void 0) group.name = name;
      return new KVectorFill(group, this);
    }
    addStroke(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - Stroke');
      if (name !== void 0) group.name = name;
      return new KVectorStroke(group, this);
    }
    addGradientFill(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - G-Fill');
      if (name !== void 0) group.name = name;
      return new KVectorGradientFill(group, this);
    }
    addGradientStroke(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - G-Stroke');
      if (name !== void 0) group.name = name;
      return new KVectorGradientStroke(group, this);
    }
    //filter
    addMergePaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Merge');
      if (name !== void 0) group.name = name;
      return new KVectorMergePaths(group, this);
    }
    addOffsetPaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Offset');
      if (name !== void 0) group.name = name;
      return new KVectorOffsetPaths(group, this);
    }
    addPuckerAndBloat(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - PB');
      if (name !== void 0) group.name = name;
      return new KVectorPuckerAndBloat(group, this);
    }
    addRepeater(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Repeater');
      if (name !== void 0) group.name = name;
      return new KVectorRepeater(group, this);
    }
    addRoundCorners(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - RC');
      if (name !== void 0) group.name = name;
      return new KVectorRoundCorners(group, this);
    }
    addTrimPaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Trim');
      if (name !== void 0) group.name = name;
      return new KVectorTrimPaths(group, this);
    }
    addTwist(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Twist');
      if (name !== void 0) group.name = name;
      return new KVectorTwist(group, this);
    }
    addWigglePaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Roughen');
      if (name !== void 0) group.name = name;
      return new KVectorWigglePaths(group, this);
    }
    addWiggleTransform(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Wiggler');
      if (name !== void 0) group.name = name;
      return new KVectorWiggler(group, this);
    }
    addZigzag(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Zigzag');
      if (name !== void 0) group.name = name;
      return new KVectorZigzag(group, this);
    }
  }

  export class KRootVectors extends KVectorsGroup { }

  export class KVectorGroup extends KPropertyGroup<PropertyGroup> {
    vectors() {
      return new KVectorsGroup(<PropertyGroup>this._prop.property('ADBE Vectors Group'), this);
    }
    transform() {
      return new KVectorTransform(<PropertyGroup>this._prop.property('ADBE Vector Transform Group'), this);
    }
  }

  export class KVectorTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Anchor'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Position'), this);
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Scale'), this);
    }
    skew() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Skew'), this);
    }
    skewAxis() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Skew Axis'), this);
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Rotation'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Group Opacity'), this);
    }
  }

  //shape
  export class KVectorRect extends KPropertyGroup<PropertyGroup> {
    size() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Rect Size'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Rect Position'), this);
    }
    roundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Rect Roundness'), this);
    }
  }

  export class KVectorEllipse extends KPropertyGroup<PropertyGroup> {
    size() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Ellipse Size'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Ellipse Position'), this);
    }
  }

  export class KVectorPolystar extends KPropertyGroup<PropertyGroup> {
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Type'), this);
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Points'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Star Position'), this);
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Rotation'), this);
    }
    innerRadius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Inner Radius'), this);
    }
    outerRadius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Outer Radius'), this);
    }
    innerRoundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Inner Roundess'), this);
    }
    outerRoundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Outer Roundess'), this);
    }
  }

  export class KVectorPath extends KPropertyGroup<PropertyGroup> {
    path() {
      return new KShapeProperty(<Property>this._prop.property('ADBE Vector Shape'), this);
    }
  }

  //graphic
  export class KVectorFill extends KPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'), this);
    }
    fillRule() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Rule'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('ADBE Vector Fill Color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Opacity'), this);
    }
  }

  export class KVectorStroke extends KPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('ADBE Vector Stroke Color'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Opacity'), this);
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Width'), this);
    }
    lineCap() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Cap'), this);
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Join'), this);
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Miter Limit'), this);
    }
  }

  export class KVectorGradientFill extends KPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'), this);
    }
    fillRule() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Rule'), this);
    }
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Grad Type'), this);
    }
    startPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad Start Pt'), this);
    }
    endPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad End Pt'), this);
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('ADBE Vector Grad Colors'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Opacity'), this);
    }
  }

  export class KVectorGradientStroke extends KPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'), this);
    }
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Grad Type'), this);
    }
    startPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad Start Pt'), this);
    }
    endPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad End Pt'), this);
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('ADBE Vector Grad Colors'), this);
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Opacity'), this);
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Width'), this);
    }
    lineCap() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Cap'), this);
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Join'), this);
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Miter Limit'), this);
    }
  }

  //filter
  export class KVectorMergePaths extends KPropertyGroup<PropertyGroup> {
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Merge Type'), this);
    }
  }

  export class KVectorOffsetPaths extends KPropertyGroup<PropertyGroup> {
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Amount'), this);
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Line Join'), this);
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Miter Limit'), this);
    }
  }

  export class KVectorPuckerAndBloat extends KPropertyGroup<PropertyGroup> {
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector PuckerBloat Amount'), this);
    }
  }

  export class KVectorRepeater extends KPropertyGroup<PropertyGroup> {
    copies() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Copies'), this);
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Offset'), this);
    }
    transform() {
      return new KVectorRepeaterTransform(<PropertyGroup>this._prop.property('ADBE Vector Repeater Transform'), this);
    }
  }

  export class KVectorRepeaterTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Repeater Anchor'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Repeater Position'), this);
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Repeater Scale'), this);
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Rotation'), this);
    }
    startOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Opacity 1'), this);
    }
    endOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Opacity 2'), this);
    }
  }

  export class KVectorRoundCorners extends KPropertyGroup<PropertyGroup> {
    radius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector RoundCorner Radius'), this);
    }
  }

  export class KVectorTrimPaths extends KPropertyGroup<PropertyGroup> {
    start() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Start'), this);
    }
    end() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim End'), this);
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Offset'), this);
    }
    trimMultipleShapes() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Type'), this);
    }
  }

  export class KVectorTwist extends KPropertyGroup<PropertyGroup> {
    angle() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Twist Angle'), this);
    }
    center() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Twist Center'), this);
    }
  }

  export class KVectorWigglePaths extends KPropertyGroup<PropertyGroup> {
    size() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Size'), this);
    }
    detail() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Detail'), this);
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Points'), this);
    }
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Freq'), this);
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Correlation'), this);
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Phase'), this);
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Spatial Phase'), this);
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Random Seed'), this);
    }
  }

  export class KVectorWiggler extends KPropertyGroup<PropertyGroup> {
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Xform Temporal Freq'), this);
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Correlation'), this);
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Phase'), this);
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Spatial Phase'), this);
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Random Seed'), this);
    }
    transform() {
      return new KVectorWigglerTransform(<PropertyGroup>this._prop.property('ADBE Vector Wiggler Transform'), this);
    }
  }

  export class KVectorWigglerTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Wiggler Anchor'), this);
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Wiggler Position'), this);
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Wiggler Scale'), this);
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Wiggler Rotation'), this);
    }
  }

  export class KVectorZigzag extends KPropertyGroup<PropertyGroup> {
    size() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Size'), this);
    }
    ridgesPerSegment() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Detail'), this);
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Points'), this);
    }
  }

  /*
  * Material Property
  */
  export class KMaterialOptions extends KPropertyGroup<PropertyGroup> {
    castsShadows() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Casts Shadows'), this);
    }
    lightTransmission() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Transmission'), this);
    }
    acceptsShadows() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Accepts Shadows'), this);
    }
    acceptsLights() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Accepts Lights'), this);
    }
    ambient() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Ambient Coefficient'), this);
    }
    diffuse() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Diffuse Coefficient'), this);
    }
    specularIntensity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Specular Coefficient'), this);
    }
    specularShininess() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Shininess Coefficient'), this);
    }
    metal() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Metal Coefficient'), this);
    }
  }

  /*
  * Camera Property
  */
  export class KCameraOptions extends KPropertyGroup<PropertyGroup> {
    zoom() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Camera Zoom'), this);
    }
    depthOfField() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Camera Depth of Field'), this);
    }
    focusDistance() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Camera Focus Distance'), this);
    }
    aperture() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Camera Aperture'), this);
    }
    blurLevel() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Camera Blur Level'), this);
    }
    irisShape() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Shape'), this);
    }
    irisRotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Rotation'), this);
    }
    irisRoundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Roundness'), this);
    }
    irisAspectRatio() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Aspect Ratio'), this);
    }
    irisDiffractionFringe() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Diffraction Fringe'), this);
    }
    highlightGain() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Highlight Gain'), this);
    }
    highlightThreshold() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Highlight Threshold'), this);
    }
    highlightSaturation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Iris Hightlight Saturation'), this);
    }
  }

  /*
  * Light Property
  */
  export class KLightOptions extends KPropertyGroup<PropertyGroup> {
    intensity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Intensity'), this);
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('ADBE Light Color'), this);
    }
    coneAngle() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Cone Angle'), this);
    }
    coneFeather() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Cone Feather 2'), this);
    }
    falloff() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Falloff Type'), this);
    }
    radius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Falloff Start'), this);
    }
    falloffDistance() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Falloff Distance'), this);
    }
    castsShadows() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Casts Shadows'), this);
    }
    shadowDarkness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Shadow Darkness'), this);
    }
    shadowDiffusion() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Light Shadow Diffusion'), this);
    }
  }

}