namespace KIKAKU.Utils {

	export function getProjectFile() {
		return app.project.file;
	}

	export function createFolder(path: string | Folder) {
		let folder = isString(path) ? new Folder(<string>path) : <Folder>path;
		let folders: Folder[] = [];

		while (!folder.exists) {
			folders.push(folder);
			folder = folder.parent;
		}

		while (folder = folders.pop()) {
			if (!folder.create()) {
				throw new Error('Failed to create folder');
			}
		}
	}

	export function removeFolder(path: string | Folder) {
		function _removeFolder(folder: Folder) {
			let files = folder.getFiles() || [];
			forEach(files, (file: File | Folder) => {
				if (file instanceof Folder) {
					_removeFolder(file);
				} else {
					file.remove();
				}
			});
			folder.remove();
		}

		let folder = isString(path) ? new Folder(<string>path) : <Folder>path;
		if (folder.exists) {
			_removeFolder(folder);
		}
	}

}