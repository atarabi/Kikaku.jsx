namespace KIKAKU {

	const Utils = KIKAKU.Utils;

	export class FileManager {
		static VERSION = '0.0.0';
		static AUTHOR = 'Kareobana';
		static TYPE = {
			CUSTOM: 'custom',
			APP_DATA: 'appData',
			COMMON_FILES: 'commonFiles',
			DESKTOP: 'desktop',
			MY_DOCUMENTS: 'myDocuments',
			USER_DATA: 'userData'
		};
		static validateFileName(file_name: string) {
			if (!Utils.isString(file_name) || file_name === '') {
				return false;
			}
			return file_name.match(/[:;\/|,*?"'<>]/) === null;
		}
		private _cd: string;
		constructor(path: string, type?: string) {
			let directory_path: string;
			switch (type) {
				case FileManager.TYPE.CUSTOM:
					directory_path = '';
					break;
				case FileManager.TYPE.APP_DATA:
					directory_path = Folder.appData.absoluteURI + '/';
					break;
				case FileManager.TYPE.COMMON_FILES:
					directory_path = Folder.commonFiles.absoluteURI + '/';
					break;
				case FileManager.TYPE.DESKTOP:
					directory_path = Folder.desktop.absoluteURI + '/';
					break;
				case FileManager.TYPE.MY_DOCUMENTS:
					directory_path = Folder.myDocuments.absoluteURI + '/';
					break;
				case FileManager.TYPE.USER_DATA:
				default:
					directory_path = Folder.userData.absoluteURI + '/';
					break;
			}
			this._cd = directory_path + path;
		}
		getFilesAndFolders(options?: {path?: string; mask?: string;}): (File|Folder)[] {
			let options_ = Utils.assign({
				path: null,
				mask: '*'
			}, options);
			
			let folder_path = options_.path ? this._cd + '/' + options_.path : this._cd;
			let folder = new Folder(folder_path);
			let files = folder.exists ? folder.getFiles(options_.mask) : [];
			return files;
		}
		getFiles(options?: {path?: string; mask?: string;}): File[] {
			return <File[]>Utils.filter(this.getFilesAndFolders(options), (file: File|Folder) => {
				return file instanceof File;
			});
		}
		getFile(file_name: string) {
			let file = new File(this._cd + '/' + file_name);
			return file;
		}
		getFileNames(options?: {path?: string; mask?: string;}) {
			return Utils.map(this.getFiles(options), (file: File) => file.displayName);
		}
		getFolders(options?: {path?: string; mask?: string;}): Folder[] {
			return <Folder[]>Utils.filter(this.getFilesAndFolders(options), (file: File|Folder) => {
				return file instanceof Folder;
			});
		}
		getFolder(folder_name: string) {
			let file = folder_name ? new Folder(this._cd + '/' + folder_name) : new Folder(this._cd);
			return file;
		}
		getFolderNames(options?: {path?: string; mask?: string;}) {
			return Utils.map(this.getFolders(options), (folder: Folder) => folder.displayName);
		}
		exists(file_name: string) {
			return this.getFile(file_name).exists;
		}
		get(file_name: string) {
			let file = this.getFile(file_name);
			file.encoding = 'UTF-8';
			
			if (!file.exists) {
				return null;
			}
			
			if (!file.open('r')) {
				throw new Error('Unable to read file');
			}
			
			let text = file.read();
			file.close();
			
			return text;
		}
		save(file_name: string, text: string) {
			let paths = file_name.split('/');
			if (!FileManager.validateFileName(paths.pop())) {
				throw new Error('Invalid file name');
			}
			Utils.createFolder(this._cd + '/' + paths.join('/'));
			
			let file = this.getFile(file_name);
			file.encoding = 'UTF-8';
			if (!file.open('w')) {
				throw new Error('Unable to write file');
			}
			file.write(text);
			file.close();
		}
		delete(file_name: string) {
			let file = this.getFile(file_name);
			if (file.exists) {
				return file.remove();
			}
			return true;
		}
	}

}