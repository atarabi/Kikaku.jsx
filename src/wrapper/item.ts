namespace KIKAKU {

  export class KItemCollection {
    constructor(protected _items: ItemCollection) { }
    length() {
      return this._items.length;
    }
    //utility
    forEach(fn: (item: KItem<Item>, index: number) => void) {
      const items = this._items;
      for (let i = 1, l = items.length; i <= l; i++) {
        fn(new KItem(items[i]), i);
      }
    }
    //methods
    at(index: number) {
      return new KItem(this._items[index]);
    }
    addComp(name: string, width: number, height: number, pixelAspect: number, duration: number, frameRate: number) {
      return new KCompItem(this._items.addComp(name, width, height, pixelAspect, duration, frameRate));
    }
    addFolder(name: string) {
      return new KFolderItem(this._items.addFolder(name));
    }
  }

  export class KItem<T extends Item> {
    constructor(protected _item: T) { }
    get() {
      return this._item;
    }
    isValid() {
      let item = this._item;
      return item && (item instanceof FolderItem || item instanceof FootageItem || item instanceof CompItem) && isValid(item);
    }
    //cast
    asFolder() {
      return new KFolderItem(<any>this._item);
    }
    asAV() {
      return new KAVItem<AVItem>(<any>this._item);
    }
    asComp() {
      return new KCompItem(<any>this._item);
    }
    asFootage() {
      return new KFootageItem(<any>this._item);
    }
    //attributes
    name(name?: string) {
      if (name !== void 0) this._item.name = name;
      return this._item.name;
    }
    comment(comment?: string) {
      if (comment !== void 0) this._item.comment = comment;
      return this._item.comment;
    }
    id() {
      return this._item.id;
    }
    parentFolder() {
      return new KFolderItem(this._item.parentFolder);
    }
    selected(selected?: boolean) {
      if (selected !== void 0) this._item.selected = selected;
      return this._item.selected;
    }
    typeName() {
      return this._item.typeName;
    }
    label(label?: number) {
      if (label !== void 0) this._item.label = label;
      return this._item.label;
    }
    //methods
    remove() {
      this._item.remove();
    }
  }

  export class KFolderItem extends KItem<FolderItem> {
    isValid() {
      let item = this._item;
      return item && item instanceof FolderItem && isValid(item);
    }
    //attributes
    items() {
      return new KItemCollection(this._item.items);
    }
    numItems() {
      return this._item.numItems;
    }
    //methods
    item(index: number) {
      return new KItem(this._item.item(index));
    }
    //custom methods
    forEach(fn: (item: KItem<Item>, index: number) => void) {
      const item = this._item;
      const item_num = item.numItems;
      for (let i = 1; i <= item_num; ++i) {
        fn(new KItem(item.item(i)), i);
      }
    }
  }

  export class KAVItem<T extends AVItem> extends KItem<T> {
    isValid() {
      let item = this._item;
      return item && (item instanceof FootageItem || item instanceof CompItem) && isValid(item);
    }
    //attributes
    width(width?: number) {
      if (width !== void 0) this._item.width = width;
      return this._item.width;
    }
    height(height?: number) {
      if (height !== void 0) this._item.height = height;
      return this._item.height;
    }
    pixelAspect(pixelAspect?: number) {
      if (pixelAspect !== void 0) this._item.pixelAspect = pixelAspect;
      return this._item.pixelAspect;
    }
    frameRate(frameRate?: number) {
      if (frameRate !== void 0) this._item.frameRate = frameRate;
      return this._item.frameRate;
    }
    frameDuration(frameDuration?: number) {
      if (frameDuration !== void 0) this._item.frameDuration = frameDuration;
      return this._item.frameDuration;
    }
    duration(duration?: number) {
      if (duration !== void 0) this._item.duration = duration;
      return this._item.duration;
    }
    useProxy(useProxy?: boolean) {
      if (useProxy !== void 0) this._item.useProxy = useProxy;
      return this._item.useProxy;
    }
    proxySource() {
      return new KFootageSource(this._item.proxySource);
    }
    time(time?: number) {
      if (time !== void 0) this._item.time = time;
      return this._item.time;
    }
    usedIn() {
      return this._item.usedIn;
    }
    hasVideo() {
      return this._item.hasVideo;
    }
    hasAudio() {
      return this._item.hasAudio;
    }
    footageMissing() {
      return this._item.footageMissing;
    }
    setProxy(file: File | KFile) {
      if (file instanceof KFile) {
        this._item.setProxy(file.get());
      } else {
        this._item.setProxy(file);
      }
    }
    setProxyWithSequence(file: File | KFile, forceAlphabetical: boolean) {
      if (file instanceof KFile) {
        this._item.setProxyWithSequence(file.get(), forceAlphabetical);
      } else {
        this._item.setProxyWithSequence(file, forceAlphabetical);
      }
    }
    setProxyWithSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number) {
      this._item.setProxyWithSolid(color, name, width, height, pixelAspect);
    }
    setProxyWithPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number) {
      this._item.setProxyWithPlaceholder(name, width, height, frameRate, duration);
    }
    setProxyToNone() {
      this._item.setProxyToNone();
    }
  }

  export class KCompItem extends KAVItem<CompItem> {
    isValid() {
      let item = this._item;
      return item && item instanceof CompItem && isValid(item);
    }
    //attributes
    dropFrame(dropFrame?: boolean) {
      if (dropFrame !== void 0) this._item.dropFrame = dropFrame;
      return this._item.dropFrame;
    }
    workAreaStart(workAreaStart?: number) {
      if (workAreaStart !== void 0) this._item.workAreaStart = workAreaStart;
      return this._item.workAreaStart;
    }
    workAreaDuration(workAreaDuration?: number) {
      if (workAreaDuration !== void 0) this._item.workAreaDuration = workAreaDuration;
      return this._item.workAreaDuration;
    }
    numLayers() {
      return this._item.numLayers;
    }
    hideShyLayers(hideShyLayers?: boolean) {
      if (hideShyLayers !== void 0) this._item.hideShyLayers = hideShyLayers;
      return this._item.hideShyLayers;
    }
    motionBlur(motionBlur?: boolean) {
      if (motionBlur !== void 0) this._item.motionBlur = motionBlur;
      return this._item.motionBlur;
    }
    draft3d(draft3d?: boolean) {
      if (draft3d !== void 0) this._item.draft3d = draft3d;
      return this._item.draft3d;
    }
    frameBlending(frameBlending?: boolean) {
      if (frameBlending !== void 0) this._item.frameBlending = frameBlending;
      return this._item.frameBlending;
    }
    preserveNestedFrameRate(preserveNestedFrameRate?: boolean) {
      if (preserveNestedFrameRate !== void 0) this._item.preserveNestedFrameRate = preserveNestedFrameRate;
      return this._item.preserveNestedFrameRate;
    }
    preserveNestedResolution(preserveNestedResolution?: boolean) {
      if (preserveNestedResolution !== void 0) this._item.preserveNestedResolution = preserveNestedResolution;
      return this._item.preserveNestedResolution;
    }
    bgColor(bgColor?: [number, number, number]) {
      if (bgColor !== void 0) this._item.bgColor = bgColor;
      return this._item.bgColor;
    }
    activeCamera() {
      return new KCameraLayer(this._item.activeCamera);
    }
    displayStartTime(displayStartTime?: number) {
      if (displayStartTime !== void 0) this._item.displayStartTime = displayStartTime;
      return this._item.displayStartTime;
    }
    resolutionFactor(resolutionFactor?: [number, number]) {
      if (resolutionFactor !== void 0) this._item.resolutionFactor = resolutionFactor;
      return this._item.resolutionFactor;
    }
    shutterAngle(shutterAngle?: number) {
      if (shutterAngle !== void 0) this._item.shutterAngle = shutterAngle;
      return this._item.shutterAngle;
    }
    shutterPhase(shutterPhase?: number) {
      if (shutterPhase !== void 0) this._item.shutterPhase = shutterPhase;
      return this._item.shutterPhase;
    }
    motionBlurSamplesPerFrame(motionBlurSamplesPerFrame?: number) {
      if (motionBlurSamplesPerFrame !== void 0) this._item.motionBlurSamplesPerFrame = motionBlurSamplesPerFrame;
      return this._item.motionBlurSamplesPerFrame;
    }
    motionBlurAdaptiveSampleLimit(motionBlurAdaptiveSampleLimit?: number) {
      if (motionBlurAdaptiveSampleLimit !== void 0) this._item.motionBlurAdaptiveSampleLimit = motionBlurAdaptiveSampleLimit;
      return this._item.motionBlurAdaptiveSampleLimit;
    }
    layers() {
      return new KLayerCollection(this._item.layers);
    }
    selectedLayers() {
      return new KArray(this._item.selectedLayers.slice()).map(layer => new KLayer(layer));
    }
    selectedProperties() {
      return this._item.selectedProperties;
    }
    renderer(renderer?: string) {
      if (renderer !== void 0) this._item.renderer = renderer;
      return this._item.renderer;
    }
    renderers() {
      return new KArray(this._item.renderers);
    }
    //methods
    duplicate() {
      return new KCompItem(this._item.duplicate());
    }
    layer(index_or_name: number | string) {
      return new KLayer(this._item.layer(<any>index_or_name));
    }
    openInViewer() {
      return this._item.openInViewer();
    }
    //custom methods
    forEach(fn: (layer: KLayer<Layer>, index: number) => void) {
      const item = this._item;
      const layer_num = item.numLayers;
      for (let i = 1; i <= layer_num; ++i) {
        fn(new KLayer(item.layer(i)), i);
      }
    }
  }

  export class KFootageItem extends KAVItem<FootageItem> {
    isValid() {
      let item = this._item;
      return item && item instanceof FootageItem && isValid(item);
    }
    //attributes
    file() {
      return new KFile(this._item.file);
    }
    mainSource() {
      return new KFootageSource(this._item.mainSource);
    }
    //methods
    replace(file: File | KFile) {
      if (file instanceof KFile) {
        this._item.replace(file.get());
      } else {
        this._item.replace(file);
      }
    }
    replaceWithSequence(file: File | KFile, forceAlphabetical) {
      if (file instanceof KFile) {
        this._item.replaceWithSequence(file.get(), forceAlphabetical);
      } else {
        this._item.replaceWithSequence(file, forceAlphabetical);
      }
    }
    replaceWithPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number) {
      this._item.replaceWithPlaceholder(name, width, height, frameRate, duration);
    }
    replaceWithSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number) {
      this._item.replaceWithSolid(color, name, width, height, pixelAspect);
    }
    openInViewer() {
      return this._item.openInViewer();
    }
  }

}