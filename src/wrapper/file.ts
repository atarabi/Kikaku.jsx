namespace KIKAKU {

  export class KFile {
    protected _file: File;
    constructor(file?: File | string) {
      if (file instanceof File) {
        this._file = file;
      } else {
        this._file = new File(file);
      }
    }
    get() {
      return this._file;
    }
    //static
    static fs() {
      return File.fs;
    }
    static decode(uri: string) {
      return File.decode(uri);
    }
    static encode(name: string) {
      return File.encode(name);
    }
    static isEncodingAvailable(name: string) {
      return File.isEncodingAvailable(name);
    }
    static openDialog(prompt_?: string, filter?: string, multiSelect?: boolean): KFile | KArray<KFile> {
      const file = File.openDialog(prompt_, filter, multiSelect);
      if (file === null) {
        return null;
      } else if (file instanceof File) {
        return new KFile(file);
      } else {
        return new KArray(file).map(file => new KFile(file));
      }
    }
    static saveDialog(prompt_?: string, filter?: string) {
      return new KFile(File.saveDialog(prompt_, filter));
    }
    //attributes
    absoluteURI() {
      return this._file.absoluteURI;
    }
    alias() {
      return this._file.alias;
    }
    created() {
      return this._file.created;
    }
    creator() {
      return this._file.creator;
    }
    displayName() {
      return this._file.displayName;
    }
    encoding(encoding?: string) {
      if (encoding !== void 0) this._file.encoding = encoding;
      return this._file.encoding;
    }
    eof() {
      return this._file.eof;
    }
    error() {
      return this._file.error;
    }
    exists() {
      return this._file.exists;
    }
    fsName() {
      return this._file.fsName;
    }
    fullName() {
      return this._file.fullName;
    }
    hidden(hidden?: boolean) {
      if (hidden !== void 0) this._file.hidden = hidden;
      return this._file.hidden;
    }
    length() {
      return this._file.length;
    }
    lineFeed() {
      return this._file.lineFeed;
    }
    localizedName() {
      return this._file.localizedName;
    }
    modified() {
      return this._file.modified;
    }
    name() {
      return this._file.name;
    }
    parent() {
      return new KFolder(this._file.parent);
    }
    path() {
      return this._file.path;
    }
    readonly() {
      return this._file.readonly;
    }
    relativeURI() {
      return this._file.relativeURI;
    }
    type() {
      return this._file.type;
    }
    //methods
    changePath(path: string) {
      return this._file.changePath(path);
    }
    close() {
      return this._file.close();
    }
    copy(target: string) {
      return this._file.copy(target);
    }
    createAlias(path?: string) {
      return this._file.createAlias(path);
    }
    execute() {
      return this._file.execute();
    }
    getRelativeURI(basePath?: string) {
      return this._file.getRelativeURI(basePath);
    }
    open(mode: string, type?: string, creator?: string) {
      return this._file.open(mode, type, creator);
    }
    openDlg(prompt_?: string, filter?: string, multiSelect?: boolean): KFile | KArray<KFile> {
      const file = this._file.openDlg(prompt_, filter, multiSelect);
      if (file === null) {
        return null;
      } else if (file instanceof File) {
        return new KFile(file);
      } else {
        return new KArray(file).map(file => new KFile(file));
      }
    }
    read(chars?: number) {
      return this._file.read(chars);
    }
    readch() {
      return this._file.readch();
    }
    readln() {
      return this._file.readln();
    }
    remove() {
      return this._file.remove();
    }
    rename(newName: string) {
      return this._file.rename(newName);
    }
    resolve() {
      return this._file.resolve();
    }
    saveDlg(prompt_?: string, preset?: string) {
      const file = this._file.saveDlg(prompt_, preset);
      if (file === null) {
        return null;
      }
      return new KFile(file);
    }
    seek(pos: number, mode?: number) {
      return this._file.seek(pos, mode);
    }
    tell() {
      return this._file.tell();
    }
    write(text: string, ...texts: string[]) {
      return this._file.write(text, ...texts);
    }
    writeln(text: string, ...texts: string[]) {
      return this._file.writeln(text, ...texts);
    }
  }

  export class KFolder {
    protected _folder: Folder
    constructor(folder?: Folder | string) {
      if (folder instanceof Folder) {
        this._folder = folder;
      } else {
        this._folder = new Folder(folder);
      }
    }
    get() {
      return this._folder;
    }
    //static
    static appData() {
      return new KFolder(Folder.appData);
    }
    static appPackage() {
      return new KFolder(Folder.appPackage);
    }
    static commonFiles() {
      return new KFolder(Folder.commonFiles);
    }
    static current() {
      return new KFolder(Folder.current);
    }
    static desktop() {
      return new KFolder(Folder.desktop);
    }
    static fs() {
      return Folder.fs;
    }
    static myDocuments() {
      return new KFolder(Folder.myDocuments);
    }
    static startup() {
      return new KFolder(Folder.startup);
    }
    static system() {
      return new KFolder(Folder.system);
    }
    static temp() {
      return new KFolder(Folder.temp);
    }
    static trash() {
      return new KFolder(Folder.trash);
    }
    static userData() {
      return new KFolder(Folder.userData);
    }
    static decode(uri: string) {
      return File.decode(uri);
    }
    static encode(name: string) {
      return File.encode(name);
    }
    static selectDialog(prompt?: string): KFile | KFolder {
      const file = Folder.selectDialog(prompt);
      if (file === null) {
        return null;
      } else if (file instanceof File) {
        return new KFile(file);
      } else {
        return new KFolder(file);
      }
    }
    //attributes
    absoluteURI() {
      return this._folder.absoluteURI;
    }
    alias() {
      return this._folder.alias;
    }
    created() {
      return this._folder.created;
    }
    displayName() {
      return this._folder.displayName;
    }
    error() {
      return this._folder.error;
    }
    exists() {
      return this._folder.exists;
    }
    fsName() {
      return this._folder.fsName;
    }
    fullName() {
      return this._folder.fullName;
    }
    localizedName() {
      return this._folder.localizedName;
    }
    modified() {
      return this._folder.modified;
    }
    name() {
      return this._folder.name;
    }
    parent() {
      return new KFolder(this._folder.parent);
    }
    path() {
      return this._folder.path;
    }
    relativeURI() {
      return this._folder.relativeURI;
    }
    //methods
    changePath(path: string) {
      return this._folder.changePath(path);
    }
    create() {
      return this._folder.create();
    }
    execute() {
      return this._folder.execute();
    }
    getFiles(mask?: string): KArray<KFile | KFolder> {
      const files = this._folder.getFiles(mask);
      if (files === null) {
        return new KArray<KFile | KFolder>([]);
      }
      return new KArray(files).map(file => {
        if (file instanceof File) {
          return new KFile(file);
        } else {
          return new KFolder(file);
        }
      });
    }
    getRelativeURI(basePath?: string) {
      return this._folder.getRelativeURI(basePath);
    }
    remove() {
      return this._folder.remove();
    }
    rename(newName: string) {
      return this._folder.rename(newName);
    }
    resolve() {
      return new KFolder(this._folder.resolve());
    }
    selectDlg(prompt_: string): KFile | KFolder {
      const file = this._folder.selectDlg(prompt_);
      if (file === null) {
        return null;
      } else if (file instanceof File) {
        return new KFile(file);
      } else {
        return new KFolder(file);
      }
    }
  }

}