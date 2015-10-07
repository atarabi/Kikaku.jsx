/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
/// <reference path="_impl.ts" />

namespace KIKAKU.Utils {

	export function isFootageItem(item: Item) {
		return item instanceof FootageItem;
	}

	export function isCompItem(item: Item) {
		return item instanceof CompItem;
	}

	export function isAVItem(item: Item) {
		return isCompItem(item) || isFootageItem(item);
	}

	export function isFolderItem(item: Item) {
		return item instanceof FolderItem;
	}

	export function forEachItem(fn: (item: Item, index?: number) => any, ctx?) {
		for(let i = 1, l = app.project.numItems; i <= l; i++) {
			fn.call(ctx, app.project.items[i], i);
		}
	}

	export function forEachItemInFolderItem(folder: FolderItem, fn: (item: Item, index?: number) => any, ctx?) {
		for (let i = 1, l = folder.numItems; i <= l; i++) {
			let item = folder.item(i);
			fn.call(ctx, item, i);
		}
	}

	export const ITEM_FILTER = {
		NONE: 'none',
		ALL: 'all',
		FOOTAGE: 'footage',
		COMP: 'comp',
		AV: 'av',
		FOLDER: 'folder',
		NAME: 'name',
		COMMENT: 'comment',
		SELECTED: 'selected',
		//for av item
		WIDTH: 'width',
		HEIGHT: 'height',
		PIXEL_ASPECT: 'pixelAspect',
		FRAME_RATE: 'framerate',
		FRAME_DURATION: 'frameDuration',
		DURATION: 'duration',
		USE_PROXY: 'useProxy',
		TIME: 'time',
		HAS_VIDEO: 'hasVideo',
		HAS_AUDIO: 'hasAudio',
		FOOTAGE_MISSING: 'footageMissing',
		//for comp item
		DROP_FRAME: 'dropFrame',
		WORK_AREA_START: 'workAreaStart',
		WORK_AREA_DURATION: 'workAreaDuration',
		NUM_LAYERS: 'numLayers',
		HIDE_SHY_LAYERS: 'hideShyLayers',
		MOTION_BLUR: 'motionBlur',
		DRAFT3D: 'draft3d',
		FRAME_BLENDING: 'frameBlending',
		PRESERVE_NESTED_FRAME_RATE: 'preserveNestedFrameRate',
		DISPLAY_START_TIME: 'displayStartTime',
		SHUTTER_ANGLE: 'shutterAngle',
		SHUTTER_PHASE: 'shutterPhase'
	};

	function getItemFilter(filter: string, ...args): (item: Item) => boolean {
		let invert = false;
		let fn: (item: Item) => boolean;

		if (filter[0] === '!') {
			invert = true;
			filter = filter.slice(1);
		}

		switch (filter) {
			case ITEM_FILTER.NONE:
				fn = function() { return false; }
				break;
			case ITEM_FILTER.ALL:
				fn = function() { return true; }
				break;
			case ITEM_FILTER.FOOTAGE:
				fn = isFootageItem;
				break;
			case ITEM_FILTER.COMP:
				fn = isCompItem;
				break;
			case ITEM_FILTER.AV:
				fn = isAVItem;
				break;
			case ITEM_FILTER.FOLDER:
				fn = isFolderItem;
				break;
			case ITEM_FILTER.NAME:
				fn = (function(name: string) {
					return function(item: Item) {
						return item.name === name;
					};
				})(args[0]);
				break;
			case ITEM_FILTER.COMMENT:
				fn = (function(comment: string) {
					return function(item: Item) {
						return item.comment.indexOf(comment) >= 0;
					};
				})(args[0]);
				break;
			case ITEM_FILTER.SELECTED:
				fn = function(item: Item) {
					return item.selected;
				};
				break;
			//for av item
			case ITEM_FILTER.WIDTH:
			case ITEM_FILTER.HEIGHT:
			case ITEM_FILTER.PIXEL_ASPECT:
			case ITEM_FILTER.FRAME_RATE:
			case ITEM_FILTER.FRAME_DURATION:
			case ITEM_FILTER.DURATION:
			case ITEM_FILTER.TIME:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(item: Item) {
						return item[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				fn = _Impl.and(isAVItem, fn);
				break;
			case ITEM_FILTER.USE_PROXY:
			case ITEM_FILTER.HAS_VIDEO:
			case ITEM_FILTER.HAS_AUDIO:
			case ITEM_FILTER.FOOTAGE_MISSING:
				fn = (function(key: string) {
					return function(item: Item) {
						return item[key];
					};
				})(filter);
				fn = _Impl.and(isAVItem, fn);
				break;
			//for comp item
			case ITEM_FILTER.WORK_AREA_START:
			case ITEM_FILTER.WORK_AREA_DURATION:
			case ITEM_FILTER.NUM_LAYERS:
			case ITEM_FILTER.DISPLAY_START_TIME:
			case ITEM_FILTER.SHUTTER_ANGLE:
			case ITEM_FILTER.SHUTTER_PHASE:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(item: Item) {
						return item[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				fn = _Impl.and(isCompItem, fn);
				break;
			case ITEM_FILTER.DROP_FRAME:
			case ITEM_FILTER.HIDE_SHY_LAYERS:
			case ITEM_FILTER.MOTION_BLUR:
			case ITEM_FILTER.DRAFT3D:
			case ITEM_FILTER.FRAME_BLENDING:
			case ITEM_FILTER.PRESERVE_NESTED_FRAME_RATE:
				fn = (function(key: string) {
					return function(item: Item) {
						return item[key];
					};
				})(filter);
				fn = _Impl.and(isCompItem, fn);
				break;
			default:
				throw new Error('Bad filter type');
		}

		if (invert) {
			fn = _Impl.not(fn);
		}

		return fn;
	}

	export function createItemFilter(...filters): (item: Item) => boolean {
		let fns = [];
		forEach(filters, (filter) => {
			if (isArray(filter)) {
				fns.push(getItemFilter.apply(null, filter));
			} else if (isFunction(filter)) {
				fns.push(filter);
			} else {
				fns.push(getItemFilter(filter));
			}
		});
		return fns.length > 0 ? _Impl.and(fns) : getItemFilter(ITEM_FILTER.ALL);
	}
	
	export function getItems(filters = []): Item[] {
		let filter = createItemFilter(...filters);
		let project = app.project;
		let items: Item[] = [];
		for (let i = 1, l = project.numItems; i <= l; i++) {
			let item = project.item(i);
			if (filter(item)) {
				items.push(item);
			}
		}
		return items;
	}
	
	export function getItem(filters = []): Item {
		let filter = createItemFilter(...filters);
		let project = app.project;
		for (let i = 1, l = project.numItems; i <= l; i++) {
			let item = project.item(i);
			if (filter(item)) {
				return item;
			}
		}
		return null;
	}
	
	export function getActiveItem(): Item {
		return app.project.activeItem;
	}
	
	export function getActiveComp(): CompItem {
		let item = getActiveItem();
		if (!item || !isCompItem(item)) {
			return null;
		}
		return <CompItem>item;
	}
	
	export function getCompByName(name: string) {
		return <CompItem>getItem([(item: Item) => {
			return isCompItem(item) && item.name === name;
		}]);
	}
	
	export function getAVItemByName(name: string) {
		return <AVItem>getItem([(item: Item) => {
			return isAVItem(item) && item.name === name;
		}]);
	}
  
}