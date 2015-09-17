/// <reference path="../../typings/aftereffects/ae.d.ts" />

namespace KIKAKU.Utils {
	
	export function getProjectFile() {
		return app.project.file;
	}
	
	export function createFolder(path: string) {
		let folder = new Folder(path);
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
	
}