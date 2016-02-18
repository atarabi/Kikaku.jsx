namespace KIKAKU {

  export class KFootageSource<T extends FootageSource> {
    constructor(protected _source: T) { }
    get() {
      return this._source;
    }
    isValid() {
      let source = this._source;
      return source && (source instanceof FootageSource || source instanceof SolidSource || source instanceof PlaceholderSource || source instanceof FileSource) && isValid(source);
    }
    //cast
    asSolid() {
      return new KSolidSource(<any>this._source);
    }
    asPlaceholder() {
      return new KPlaceholderSource(<any>this._source);
    }
    asFile() {
      return new KFileSource(<any>this._source);
    }
    //attributes
    hasAlpha(hasAlpha?: boolean) {
      if (hasAlpha !== void 0) this._source.hasAlpha = hasAlpha;
      return this._source.hasAlpha;
    }
    alphaMode(alphaMode?: AlphaMode) {
      if (alphaMode !== void 0) this._source.alphaMode = alphaMode;
      return this._source.alphaMode;
    }
    premulColor(premulColor?: [number, number, number]) {
      if (premulColor !== void 0) this._source.premulColor = premulColor;
      return this._source.premulColor;
    }
    invertAlpha(invertAlpha?: boolean) {
      if (invertAlpha !== void 0) this._source.invertAlpha = invertAlpha;
      return this._source.invertAlpha;
    }
    isStill() {
      return this._source.isStill;
    }
    fieldSeparationType(fieldSeparationType?: FieldSeparationType) {
      if (fieldSeparationType !== void 0) this._source.fieldSeparationType = fieldSeparationType;
      return this._source.fieldSeparationType;
    }
    highQualityFieldSeparation(highQualityFieldSeparation?: boolean) {
      if (highQualityFieldSeparation !== void 0) this._source.highQualityFieldSeparation = highQualityFieldSeparation;
      return this._source.highQualityFieldSeparation;
    }
    removePulldown(removePulldown?: PulldownPhase) {
      if (removePulldown !== void 0) this._source.removePulldown = removePulldown;
      return this._source.removePulldown;
    }
    loop(loop?: number) {
      if (loop !== void 0) this._source.loop = loop;
      return this._source.loop;
    }
    nativeFrameRate(nativeFrameRate?: number) {
      if (nativeFrameRate !== void 0) this._source.nativeFrameRate = nativeFrameRate;
      return this._source.nativeFrameRate;
    }
    displayFrameRate() {
      return this._source.displayFrameRate;
    }
    conformFrameRate(conformFrameRate?: number) {
      if (conformFrameRate !== void 0) this._source.conformFrameRate = conformFrameRate;
      return this._source.conformFrameRate;
    }
    //methods
    guessAlphaMode() {
      this._source.guessAlphaMode();
    }
    guessPulldown(method: PulldownMethod) {
      this._source.guessPulldown(method);
    }
  }

  export class KSolidSource extends KFootageSource<SolidSource> {
    isValid() {
      let source = this._source;
      return source && source instanceof SolidSource && isValid(source);
    }
    //attributes
    color(color?: [number, number, number]) {
      if (color !== void 0) this._source.color = color;
      return this._source.color;
    }
  }

  export class KPlaceholderSource extends KFootageSource<PlaceholderSource> {
    isValid() {
      let source = this._source;
      return source && source instanceof PlaceholderSource && isValid(source);
    }
  }

  export class KFileSource extends KFootageSource<FileSource> {
    isValid() {
      let source = this._source;
      return source && source instanceof FileSource && isValid(source);
    }
    //attributes
    file() {
      return new KFile(this._source.file);
    }
    missingFootagePath() {
      return this._source.missingFootagePath;
    }
    //methods
    reload() {
      return this._source.reload();
    }
  }

}