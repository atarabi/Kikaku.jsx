namespace KIKAKU {

  export class KPropertyBase<T extends PropertyBase> {
    constructor(protected _prop: T) { }
    get() {
      return this._prop;
    }
    isValid() {
      const prop = this._prop;
      return prop && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup || prop instanceof Property) && isValid(prop);
    }
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
      if (name !== void 0) this._prop.name = name;
      return this._prop.name;
    }
    matchName() {
      return this._prop.matchName;
    }
    propertyIndex() {
      return this._prop.propertyIndex;
    }
    propertyDepth() {
      return this._prop.propertyDepth;
    }
    propertyType() {
      return this._prop.propertyType;
    }
    parentProperty() {
      return new KPropertyGroup(this._prop.parentProperty);
    }
    isModified() {
      return this._prop.isModified;
    }
    canSetEnabled() {
      return this._prop.canSetEnabled;
    }
    enabled(enabled?: boolean) {
      if (enabled !== void 0) this._prop.enabled = enabled;
      return this._prop.enabled;
    }
    active() {
      return this._prop.active;
    }
    elided() {
      return this._prop.elided;
    }
    isEffect() {
      return this._prop.isEffect;
    }
    isMask() {
      return this._prop.isMask;
    }
    selected(selected?: boolean) {
      if (selected !== void 0) this._prop.selected = selected;
      return this._prop.selected;
    }
    //methods
    property(index_or_name: number | number) {
      return new KPropertyBase(this._prop.property(index_or_name));
    }
    propertyGroup(countUp = 1) {
      return new KPropertyGroup(this._prop.propertyGroup(countUp));
    }
    remove() {
      this._prop.remove();
    }
    moveTo(newIndex: number) {
      this._prop.moveTo(newIndex);
    }
    duplicate() {
      return new KPropertyBase(this._prop.duplicate());
    }
  }

  export class KPropertyGroup<T extends PropertyGroup> extends KPropertyBase<T> {
    isValid() {
      const prop = this._prop;
      return prop && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup) && isValid(prop);
    }
    //attributes
    numProperties() {
      return this._prop.numProperties;
    }
    canAddProperty(name: string) {
      return this._prop.canAddProperty(name);
    }
    addProperty(name: string) {
      return new KPropertyBase(this._prop.addProperty(name));
    }
  }

  export class KMaskPropertyGroup extends KPropertyGroup<MaskPropertyGroup> {
    isValid() {
      const prop = this._prop;
      return prop && prop instanceof MaskPropertyGroup && isValid(prop);
    }
    //attributes
    maskMode(maskMode?: MaskMode) {
      if (maskMode !== void 0) this._prop.maskMode = maskMode;
      return this._prop.maskMode;
    }
    inverted(inverted?: boolean) {
      if (inverted !== void 0) this._prop.inverted = inverted;
      return this._prop.inverted;
    }
    rotoBezier(rotoBezier?: boolean) {
      if (rotoBezier !== void 0) this._prop.rotoBezier = rotoBezier;
      return this._prop.rotoBezier;
    }
    maskMotionBlur(maskMotionBlur?: MaskMotionBlur) {
      if (maskMotionBlur !== void 0) this._prop.maskMotionBlur = maskMotionBlur;
      return this._prop.maskMotionBlur;
    }
    locked(locked?: boolean) {
      if (locked !== void 0) this._prop.locked = locked;
      return this._prop.locked;
    }
    color(color?: [number, number, number]) {
      if (color !== void 0) this._prop.color = color;
      return this._prop.color;
    }
    maskFeatherFalloff(maskFeatherFalloff?: MaskFeatherFalloff) {
      if (maskFeatherFalloff !== void 0) this._prop.maskFeatherFalloff = maskFeatherFalloff;
      return this._prop.maskFeatherFalloff;
    }
  }

  export class KProperty extends KPropertyBase<Property> {
    isValid() {
      const prop = this._prop;
      return prop && prop instanceof Property && isValid(prop);
    }
    //attributes
    propertyValueType() {
      return this._prop.propertyValueType;
    }
    value() {
      return this._prop.value;
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
    valueAtTime(time: number, preExpression: boolean) {
      return this._prop.valueAtTime(time, preExpression);
    }
    setValue(value: PropertyValue) {
      this._prop.setValue(value);
    }
    setValueAtTime(time: number, newValue: PropertyValue) {
      this._prop.setValueAtTime(time, newValue);
    }
    setValuesAtTimes(times: number[], newValues: PropertyValue[]) {
      this._prop.setValuesAtTimes(times, newValues);
    }
    setValueAtKey(keyIndex: number, newValue: PropertyValue) {
      this._prop.setValueAtKey(keyIndex, newValue);
    }
    nearestKeyIndex(time: number) {
      return this._prop.nearestKeyIndex(time);
    }
    keyTime(keyIndex_or_markerComment: number | string) {
      return this._prop.keyTime(<any>keyIndex_or_markerComment);
    }
    keyValue(keyIndex_or_markerComment: number | string) {
      return this._prop.keyValue(<any>keyIndex_or_markerComment);
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

}