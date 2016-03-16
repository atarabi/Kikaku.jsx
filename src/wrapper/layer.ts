namespace KIKAKU {

  export class KLayerCollection {
    constructor(protected _layers: LayerCollection) { }
    length() {
      return this._layers.length;
    }
    at(index: number) {
      return new KLayer(this._layers[index]);
    }
    //utility
    forEach(fn: (layer: Layer, index: number) => void) {
      const layers = this._layers;
      for (let i = 1, l = layers.length; i <= l; i++) {
        fn(layers[i], i);
      }
    }
    //methods
    add<T extends AVItem>(item: AVItem | KAVItem<T>, duration?: number) {
      const av_item = item instanceof KAVItem ? item.get() : item;
      if (duration !== void 0) {
        return new KAVLayer(this._layers.add(av_item, duration));
      }
      return new KAVLayer(this._layers.add(av_item));
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
    addShape(name?: string) {
      const shape_layer = this._layers.addShape();
      if (name !== void 0) shape_layer.name = name;
      return new KShapeLayer(shape_layer);
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
      return isValid(layer) && (layer instanceof CameraLayer || layer instanceof LightLayer || layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer);
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
    //properties
    marker() {
      return new KMarkerProperty(this._layer.marker);
    }
    transform() {
      return new KPropertyGroup(this._layer.transform);
    }
    anchorPoint() {
      return new KThreeDSpatialProperty(this._layer.transform.anchorPoint);
    }
    position() {
      return new KThreeDSpatialProperty(this._layer.transform.position);
    }
    xPosition() {
      return new KOneDProperty(this._layer.transform.xPosition);
    }
    yPosition() {
      return new KOneDProperty(this._layer.transform.yPosition);
    }
    zPosition() {
      return new KOneDProperty(this._layer.transform.zPosition);
    }
    scale() {
      return new KThreeDProperty(this._layer.transform.scale);
    }
    orientation() {
      return new KThreeDSpatialProperty(this._layer.transform.orientation);
    }
    rotation() {
      return new KOneDProperty(this._layer.transform.rotation);
    }
    xRotation() {
      return new KOneDProperty(this._layer.transform.xRotation);
    }
    yRotation() {
      return new KOneDProperty(this._layer.transform.yRotation);
    }
    zRotation() {
      return new KOneDProperty(this._layer.transform.zRotation);
    }
    opacity() {
      return new KOneDProperty(this._layer.transform.opacity);
    }
    //attributes
    index() {
      return this._layer.index;
    }
    name(name?: string) {
      if (name !== void 0) this._layer.name = name;
      return this._layer.name;
    }
    parent<U extends Layer>(parent?: Layer | KLayer<U>) {
      if (parent !== void 0) {
        if (parent instanceof KLayer) {
          this._layer.parent = parent.get();
        } else {
          this._layer.parent = parent;
        }
      }
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
    moveAfter<U extends Layer>(layer: Layer | KLayer<U>) {
      if (layer instanceof KLayer) {
        this._layer.moveAfter(layer.get());
      } else {
        this._layer.moveAfter(layer);
      }
    }
    moveBefore<U extends Layer>(layer: Layer | KLayer<U>) {
      if (layer instanceof KLayer) {
        this._layer.moveBefore(layer.get());
      } else {
        this._layer.moveBefore(layer);
      }
    }
    duplicate() {
      return new KLayer(this._layer.duplicate());
    }
    copyToComp(intoComp: CompItem | KCompItem) {
      const comp = intoComp instanceof KCompItem ? intoComp.get() : intoComp;
      this._layer.copyToComp(comp);
      return new KLayer(comp.layer(1));
    }
    activeAtTime(time: number) {
      return this._layer.activeAtTime(time);
    }
    setParentWithJump<U extends Layer>(newParent?: Layer | KLayer<U>) {
      if (newParent !== void 0) {
        const parent = newParent instanceof KLayer ? newParent.get() : newParent;
        this._layer.setParentWithJump(parent);
      }
      else this._layer.setParentWithJump();
    }
    applyPreset(presetName: File | KFile) {
      if (presetName instanceof KFile) {
        this._layer.applyPreset(presetName.get());

      } else {
        this._layer.applyPreset(presetName);

      }
    }
  }

  export class KAVLayer<T extends AVLayer> extends KLayer<T> {
    isValid() {
      let layer = this._layer;
      return isValid(layer) && (layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer);
    }
    //properties
    timeRemap() {
      return new KOneDProperty(this._layer.timeRemap);
    }
    mask() {
      return new KMaskParade(this._layer.mask);
    }
    effect() {
      return new KEffectParade(this._layer.effect);
    }
    layerStyle() {
      return new KLayerStyles(this._layer.layerStyle);
    }
    geometryOption() {
      return new KPropertyGroup(this._layer.geometryOption);
    }
    materialOption() {
      return new KMaterialOptions(this._layer.materialOption);
    }
    audio() {
      return new KPropertyGroup(this._layer.audio);
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
    replaceSource<U extends AVItem>(newSource: AVItem | KAVItem<U>, fixExpressions: boolean) {
      const source = newSource instanceof KAVItem ? newSource.get() : newSource;
      this._layer.replaceSource(source, fixExpressions);
    }
    sourceRectAtTime(timeT: number, extents: boolean) {
      return this._layer.sourceRectAtTime(timeT, extents);
    }
    openInViewer() {
      return this._layer.openInViewer();
    }
    sourcePointToComp(point: [number, number]) {
      return this._layer.sourcePointToComp(point);
    }
    compPointToSource(point: [number, number]) {
      return this._layer.compPointToSource(point);
    }
  }

  export class KShapeLayer extends KAVLayer<ShapeLayer> {
    isValid() {
      let layer = this._layer;
      return isValid(layer) && layer instanceof ShapeLayer;
    }
    //properties
    contents() {
      return new KRootVectors(<PropertyGroup>this._layer.property('ADBE Root Vectors Group'));
    }
  }

  export class KTextLayer extends KAVLayer<TextLayer> {
    isValid() {
      let layer = this._layer;
      return isValid(layer) && layer instanceof TextLayer;
    }
    //properties
    text() {
      return new KTextProperties(this._layer.text);
    }
    sourceText() {
      return new KTextDocumentProperty(this._layer.text.sourceText);
    }
  }

  export class KCameraLayer extends KLayer<CameraLayer> {
    isValid() {
      let layer = this._layer;
      return isValid(layer) && layer instanceof CameraLayer;
    }
    //properties
    cameraOption() {
      return new KCameraOptions(this._layer.cameraOption);
    }
  }

  export class KLightLayer extends KLayer<LightLayer> {
    isValid() {
      let layer = this._layer;
      return isValid(layer) && layer instanceof LightLayer;
    }
    //properties
    lightOption() {
      return new KLightOptions(this._layer.lightOption);
    }
  }

}