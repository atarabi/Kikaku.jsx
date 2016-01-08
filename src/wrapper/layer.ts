namespace KIKAKU {

  export class KLayerCollection {
    constructor(protected _layers: LayerCollection) { }
    add(item: AVItem, duration?: number) {
      if (duration !== void 0) {
        return new KAVLayer(this._layers.add(item, duration));
      }
      return new KAVLayer(this._layers.add(item));
    }
    addNull(duration?: number) {
      if (duration !== void 0) {
        return new KAVLayer(this._layers.addNull(duration));
      }
      return new KAVLayer(this._layers.addNull());
    }
    addSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number, duration?: number) {
      if (duration !== void 0) {
        return new KAVLayer(this._layers.addSolid(color, name, width, height, pixelAspect, duration));
      }
      return new KAVLayer(this._layers.addSolid(color, name, width, height, pixelAspect));
    }
    addText(sourceText?: string | TextDocument) {
      if (sourceText !== void 0) {
        return new KTextLayer(this._layers.addText(sourceText));
      }
      return new KTextLayer(this._layers.addText());
    }
    addBoxText(size: [number, number], sourceText?: string | TextDocument) {
      if (sourceText !== void 0) {
        return new KTextLayer(this._layers.addBoxText(size, sourceText));
      }
      return new KTextLayer(this._layers.addBoxText(size));
    }
    addCamera(name: string, centerPoint: [number, number]) {
      return new KCameraLayer(this._layers.addCamera(name, centerPoint));
    }
    addLight(name: string, centerPoint: [number, number]) {
      return new KLightLayer(this._layers.addLight(name, centerPoint));
    }
    addShape() {
      return new KShapeLayer(this._layers.addShape());
    }
    byName(name: string) {
      return new KLayer(this._layers.byName(name));
    }
    precompose(layerIndices: number[], name: string, moveAllAttributes: boolean = true) {
      return new KCompItem(this._layers.precompose(layerIndices, name, moveAllAttributes));
    }
  }

  export class KLayer<T extends Layer> {
    constructor(protected _layer: T) { }
    get() {
      return this._layer;
    }
    isValid() {
      let layer = this._layer;
      return layer && (layer instanceof CameraLayer || layer instanceof LightLayer || layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer) && isValid(layer);
    }
    //cast
    asAV() {
      return new KAVLayer<AVLayer>(<any>this._layer);
    }
    asShape() {
      return new KShapeLayer(<any>this._layer);
    }
    asText() {
      return new KTextLayer(<any>this._layer);
    }
    asLight() {
      return new KLightLayer(<any>this._layer);
    }
    asCamera() {
      return new KCameraLayer(<any>this._layer);
    }
    //attributes
    index() {
      return this._layer.index;
    }
    name(name?: string) {
      if (name !== void 0) this._layer.name = name;
      return this._layer.name;
    }
    parent(parent?: Layer) {
      if (parent !== void 0) this._layer.parent = parent;
      return this._layer.parent;
    }
    time(time?: number) {
      if (time !== void 0) this._layer.time = time;
      return this._layer.time;
    }
    startTime(startTime?: number) {
      if (startTime !== void 0) this._layer.startTime = startTime;
      return this._layer.startTime;
    }
    stretch(stretch?: number) {
      if (stretch !== void 0) this._layer.stretch = stretch;
      return this._layer.stretch;
    }
    inPoint(inPoint?: number) {
      if (inPoint !== void 0) this._layer.inPoint = inPoint;
      return this._layer.inPoint;
    }
    outPoint(outPoint?: number) {
      if (outPoint !== void 0) this._layer.outPoint = outPoint;
      return this._layer.outPoint;
    }
    enabled(enabled?: boolean) {
      if (enabled !== void 0) this._layer.enabled = enabled;
      return this._layer.enabled;
    }
    solo(solo?: boolean) {
      if (solo !== void 0) this._layer.solo = solo;
      return this._layer.solo;
    }
    shy(shy?: boolean) {
      if (shy !== void 0) this._layer.shy = shy;
      return this._layer.shy;
    }
    locked(locked?: boolean) {
      if (locked !== void 0) this._layer.locked = locked;
      return this._layer.locked;
    }
    hasVideo() {
      return this._layer.hasVideo;
    }
    active() {
      return this._layer.active;
    }
    nullLayer() {
      return this._layer.nullLayer;
    }
    selectedProperties() {
      return new KArray(this._layer.selectedProperties.slice()).map(property => new KPropertyBase(property));
    }
    comment(comment?: string) {
      if (comment !== void 0) this._layer.comment = comment;
      return this._layer.comment;
    }
    containingComp() {
      return new KCompItem(this._layer.containingComp);
    }
    isNameSet() {
      return this._layer.isNameSet;
    }
    //methods
    remove() {
      this._layer.remove();
    }
    moveToBeginning() {
      this._layer.moveToBeginning();
    }
    moveToEnd() {
      this._layer.moveToEnd();
    }
    moveAfter(layer: Layer) {
      this._layer.moveAfter(layer);
    }
    moveBefore(layer: Layer) {
      this._layer.moveBefore(layer);
    }
    duplicate() {
      return new KLayer(this._layer.duplicate());
    }
    copyToComp(intoComp: CompItem) {
      this._layer.copyToComp(intoComp);
      return new KLayer(intoComp.layer(1));
    }
    activeAtTime(time: number) {
      return this._layer.activeAtTime(time);
    }
    setParentWithJump(newParent?: Layer) {
      if (newParent !== void 0) this._layer.setParentWithJump(newParent);
      else this._layer.setParentWithJump();
    }
    applyPreset(presetName: File) {
      this._layer.applyPreset(presetName);
    }
  }

  export class KAVLayer<T extends AVLayer> extends KLayer<T> {
    isValid() {
      let layer = this._layer;
      return layer && (layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer) && isValid(layer);
    }
    //attributes
    source() {
      return new KAVItem(this._layer.source);
    }
    isNameFromSource() {
      return this._layer.isNameFromSource;
    }
    height() {
      return this._layer.height;
    }
    width() {
      return this._layer.width;
    }
    audioEnabled(audioEnabled?: boolean) {
      if (audioEnabled !== void 0) this._layer.audioEnabled = audioEnabled;
      return this._layer.audioEnabled;
    }
    motionBlur(motionBlur?: boolean) {
      if (motionBlur !== void 0) this._layer.motionBlur = motionBlur;
      return this._layer.motionBlur;
    }
    effectsActive(effectsActive?: boolean) {
      if (effectsActive !== void 0) this._layer.effectsActive = effectsActive;
      return this._layer.effectsActive;
    }
    adjustmentLayer(adjustmentLayer?: boolean) {
      if (adjustmentLayer !== void 0) this._layer.adjustmentLayer = adjustmentLayer;
      return this._layer.adjustmentLayer;
    }
    guideLayer(guideLayer?: boolean) {
      if (guideLayer !== void 0) this._layer.guideLayer = guideLayer;
      return this._layer.guideLayer;
    }
    threeDLayer(threeDLayer?: boolean) {
      if (threeDLayer !== void 0) this._layer.threeDLayer = threeDLayer;
      return this._layer.threeDLayer;
    }
    threeDPerChar(threeDPerChar?: boolean) {
      if (threeDPerChar !== void 0) this._layer.threeDPerChar = threeDPerChar;
      return this._layer.threeDPerChar;
    }
    environmentLayer(environmentLayer?: boolean) {
      if (environmentLayer !== void 0) this._layer.environmentLayer = environmentLayer;
      return this._layer.environmentLayer;
    }
    canSetCollapseTransformation() {
      return this._layer.canSetCollapseTransformation;
    }
    collapseTransformation(collapseTransformation?: boolean) {
      if (collapseTransformation !== void 0) this._layer.collapseTransformation = collapseTransformation;
      return this._layer.collapseTransformation;
    }
    frameBlending(frameBlending?: boolean) {
      if (frameBlending !== void 0) this._layer.frameBlending = frameBlending;
      return this._layer.frameBlending;
    }
    frameBlendingType(frameBlendingType?: FrameBlendingType) {
      if (frameBlendingType !== void 0) this._layer.frameBlendingType = frameBlendingType;
      return this._layer.frameBlendingType;
    }
    canSetTimeRemapEnabled() {
      return this._layer.canSetTimeRemapEnabled;
    }
    timeRemapEnabled(timeRemapEnabled?: boolean) {
      if (timeRemapEnabled !== void 0) this._layer.timeRemapEnabled = timeRemapEnabled;
      return this._layer.timeRemapEnabled;
    }
    hasAudio() {
      return this._layer.hasAudio;
    }
    audioActive() {
      return this._layer.audioActive;
    }
    blendingMode(blendingMode?: BlendingMode) {
      if (blendingMode !== void 0) this._layer.blendingMode = blendingMode;
      return this._layer.blendingMode;
    }
    preserveTransparency(preserveTransparency?: boolean) {
      if (preserveTransparency !== void 0) this._layer.preserveTransparency = preserveTransparency;
      return this._layer.preserveTransparency;
    }
    trackMatteType(trackMatteType?: TrackMatteType) {
      if (trackMatteType !== void 0) this._layer.trackMatteType = trackMatteType;
      return this._layer.trackMatteType;
    }
    isTrackMatte() {
      return this._layer.isTrackMatte;
    }
    hasTrackMatte() {
      return this._layer.hasTrackMatte;
    }
    quality(quality?: LayerQuality) {
      if (quality !== void 0) this._layer.quality = quality;
      return this._layer.quality;
    }
    autoOrient(autoOrient?: AutoOrientType) {
      if (autoOrient !== void 0) this._layer.autoOrient = autoOrient;
      return this._layer.autoOrient;
    }
    samplingQuality(samplingQuality?: LayerSamplingQuality) {
      if (samplingQuality !== void 0) this._layer.samplingQuality = samplingQuality;
      return this._layer.samplingQuality;
    }
    //methods
    audioActiveAtTime(time: number) {
      return this._layer.audioActiveAtTime(time);
    }
    calculateTransformFromPoints(pointTopLeft: [number, number, number], pointTopRight: [number, number, number], pointBottomRight: [number, number, number]) {
      return this._layer.calculateTransformFromPoints(pointTopLeft, pointTopRight, pointBottomRight);
    }
    replaceSource(newSource: AVItem, fixExpressions: boolean) {
      this._layer.replaceSource(newSource, fixExpressions);
    }
    sourceRectAtTime(timeT: number, extents: boolean) {
      return this._layer.sourceRectAtTime(timeT, extents);
    }
    openInViewer() {
      return this._layer.openInViewer();
    }
  }

  export class KShapeLayer extends KAVLayer<ShapeLayer> {
    isValid() {
      let layer = this._layer;
      return layer && layer instanceof ShapeLayer && isValid(layer);
    }
  }

  export class KTextLayer extends KAVLayer<TextLayer> {
    isValid() {
      let layer = this._layer;
      return layer && layer instanceof TextLayer && isValid(layer);
    }
  }

  export class KCameraLayer extends KLayer<CameraLayer> {
    isValid() {
      let layer = this._layer;
      return layer && layer instanceof CameraLayer && isValid(layer);
    }
  }

  export class KLightLayer extends KLayer<LightLayer> {
    isValid() {
      let layer = this._layer;
      return layer && layer instanceof LightLayer && isValid(layer);
    }
  }

}