namespace KIKAKU {

  const getProject = () => app.project;

  export class KProject {
    get() {
      return getProject();
    }
    //attributes
    file() {
      return new KFile(getProject().file);
    }
    rootFolder() {
      return new KFolderItem(getProject().rootFolder);
    }
    items() {
      return new KItemCollection(getProject().items);
    }
    activeItem() {
      return new KItem(getProject().activeItem);
    }
    bitsPerChannel(bitsPerChannel?: number) {
      if (bitsPerChannel !== void 0) getProject().bitsPerChannel = bitsPerChannel;
      return getProject().bitsPerChannel;
    }
    transparencyGridThumbnails(transparencyGridThumbnails?: boolean) {
      if (transparencyGridThumbnails !== void 0) getProject().transparencyGridThumbnails = transparencyGridThumbnails;
      return getProject().transparencyGridThumbnails;
    }
    numItems() {
      return getProject().numItems;
    }
    selection() {
      return new KArray(getProject().selection).map(item => new KItem(item));
    }
    renderQueue() {
      return getProject().renderQueue;
    }
    timeDisplayType(timeDisplayType?: TimeDisplayType) {
      if (timeDisplayType !== void 0) getProject().timeDisplayType = timeDisplayType;
      return getProject().timeDisplayType;
    }
    footageTimecodeDisplayStartType(footageTimecodeDisplayStartType?: FootageTimecodeDisplayStartType) {
      if (footageTimecodeDisplayStartType !== void 0) getProject().footageTimecodeDisplayStartType = footageTimecodeDisplayStartType;
      return getProject().footageTimecodeDisplayStartType;
    }
    framesUseFeetFrames(framesUseFeetFrames?: boolean) {
      if (framesUseFeetFrames !== void 0) getProject().framesUseFeetFrames = framesUseFeetFrames;
      return getProject().framesUseFeetFrames;
    }
    feetFramesFilmType(feetFramesFilmType?: FeetFramesFilmType) {
      if (feetFramesFilmType !== void 0) getProject().feetFramesFilmType = feetFramesFilmType;
      return getProject().feetFramesFilmType;
    }
    framesCountType(framesCountType?: FramesCountType) {
      if (framesCountType !== void 0) getProject().framesCountType = framesCountType;
      return getProject().framesCountType;
    }
    displayStartFrame(displayStartFrame?: number) {
      if (displayStartFrame !== void 0) getProject().displayStartFrame = displayStartFrame;
      return getProject().displayStartFrame;
    }
    linearBlending(linearBlending?: boolean) {
      if (linearBlending !== void 0) getProject().linearBlending = linearBlending;
      return getProject().linearBlending;
    }
    xmpPacket(xmpPacket?: string) {
      if (xmpPacket !== void 0) getProject().xmpPacket = xmpPacket;
      return getProject().xmpPacket;
    }
    //methods
    item(index: number) {
      return new KItem(getProject().item(index));
    }
    consolidateFootage() {
      return getProject().consolidateFootage();
    }
    removeUnusedFootage() {
      return getProject().removeUnusedFootage();
    }
    close(closeOptions: CloseOptions) {
      return getProject().close(closeOptions);
    }
    save(file?: File | KFile) {
      if (file === void 0) {
        return getProject().save();
      } else if (file instanceof KFile) {
        return getProject().save(file.get());
      } else {
        return getProject().save(file);
      }
    }
    saveWithDialog() {
      return getProject().saveWithDialog();
    }
    importPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number) {
      return getProject().importPlaceholder(name, width, height, frameRate, duration);
    }
    importFile(importOptions: ImportOptions) {
      return new KFootageItem(getProject().importFile(importOptions));
    }
    importFileWithDialog() {
      const items = getProject().importFileWithDialog() || [];
      return new KArray(items).map(item => new KItem(item));
    }
    showWindow(doShow: boolean) {
      return getProject().showWindow(doShow);
    }
    autoFixExpressions(oldText: string, newText: string) {
      return getProject().autoFixExpressions(oldText, newText);
    }
  }

}