/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
/// <reference path="item.ts" />
/// <reference path="_impl.ts" />

namespace KIKAKU.Utils {

	export function isTextLayer(layer: Layer) {
		return layer instanceof TextLayer;
	}

	export function isShapeLayer(layer: Layer) {
		return layer instanceof ShapeLayer;
	}

	export function isAVLayer(layer: Layer, strict: boolean = false) {
		return (layer instanceof AVLayer && (layer.hasVideo || !strict)) || isTextLayer(layer) || isShapeLayer(layer);
	}

	export function isCameraLayer(layer: Layer) {
		return layer instanceof CameraLayer;
	}

	export function isLightLayer(layer: Layer) {
		return layer instanceof LightLayer;
	}

	export function isNullLayer(layer: Layer) {
		return layer.nullLayer;
	}

	export function isSolidLayer(layer: Layer) {
		return isAVLayer(layer) && isFootageItem((<AVLayer>layer).source) && (<FootageItem>(<AVLayer>layer).source).mainSource instanceof SolidSource;
	}

	export function isFileLayer(layer: Layer) {
		return isAVLayer(layer) && isFootageItem((<AVLayer>layer).source) && (<FootageItem>(<AVLayer>layer).source).mainSource instanceof FileSource;
	}

	export function isStillLayer(layer: Layer) {
		return isAVLayer(layer) && isFootageItem((<AVLayer>layer).source) && (<FootageItem>(<AVLayer>layer).source).mainSource.isStill;
	}

	export function isCompLayer(layer: Layer) {
		return isAVLayer(layer) && isCompItem((<AVLayer>layer).source);
	}

	export function forEachLayer(comp: CompItem, fn: (layer: Layer, index?: number) => any, ctx?) {
		for (let i = 1, l = comp.numLayers; i <= l; i++) {
			fn.call(ctx, comp.layer(i), i);
		}
	}

	export function forEachPropertyGroup(property_group: PropertyGroup | Layer, fn: (property: PropertyBase, index?: number) => any, ctx?) {
		for (var i = 1, l = property_group.numProperties; i <= l; i++) {
			fn.call(ctx, property_group.property(i), i);
		}
	}

	export function forEachEffect(layer: Layer, fn: (effect: PropertyGroup, index?: number) => any, ctx?) {
		if (isAVLayer(layer)) {
			forEachPropertyGroup(<PropertyGroup>layer.property('ADBE Effect Parade'), function(effect, i) {
				fn.call(ctx, effect, i);
			});
		}
	}

	export var LAYER_FILTER = {
		NONE: 'none',
		ALL: 'all',
		TEXT: 'text',
		SHAPE: 'shape',
		AV: 'av',
		CAMERA: 'camera',
		LIGHT: 'light',
		NULL: 'null',
		INDEX: 'index',
		NAME: 'name',
		TIME: 'time',
		START_TIME: 'startTime',
		STRETCH: 'stretch',
		IN_POINT: 'inPoint',
		OUT_POINT: 'outPoint',
		ENABLED: 'enabled',
		SOLO: 'solo',
		SHY: 'shy',
		LOCKED: 'locked',
		HAS_VIDEO: 'hasVideo',
		ACTIVE: 'active',
		COMMENT: 'comment',
		IS_NAME_SET: 'isNameSet',
		SELECTED: 'selected',
		//for av layer
		SOLID: 'solid',
		FILE: 'file',
		STILL: 'still',
		COMP: 'comp',
		IS_NAME_FROM_SOURCE: 'isNameFromSource',
		HEIGHT: 'height',
		WIDTH: 'width',
		AUDIO_ENABLED: 'audioEnabled',
		MOTION_BLUR: 'motionBlur',
		EFFECT_ACTIVE: 'effectsActive',
		ADJUSTMENT_LAYER: 'adjustmentLayer',
		GUIDE_LAYER: 'guideLayer',
		THREED_LAYER: 'threeDLayer',
		THREED_PER_CHAR: 'threeDPerChar',
		ENVIRONMENT_LAYER: 'environmentLayer',
		COLLAPSE_TRANSFORMATION: 'collapseTransformation',
		FRAME_BLENDING: 'frameBlending',
		TIME_REAMP_ENABLED: 'timeRemapEnabled',
		HAS_AUDIO: 'hasAudio',
		AUDIO_ACTIVE: 'audioActive',
		PRESERVE_TRANSPARENCY: 'preserveTransparency',
		IS_TRACK_MATTE: 'isTrackMatte',
		HAS_TRACK_MATTE: 'hasTrackMatte'
	};

	function getLayerFilter(filter: string, ...args) {
		let invert = false;
		let fn: (layer: Layer) => boolean;

		if (filter[0] === '!') {
			invert = true;
			filter = filter.slice(1);
		}

		switch (filter) {
			case LAYER_FILTER.NONE:
				fn = function() { return false; }
				break;
			case LAYER_FILTER.ALL:
				fn = function() { return true; }
				break;
			case LAYER_FILTER.TEXT:
				fn = isTextLayer;
				break;
			case LAYER_FILTER.SHAPE:
				fn = isShapeLayer;
				break;
			case LAYER_FILTER.AV:
				fn = isAVLayer;
				break;
			case LAYER_FILTER.CAMERA:
				fn = isCameraLayer;
				break;
			case LAYER_FILTER.LIGHT:
				fn = isLightLayer;
				break;
			case LAYER_FILTER.NULL:
				fn = isNullLayer;
				break;
			case LAYER_FILTER.NAME:
				fn = (function(name: string) {
					return function(layer: Layer) {
						return layer.name === name;
					};
				})(args[0]);
				break;
			case LAYER_FILTER.COMMENT:
				fn = (function(comment: string) {
					return function(layer: Layer) {
						return layer.comment.indexOf(comment) >= 0;
					};
				})(args[0]);
				break;
			case LAYER_FILTER.INDEX:
			case LAYER_FILTER.TIME:
			case LAYER_FILTER.START_TIME:
			case LAYER_FILTER.STRETCH:
			case LAYER_FILTER.IN_POINT:
			case LAYER_FILTER.OUT_POINT:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(layer: Layer) {
						return layer[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				break;
			case LAYER_FILTER.ENABLED:
			case LAYER_FILTER.SOLO:
			case LAYER_FILTER.SHY:
			case LAYER_FILTER.LOCKED:
			case LAYER_FILTER.HAS_VIDEO:
			case LAYER_FILTER.ACTIVE:
			case LAYER_FILTER.IS_NAME_SET:
			case LAYER_FILTER.SELECTED:
				fn = (function(key: string) {
					return function(layer: Layer) {
						return layer[key];
					};
				})(filter);
				break;
			//for av layer
			case LAYER_FILTER.SOLID:
				fn = isSolidLayer;
				break;
			case LAYER_FILTER.FILE:
				fn = isFileLayer;
				break;
			case LAYER_FILTER.STILL:
				fn = isStillLayer;
				break;
			case LAYER_FILTER.COMP:
				fn = isCompLayer;
				break;
			case LAYER_FILTER.HEIGHT:
			case LAYER_FILTER.WIDTH:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(layer: Layer) {
						return layer[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				fn = _Impl.and(isCompItem, fn);
				break;
			case LAYER_FILTER.IS_NAME_FROM_SOURCE:
			case LAYER_FILTER.AUDIO_ENABLED:
			case LAYER_FILTER.MOTION_BLUR:
			case LAYER_FILTER.EFFECT_ACTIVE:
			case LAYER_FILTER.ADJUSTMENT_LAYER:
			case LAYER_FILTER.GUIDE_LAYER:
			case LAYER_FILTER.THREED_LAYER:
			case LAYER_FILTER.THREED_PER_CHAR:
			case LAYER_FILTER.ENVIRONMENT_LAYER:
			case LAYER_FILTER.COLLAPSE_TRANSFORMATION:
			case LAYER_FILTER.FRAME_BLENDING:
			case LAYER_FILTER.TIME_REAMP_ENABLED:
			case LAYER_FILTER.HAS_AUDIO:
			case LAYER_FILTER.AUDIO_ACTIVE:
			case LAYER_FILTER.PRESERVE_TRANSPARENCY:
			case LAYER_FILTER.IS_TRACK_MATTE:
			case LAYER_FILTER.HAS_TRACK_MATTE:
				fn = (function(key: string) {
					return function(layer: Layer) {
						return layer[key];
					};
				})(filter);
				fn = _Impl.and(isAVLayer, fn);
				break;
			default:
				throw new Error('Bad filter type');
		}

		if (invert) {
			fn = _Impl.not(fn);
		}

		return fn;
	}

	export function createLayerFilter(...filters): (layer: Layer) => boolean {
		let fns = [];
		forEach(filters, (filter) => {
			if (isArray(filter)) {
				fns.push(getLayerFilter.apply(null, filter));
			} else if (isFunction(filter)) {
				fns.push(filter);
			} else {
				fns.push(getLayerFilter(filter));
			}
		});
		return fns.length > 0 ? _Impl.and(fns) : getLayerFilter(LAYER_FILTER.ALL);
	}

	export function getLayers(filters = [], comp = getActiveComp()): Layer[] {
		if (!comp) {
			return [];
		}

		let filter = createLayerFilter(...filters);
		let layers: Layer[] = [];
		forEachLayer(comp, (layer: Layer) => {
			if (filter(layer)) {
				layers.push(layer);
			}
		});
		return layers;
	}

	export function getLayer(filters = [], comp = getActiveComp()): Layer {
		if (!comp) {
			return null;
		}

		let filter = createLayerFilter(...filters);
		for (let i = 1, l = comp.numLayers; i <= l; i++) {
			let layer = comp.layer(i);
			if (filter(layer)) {
				return layer;
			}
		}
		return null;
	}

	export function getLayerByName(name: string, comp = getActiveComp()) {
		if (!comp) {
			return null;
		}
		return comp.layers.byName(name);
	}

	export function selectLayers(filters = [], deselect = true, comp = getActiveComp()) {
		if (!comp) {
			return false;
		}

		let filter = createLayerFilter(...filters);
		let selected = false;
		forEachLayer(comp, (layer: Layer) => {
			if (filter(layer)) {
				layer.selected = true;
				selected = true;
			} else if (deselect) {
				layer.selected = false;
			}
		});

		return selected;
	}

	export function selectLayer(filters = [], deselect = true, comp = getActiveComp()) {
		if (!comp) {
			return false;
		}

		let filter = createLayerFilter(...filters);
		let selected = false;
		forEachLayer(comp, (layer: Layer) => {
			if (!selected && filter(layer)) {
				layer.selected = true;
				selected = true;
			} else if (deselect) {
				layer.selected = false;
			}
		});

		return selected;
	}

	export function deselectLayers(comp = getActiveComp()) {
		if (!comp) {
			return;
		}

		forEach(comp.selectedLayers, (layer: Layer) => {
			layer.selected = false;
		});
	}

	export function getSelectedLayers(comp = getActiveComp()): Layer[] {
		if (!comp) {
			return [];
		}

		return comp.selectedLayers.slice();
	}

	export function getSelectedLayer(comp = getActiveComp()): Layer {
		let layers = getSelectedLayers(comp);
		return layers.length ? layers[0] : null;
	}
	
	export function removeAllLayers(comp: CompItem = getActiveComp()) {
		if (!comp) {
			return;
		}
		forEach(Utils.getLayers(['all'], comp), (layer: Layer) => layer.remove());
	}

}