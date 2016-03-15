namespace KIKAKU {

  export class KPropertyBase<T extends PropertyBase> {
    constructor(protected _prop: T) { }
    get() {
      return this._prop;
    }
    isValid() {
      const prop = this._prop;
      return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup || prop instanceof Property);
    }
    protected validate() { }
    //cast
    asPropertyGroup() {
      return new KPropertyGroup<PropertyGroup>(<any>this._prop);
    }
    asMaskPropertyGroup() {
      return new KMaskPropertyGroup(<MaskPropertyGroup>(<any>this._prop));
    }
    asProperty() {
      return new KProperty(<any>this._prop);
    }
    //attributes
    name(name?: string) {
      this.validate();
      if (name !== void 0) this._prop.name = name;
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
    property(index_or_name: number | string) {
      this.validate();
      return new KPropertyBase(this._prop.property(<any>index_or_name));
    }
    propertyAsProperty(index_or_name: number | string) {
      this.validate();
      return new KPropertyBase(this._prop.property(<any>index_or_name)).asProperty();
    }
    propertyAsPropertyGroup(index_or_name: number | string) {
      this.validate();
      return new KPropertyBase(this._prop.property(<any>index_or_name)).asPropertyGroup();
    }
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
    isValid() {
      const prop = this._prop;
      return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup);
    }
    //attributes
    numProperties() {
      this.validate();
      return this._prop.numProperties;
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
  }

  export class KIndexedChildPropertyGroup<T extends PropertyGroup> extends KPropertyGroup<T> {
    protected _indexed_group: KPropertyGroup<PropertyGroup>;
    protected _name: string;
    constructor(prop: T) {
      super(prop);
      this._indexed_group = this.parentProperty();
      this._name = prop.name;
    }
    //override
    protected validate() {
      if (!this.isValid()) {
        this._prop = <T>this._indexed_group.get().property(this._name)
      }
    }
    name(name?: string) {
      this.validate();
      if (name !== void 0) this._prop.name = this._name = name;
      return this._prop.name;
    }
  }

  export class KMaskPropertyGroup extends KIndexedChildPropertyGroup<MaskPropertyGroup> {
    isValid() {
      const prop = this._prop;
      return isValid(prop) && prop instanceof MaskPropertyGroup;
    }
    //properties
    maskPath() {
      this.validate();
      return new KShapeProperty(<Property>this._prop.property('ADBE Mask Shape'));
    }
    maskFeather() {
      this.validate();
      return new KTwoDProperty(<Property>this._prop.property('ADBE Mask Feather'));
    }
    maskOpacity() {
      this.validate();
      return new KOneDProperty(<Property>this._prop.property('ADBE Mask Opacity'));
    }
    maskExpansion() {
      this.validate();
      return new KOneDProperty(<Property>this._prop.property('ADBE Mask Offset'));
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
    isValid() {
      const prop = this._prop;
      return isValid(prop) && prop instanceof Property;
    }
    //cast
    asNoValue() {
      return new KNoValueProperty(this._prop);
    }
    asThreeDSpatial() {
      return new KThreeDSpatialProperty(this._prop);
    }
    asThreeD() {
      return new KThreeDProperty(this._prop);
    }
    asTwoDSpatial() {
      return new KTwoDSpatialProperty(this._prop);
    }
    asTwoD() {
      return new KTwoDProperty(this._prop);
    }
    asOneD() {
      return new KOneDProperty(this._prop);
    }
    asColor() {
      return new KColorProperty(this._prop);
    }
    asCustomValue() {
      return new KCustomValueProperty(this._prop);
    }
    asMarker() {
      return new KMarkerProperty(this._prop);
    }
    asLayerIndex() {
      return new KLayerIndexProperty(this._prop);
    }
    asMaskIndex() {
      return new KMaskIndexProperty(this._prop);
    }
    asShape() {
      return new KShapeProperty(this._prop);
    }
    asTextDocument() {
      return new KTextDocumentProperty(this._prop);
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

  export class KTextDocumentProperty extends KProperty<Shape> {
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
      return new KMaskPropertyGroup(mask_atom);
    }
  }

  /*
  * Effect Property
  */
  export class KEffectParade extends KPropertyGroup<PropertyGroup> {
    //override
    addProperty(name_or_matchname: string): KEffect {
      const prop = this._prop.addProperty(name_or_matchname);
      return new KEffect(<PropertyGroup>prop);
    }
    addPropertyAsPropertyGroup(name: string) {
      return this.addProperty(name);
    }
  }

  export class KEffect extends KIndexedChildPropertyGroup<PropertyGroup> {
    //override
    property(index_or_name: number | string) {
      this.validate();
      return new KProperty(<Property>this._prop.property(<any>index_or_name))
    }
  }

  /*
  * Text Property
  */
  export class KTextProperties extends KPropertyGroup<PropertyGroup> {
    sourceText() {
      return new KTextDocumentProperty(<Property>this._prop.property('ADBE Text Document'));
    }
    pathOptions() {
      return new KTextPathOptions(<_TextPathOptions>this._prop.property('ADBE Text Path Options'));
    }
    moreOptions() {
      return new KTextMoreOptions(<_TextMoreOptions>this._prop.property('ADBE Text More Options'));
    }
    animators() {
      return new KTextAnimators(<PropertyGroup>this._prop.property('ADBE Text Animators'));
    }
  }

  export class KTextPathOptions extends KPropertyGroup<_TextPathOptions> {
    path() {
      return new KMaskIndexProperty(<Property>this._prop.property('ADBE Text Path'));
    }
  }

  export class KTextMoreOptions extends KPropertyGroup<_TextMoreOptions> {
    anchorPointGrouping() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Anchor Point Option'));
    }
    groupingAlignment() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Anchor Point Align'));
    }
    fillAndStroke() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Render Order'));
    }
    interCharacterBlending() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Blend Mode'));
    }
  }

  export class KTextAnimators extends KPropertyGroup<PropertyGroup> {
    addAnimator(name?: string) {
      const animator = <PropertyGroup>this._prop.addProperty('ADBE Text Animator');
      if (name !== void 0) animator.name = name;
      return new KTextAnimator(animator);
    }
  }

  export class KTextAnimator extends KIndexedChildPropertyGroup<PropertyGroup> {
    properties() {
      return new KTextAnimatorProperties(<PropertyGroup>this._prop.property('ADBE Text Animator Properties'));
    }
    selectors() {
      return new KTextSelectors(<PropertyGroup>this._prop.property('ADBE Text Selectors'));
    }
  }

  export class KTextAnimatorProperties extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KThreeDSpatialProperty(<Property>this._prop.property('ADBE Text Anchor Point 3D'));
    }
    position() {
      return new KThreeDSpatialProperty(<Property>this._prop.property('ADBE Text Position 3D'));
    }
    scale() {
      return new KThreeDProperty(<Property>this._prop.property('ADBE Text Scale 3D'));
    }
    skew() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Skew'));
    }
    skewAxis() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Skew Axis'));
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Rotation'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Opacity'));
    }
    fillOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Opacity'));
    }
    fillColor() {
      return new KColorProperty(<Property>this._prop.property('ADBE Text Fill Color'));
    }
    fillHue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Hue'));
    }
    fillSaturation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Saturation'));
    }
    fillBrightness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Fill Brightness'));
    }
    strokeOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Opacity'));
    }
    strokeColor() {
      return new KColorProperty(<Property>this._prop.property('ADBE Text Stroke Color'));
    }
    strokeHue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Hue'));
    }
    strokeSaturation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Saturation'));
    }
    strokeBrightness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Brightness'));
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Stroke Width'));
    }
    lineAnchor() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Line Anchor'));
    }
    trackingType() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Track Type'));
    }
    trackingAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Tracking Amount'));
    }
    characterAlignment() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Change Type'));
    }
    characterRange() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Range'));
    }
    characterValue() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Replace'));
    }
    characterOffset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Offset'));
    }
    lineSpacing() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Line Spacing'));
    }
    blur() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Text Blur'));
    }

    addAnchorPoint() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Anchor Point 3D'));
    }
    addPosition() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Position 3D'));
    }
    addScale() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Scale 3D'));
    }
    addSkew() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Skew'));
    }
    addSkewAxis() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Skew Axis'));
    }
    addRotation() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Rotation'));
    }
    addOpacity() {
      return new KThreeDSpatialProperty(<Property>this._prop.addProperty('ADBE Text Opacity'));
    }
    addFillOpacity() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Opacity'));
    }
    addFillColor() {
      return new KColorProperty(<Property>this._prop.addProperty('ADBE Text Fill Color'));
    }
    addFillHue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Hue'));
    }
    addFillSaturation() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Saturation'));
    }
    addFillBrightness() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Fill Brightness'));
    }
    addStrokeOpacity() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Opacity'));
    }
    addStrokeColor() {
      return new KColorProperty(<Property>this._prop.addProperty('ADBE Text Stroke Color'));
    }
    addStrokeHue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Hue'));
    }
    addStrokeSaturation() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Saturation'));
    }
    addStrokeBrightness() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Brightness'));
    }
    addStrokeWidth() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Stroke Width'));
    }
    addLineAnchor() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Line Anchor'));
    }
    addTrackingType() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Track Type'));
    }
    addTrackingAmount() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Tracking Amount'));
    }
    addCharacterAlignment() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Change Type'));
    }
    addCharacterRange() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Range'));
    }
    addCharacterValue() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Replace'));
    }
    addCharacterOffset() {
      return new KOneDProperty(<Property>this._prop.addProperty('ADBE Text Character Offset'));
    }
    addLineSpacing() {
      return new KTwoDProperty(<Property>this._prop.addProperty('ADBE Text Line Spacing'));
    }
    addBlur() {
      return new KTwoDProperty(<Property>this._prop.addProperty('ADBE Text Blur'));
    }
  }

  export class KTextSelectors extends KPropertyGroup<PropertyGroup> {
    addRangeSelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Selector');
      if (name !== void 0) selector.name = name;
      return new KTextRangeSelector(selector);
    }
    addWigglySelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Wiggly Selector');
      if (name !== void 0) selector.name = name;
      return new KWigglySelector(selector);
    }
    addExpressionSelector(name?: string) {
      const selector = <PropertyGroup>this._prop.addProperty('ADBE Text Expressible Selector');
      if (name !== void 0) selector.name = name;
      return new KTextExpressionSelector(selector);
    }
  }

  export class KTextRangeSelector extends KIndexedChildPropertyGroup<PropertyGroup> {
    start() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent Start'));
    }
    end() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent End'));
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Percent Offset'));
    }
    advanced() {
      return new KTextRangeAdvanced(<PropertyGroup>this._prop.property('ADBE Text Range Advanced'));
    }
  }

  export class KTextRangeAdvanced extends KPropertyGroup<PropertyGroup> {
    units() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Units'));
    }
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Type2'));
    }
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Mode'));
    }
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Max Amount'));
    }
    shape() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Shape'));
    }
    smoothness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Smoothness'));
    }
    easeHigh() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Levels Max Ease'));
    }
    easeLow() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Levels Min Ease'));
    }
    randomizeOrder() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Randomize Order'));
    }
  }

  export class KWigglySelector extends KIndexedChildPropertyGroup<PropertyGroup> {
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Selector Mode'));
    }
    maxAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Max Amount'));
    }
    minAmount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Min Amount'));
    }
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Min Amount'));
    }
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Temporal Freq'));
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Character Correlation'));
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Temporal Phase'));
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Spatial Phase'));
    }
    lockDimensions() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Lock Dim'));
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Wiggly Random Seed'));
    }
  }

  export class KTextExpressionSelector extends KIndexedChildPropertyGroup<PropertyGroup> {
    basedOn() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Text Range Type2'));
    }
    amount() {
      return new KThreeDProperty(<Property>this._prop.property('ADBE Text Expressible Amount'));
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
      return new KVectorGroup(group);
    }
    //shape
    addRectangle(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Rect');
      if (name !== void 0) group.name = name;
      return new KVectorRect(group);
    }
    addEllipse(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Ellipse');
      if (name !== void 0) group.name = name;
      return new KVectorEllipse(group);
    }
    addPolystar(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Star');
      if (name !== void 0) group.name = name;
      return new KVectorPolystar(group);
    }
    addPath(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Shape - Group');
      if (name !== void 0) group.name = name;
      return new KVectorPath(group);
    }
    //graphic
    addFill(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - Fill');
      if (name !== void 0) group.name = name;
      return new KVectorFill(group);
    }
    addStroke(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - Stroke');
      if (name !== void 0) group.name = name;
      return new KVectorStroke(group);
    }
    addGradientFill(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - G-Fill');
      if (name !== void 0) group.name = name;
      return new KVectorGradientFill(group);
    }
    addGradientStroke(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Graphic - G-Stroke');
      if (name !== void 0) group.name = name;
      return new KVectorGradientStroke(group);
    }
    //filter
    addMergePaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Merge');
      if (name !== void 0) group.name = name;
      return new KVectorMergePaths(group);
    }
    addOffsetPaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Offset');
      if (name !== void 0) group.name = name;
      return new KVectorOffsetPaths(group);
    }
    addPuckerAndBloat(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - PB');
      if (name !== void 0) group.name = name;
      return new KVectorPuckerAndBloat(group);
    }
    addRepeater(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Repeater');
      if (name !== void 0) group.name = name;
      return new KVectorRepeater(group);
    }
    addRoundCorners(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - RC');
      if (name !== void 0) group.name = name;
      return new KVectorRoundCorners(group);
    }
    addTrimPaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Trim');
      if (name !== void 0) group.name = name;
      return new KVectorTrimPaths(group);
    }
    addTwist(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Twist');
      if (name !== void 0) group.name = name;
      return new KVectorTwist(group);
    }
    addWigglePaths(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Roughen');
      if (name !== void 0) group.name = name;
      return new KVectorWigglePaths(group);
    }
    addWiggleTransform(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Wiggler');
      if (name !== void 0) group.name = name;
      return new KVectorWiggler(group);
    }
    addZigzag(name?: string) {
      const group = <PropertyGroup>this._prop.addProperty('ADBE Vector Filter - Zigzag');
      if (name !== void 0) group.name = name;
      return new KVectorZigzag(group);
    }
  }

  export class KRootVectors extends KVectorsGroup { }

  export class KVectorGroup extends KIndexedChildPropertyGroup<PropertyGroup> {
    vectors() {
      return new KVectorsGroup(<PropertyGroup>this._prop.property('ADBE Vectors Group'));
    }
    transform() {
      return new KVectorTransform(<PropertyGroup>this._prop.property('ADBE Vector Transform Group'));
    }
  }

  export class KVectorTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Anchor'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Position'));
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Scale'));
    }
    skew() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Skew'));
    }
    skewAxis() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Skew Axis'));
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Rotation'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Group Opacity'));
    }
  }

  //shape
  export class KVectorRect extends KIndexedChildPropertyGroup<PropertyGroup> {
    size() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Rect Size'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Rect Position'));
    }
    roundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Rect Roundness'));
    }
  }

  export class KVectorEllipse extends KIndexedChildPropertyGroup<PropertyGroup> {
    size() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Ellipse Size'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Ellipse Position'));
    }
  }

  export class KVectorPolystar extends KIndexedChildPropertyGroup<PropertyGroup> {
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Type'));
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Points'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Star Position'));
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Rotation'));
    }
    innerRadius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Inner Radius'));
    }
    outerRadius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Outer Radius'));
    }
    innerRoundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Inner Roundess'));
    }
    outerRoundness() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Star Outer Roundess'));
    }
  }

  export class KVectorPath extends KIndexedChildPropertyGroup<PropertyGroup> {
    path() {
      return new KShapeProperty(<Property>this._prop.property('ADBE Vector Shape'));
    }
  }

  //graphic
  export class KVectorFill extends KIndexedChildPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'));
    }
    fillRule() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Rule'));
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('ADBE Vector Fill Color'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Opacity'));
    }
  }

  export class KVectorStroke extends KIndexedChildPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'));
    }
    color() {
      return new KColorProperty(<Property>this._prop.property('ADBE Vector Stroke Color'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Opacity'));
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Width'));
    }
    lineCap() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Cap'));
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Join'));
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Miter Limit'));
    }
  }

  export class KVectorGradientFill extends KIndexedChildPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'));
    }
    fillRule() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Rule'));
    }
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Grad Type'));
    }
    startPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad Start Pt'));
    }
    endPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad End Pt'));
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('ADBE Vector Grad Colors'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Fill Opacity'));
    }
  }

  export class KVectorGradientStroke extends KIndexedChildPropertyGroup<PropertyGroup> {
    composite() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Composite Order'));
    }
    type() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Grad Type'));
    }
    startPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad Start Pt'));
    }
    endPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Grad End Pt'));
    }
    colors() {
      return new KCustomValueProperty(<Property>this._prop.property('ADBE Vector Grad Colors'));
    }
    opacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Opacity'));
    }
    strokeWidth() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Width'));
    }
    lineCap() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Cap'));
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Line Join'));
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Stroke Miter Limit'));
    }
  }

  //filter
  export class KVectorMergePaths extends KIndexedChildPropertyGroup<PropertyGroup> {
    mode() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Merge Type'));
    }
  }

  export class KVectorOffsetPaths extends KIndexedChildPropertyGroup<PropertyGroup> {
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Amount'));
    }
    lineJoin() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Line Join'));
    }
    miterLimit() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Offset Miter Limit'));
    }
  }

  export class KVectorPuckerAndBloat extends KIndexedChildPropertyGroup<PropertyGroup> {
    amount() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector PuckerBloat Amount'));
    }
  }

  export class KVectorRepeater extends KIndexedChildPropertyGroup<PropertyGroup> {
    copies() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Copies'));
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Offset'));
    }
    transform() {
      return new KVectorRepeaterTransform(<PropertyGroup>this._prop.property('ADBE Vector Repeater Transform'));
    }
  }

  export class KVectorRepeaterTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Repeater Anchor'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Repeater Position'));
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Repeater Scale'));
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Rotation'));
    }
    startOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Opacity 1'));
    }
    endOpacity() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Repeater Opacity 2'));
    }
  }

  export class KVectorRoundCorners extends KIndexedChildPropertyGroup<PropertyGroup> {
    radius() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector RoundCorner Radius'));
    }
  }

  export class KVectorTrimPaths extends KIndexedChildPropertyGroup<PropertyGroup> {
    start() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Start'));
    }
    end() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim End'));
    }
    offset() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Offset'));
    }
    trimMultipleShapes() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Trim Type'));
    }
  }

  export class KVectorTwist extends KIndexedChildPropertyGroup<PropertyGroup> {
    angle() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Twist Angle'));
    }
    center() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Twist Center'));
    }
  }

  export class KVectorWigglePaths extends KIndexedChildPropertyGroup<PropertyGroup> {
    size() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Size'));
    }
    detail() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Detail'));
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Roughen Points'));
    }
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Freq'));
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Correlation'));
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Phase'));
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Spatial Phase'));
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Random Seed'));
    }
  }

  export class KVectorWiggler extends KIndexedChildPropertyGroup<PropertyGroup> {
    wigglesPerSecond() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Xform Temporal Freq'));
    }
    correlation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Correlation'));
    }
    temporalPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Temporal Phase'));
    }
    spatialPhase() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Spatial Phase'));
    }
    randomSeed() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Random Seed'));
    }
    transform() {
      return new KVectorWigglerTransform(<PropertyGroup>this._prop.property('ADBE Vector Wiggler Transform'));
    }
  }

  export class KVectorWigglerTransform extends KPropertyGroup<PropertyGroup> {
    anchorPoint() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Wiggler Anchor'));
    }
    position() {
      return new KTwoDSpatialProperty(<Property>this._prop.property('ADBE Vector Wiggler Position'));
    }
    scale() {
      return new KTwoDProperty(<Property>this._prop.property('ADBE Vector Wiggler Scale'));
    }
    rotation() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Wiggler Rotation'));
    }
  }

  export class KVectorZigzag extends KIndexedChildPropertyGroup<PropertyGroup> {
    size() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Size'));
    }
    ridgesPerSegment() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Detail'));
    }
    points() {
      return new KOneDProperty(<Property>this._prop.property('ADBE Vector Zigzag Points'));
    }
  }

}