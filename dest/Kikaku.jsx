/// <reference path="../typings/aftereffects/ae.d.ts" />
var KIKAKU;
(function (KIKAKU) {
    KIKAKU.VERSION = '0.3.1';
    KIKAKU.AUTHOR = 'Kareobana';
    KIKAKU.LICENSE = 'MIT';
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        Utils.VERSION = '1.3.0';
        Utils.AUTHOR = 'Kareobana';
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function isObject(arg) {
            return Object.prototype.toString.call(arg) === '[object Object]';
        }
        Utils.isObject = isObject;
        function isArray(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
        Utils.isArray = isArray;
        function isFunction(arg) {
            return Object.prototype.toString.call(arg) === '[object Function]';
        }
        Utils.isFunction = isFunction;
        function isString(arg) {
            return Object.prototype.toString.call(arg) === '[object String]';
        }
        Utils.isString = isString;
        function isNumber(arg) {
            return Object.prototype.toString.call(arg) === '[object Number]';
        }
        Utils.isNumber = isNumber;
        function isBoolean(arg) {
            return Object.prototype.toString.call(arg) === '[object Boolean]';
        }
        Utils.isBoolean = isBoolean;
        function isUndefined(arg) {
            return typeof arg === 'undefined';
        }
        Utils.isUndefined = isUndefined;
        function keys(obj) {
            var arr = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push(key);
                }
            }
            return arr;
        }
        Utils.keys = keys;
        function values(obj) {
            var arr = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    arr.push(obj[key]);
                }
            }
            return arr;
        }
        Utils.values = values;
        function forEach(obj, fn, ctx) {
            if (isArray(obj) || isString(obj)) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    fn.call(ctx, obj[i], i);
                }
            }
            else if (isObject(obj)) {
                for (var key in obj) {
                    fn.call(ctx, obj[key], key);
                }
            }
        }
        Utils.forEach = forEach;
        function inherits(child, parent) {
            var F = function () { };
            F.prototype = parent.prototype;
            child.prototype = new F;
            child.super = parent;
            child.uber = parent.prototype;
            child.prototype.constructor = child;
        }
        Utils.inherits = inherits;
        function assign(obj) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            obj = Object(obj);
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var arg = args_1[_a];
                if (!isObject(arg)) {
                    continue;
                }
                for (var key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        obj[key] = arg[key];
                    }
                }
            }
            return obj;
        }
        Utils.assign = assign;
        function map(arr, fn, ctx) {
            var result = [];
            forEach(arr, function (v, i) {
                result.push(fn.call(ctx, v, i));
            });
            return result;
        }
        Utils.map = map;
        function reduce(arr, fn, initial_value) {
            var l = arr.length;
            if (!l) {
                if (isUndefined(initial_value)) {
                    throw new Error('Reduce of empty array with no initial value');
                }
                return initial_value;
            }
            var i = 0;
            var value;
            if (isUndefined(initial_value)) {
                value = arr[0];
                ++i;
            }
            else {
                value = initial_value;
            }
            while (i < l) {
                value = fn(value, arr[i], i, arr);
                ++i;
            }
            return value;
        }
        Utils.reduce = reduce;
        function filter(arr, fn, ctx) {
            var result = [];
            forEach(arr, function (v, i) {
                if (fn.call(ctx, v, i)) {
                    result.push(v);
                }
            });
            return result;
        }
        Utils.filter = filter;
        function some(arr, fn, ctx) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (fn.call(ctx, arr[i])) {
                    return true;
                }
            }
            return false;
        }
        Utils.some = some;
        function every(arr, fn, ctx) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (!fn.call(ctx, arr[i])) {
                    return false;
                }
            }
            return true;
        }
        Utils.every = every;
        function inArray(arr, fn, ctx) {
            var _fn = isFunction(fn) ? fn : function (v) { return v === fn; };
            for (var i = 0, l = arr.length; i < l; i++) {
                if (_fn.call(ctx, arr[i])) {
                    return i;
                }
            }
            return -1;
        }
        Utils.inArray = inArray;
        function find(arr, fn, ctx) {
            var index = inArray(arr, fn, ctx);
            if (index >= 0) {
                return arr[index];
            }
            return null;
        }
        Utils.find = find;
        function unique(arr) {
            var result = [];
            forEach(arr, function (v, i) {
                if (inArray(result, v) === -1) {
                    result.push(v);
                }
            });
            return result;
        }
        Utils.unique = unique;
        function clamp(value, mn, mx) {
            if (mn === void 0) { mn = 0; }
            if (mx === void 0) { mx = 1; }
            if (value < mn) {
                return mn;
            }
            else if (value > mx) {
                return mx;
            }
            return value;
        }
        Utils.clamp = clamp;
        function trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, '');
        }
        Utils.trim = trim;
        function startsWith(str, search, position) {
            if (position === void 0) { position = 0; }
            return str.lastIndexOf(search, position) === position;
        }
        Utils.startsWith = startsWith;
        function endsWith(str, search, position) {
            if (position === void 0) { position = str.length; }
            position = position - search.length;
            return str.lastIndexOf(search) === position;
        }
        Utils.endsWith = endsWith;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function getProjectFile() {
            return app.project.file;
        }
        Utils.getProjectFile = getProjectFile;
        function createFolder(path) {
            var folder = Utils.isString(path) ? new Folder(path) : path;
            var folders = [];
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
        Utils.createFolder = createFolder;
        function removeFolder(path) {
            function _removeFolder(folder) {
                var files = folder.getFiles() || [];
                Utils.forEach(files, function (file) {
                    if (file instanceof Folder) {
                        _removeFolder(file);
                    }
                    else {
                        file.remove();
                    }
                });
                folder.remove();
            }
            var folder = Utils.isString(path) ? new Folder(path) : path;
            if (folder.exists) {
                _removeFolder(folder);
            }
        }
        Utils.removeFolder = removeFolder;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        var _Impl;
        (function (_Impl) {
            function not(fn, ctx) {
                return function () {
                    return !fn.apply(ctx, arguments);
                };
            }
            _Impl.not = not;
            function and(fns) {
                var other = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    other[_i - 1] = arguments[_i];
                }
                if (!Utils.isArray(fns)) {
                    fns = Array.prototype.slice.call(arguments);
                }
                var l = fns.length;
                return function () {
                    for (var i = 0; i < l; i++) {
                        if (!fns[i].apply(null, arguments)) {
                            return false;
                        }
                    }
                    return true;
                };
            }
            _Impl.and = and;
            function or(fns) {
                var other = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    other[_i - 1] = arguments[_i];
                }
                if (!Utils.isArray(fns)) {
                    fns = Array.prototype.slice.call(arguments);
                }
                var l = fns.length;
                return function () {
                    for (var i = 0; i < l; i++) {
                        if (fns[i].apply(null, arguments)) {
                            return true;
                        }
                    }
                    return false;
                };
            }
            _Impl.or = or;
            function operate(lhs, op, rhs) {
                switch (op) {
                    case '==':
                        return lhs == rhs;
                    case '!=':
                        return lhs != rhs;
                    case '<':
                        return lhs < rhs;
                    case '<=':
                        return lhs <= rhs;
                    case '>':
                        return lhs > rhs;
                    case '>=':
                        return lhs >= rhs;
                    default:
                        throw new Error('Bad operator');
                }
            }
            _Impl.operate = operate;
            function createOperatorFilter(fn, op, rhs) {
                return function (obj) {
                    return operate(fn(obj), op, rhs);
                };
            }
            _Impl.createOperatorFilter = createOperatorFilter;
        })(_Impl = Utils._Impl || (Utils._Impl = {}));
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
/// <reference path="_impl.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function isFootageItem(item) {
            return item instanceof FootageItem;
        }
        Utils.isFootageItem = isFootageItem;
        function isCompItem(item) {
            return item instanceof CompItem;
        }
        Utils.isCompItem = isCompItem;
        function isAVItem(item) {
            return isCompItem(item) || isFootageItem(item);
        }
        Utils.isAVItem = isAVItem;
        function isSolidItem(item) {
            return isFootageItem(item) && item.mainSource instanceof SolidSource;
        }
        Utils.isSolidItem = isSolidItem;
        function isFolderItem(item) {
            return item instanceof FolderItem;
        }
        Utils.isFolderItem = isFolderItem;
        function forEachItem(fn, ctx) {
            for (var i = 1, l = app.project.numItems; i <= l; i++) {
                fn.call(ctx, app.project.items[i], i);
            }
        }
        Utils.forEachItem = forEachItem;
        function forEachItemInFolderItem(folder, fn, ctx) {
            for (var i = 1, l = folder.numItems; i <= l; i++) {
                var item = folder.item(i);
                fn.call(ctx, item, i);
            }
        }
        Utils.forEachItemInFolderItem = forEachItemInFolderItem;
        Utils.ITEM_FILTER = {
            NONE: 'none',
            ALL: 'all',
            FOOTAGE: 'footage',
            COMP: 'comp',
            AV: 'av',
            SOLID: 'solid',
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
        function getItemFilter(filter) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var invert = false;
            var fn;
            if (filter[0] === '!') {
                invert = true;
                filter = filter.slice(1);
            }
            switch (filter) {
                case Utils.ITEM_FILTER.NONE:
                    fn = function () { return false; };
                    break;
                case Utils.ITEM_FILTER.ALL:
                    fn = function () { return true; };
                    break;
                case Utils.ITEM_FILTER.FOOTAGE:
                    fn = isFootageItem;
                    break;
                case Utils.ITEM_FILTER.COMP:
                    fn = isCompItem;
                    break;
                case Utils.ITEM_FILTER.AV:
                    fn = isAVItem;
                    break;
                case Utils.ITEM_FILTER.SOLID:
                    fn = isSolidItem;
                    break;
                case Utils.ITEM_FILTER.FOLDER:
                    fn = isFolderItem;
                    break;
                case Utils.ITEM_FILTER.NAME:
                    fn = (function (name) {
                        return function (item) {
                            return item.name === name;
                        };
                    })(args[0]);
                    break;
                case Utils.ITEM_FILTER.COMMENT:
                    fn = (function (comment) {
                        return function (item) {
                            return item.comment.indexOf(comment) >= 0;
                        };
                    })(args[0]);
                    break;
                case Utils.ITEM_FILTER.SELECTED:
                    fn = function (item) {
                        return item.selected;
                    };
                    break;
                //for av item
                case Utils.ITEM_FILTER.WIDTH:
                case Utils.ITEM_FILTER.HEIGHT:
                case Utils.ITEM_FILTER.PIXEL_ASPECT:
                case Utils.ITEM_FILTER.FRAME_RATE:
                case Utils.ITEM_FILTER.FRAME_DURATION:
                case Utils.ITEM_FILTER.DURATION:
                case Utils.ITEM_FILTER.TIME:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (item) {
                            return item[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    fn = Utils._Impl.and(isAVItem, fn);
                    break;
                case Utils.ITEM_FILTER.USE_PROXY:
                case Utils.ITEM_FILTER.HAS_VIDEO:
                case Utils.ITEM_FILTER.HAS_AUDIO:
                case Utils.ITEM_FILTER.FOOTAGE_MISSING:
                    fn = (function (key) {
                        return function (item) {
                            return item[key];
                        };
                    })(filter);
                    fn = Utils._Impl.and(isAVItem, fn);
                    break;
                //for comp item
                case Utils.ITEM_FILTER.WORK_AREA_START:
                case Utils.ITEM_FILTER.WORK_AREA_DURATION:
                case Utils.ITEM_FILTER.NUM_LAYERS:
                case Utils.ITEM_FILTER.DISPLAY_START_TIME:
                case Utils.ITEM_FILTER.SHUTTER_ANGLE:
                case Utils.ITEM_FILTER.SHUTTER_PHASE:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (item) {
                            return item[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    fn = Utils._Impl.and(isCompItem, fn);
                    break;
                case Utils.ITEM_FILTER.DROP_FRAME:
                case Utils.ITEM_FILTER.HIDE_SHY_LAYERS:
                case Utils.ITEM_FILTER.MOTION_BLUR:
                case Utils.ITEM_FILTER.DRAFT3D:
                case Utils.ITEM_FILTER.FRAME_BLENDING:
                case Utils.ITEM_FILTER.PRESERVE_NESTED_FRAME_RATE:
                    fn = (function (key) {
                        return function (item) {
                            return item[key];
                        };
                    })(filter);
                    fn = Utils._Impl.and(isCompItem, fn);
                    break;
                default:
                    throw new Error('Bad filter type');
            }
            if (invert) {
                fn = Utils._Impl.not(fn);
            }
            return fn;
        }
        function createItemFilter() {
            var filters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                filters[_i - 0] = arguments[_i];
            }
            var fns = [];
            Utils.forEach(filters, function (filter) {
                if (Utils.isArray(filter)) {
                    fns.push(getItemFilter.apply(null, filter));
                }
                else if (Utils.isFunction(filter)) {
                    fns.push(filter);
                }
                else {
                    fns.push(getItemFilter(filter));
                }
            });
            return fns.length > 0 ? Utils._Impl.and(fns) : getItemFilter(Utils.ITEM_FILTER.ALL);
        }
        Utils.createItemFilter = createItemFilter;
        function getItems(filters) {
            if (filters === void 0) { filters = []; }
            var filter = createItemFilter.apply(void 0, filters);
            var project = app.project;
            var items = [];
            for (var i = 1, l = project.numItems; i <= l; i++) {
                var item = project.item(i);
                if (filter(item)) {
                    items.push(item);
                }
            }
            return items;
        }
        Utils.getItems = getItems;
        function getItem(filters) {
            if (filters === void 0) { filters = []; }
            var filter = createItemFilter.apply(void 0, filters);
            var project = app.project;
            for (var i = 1, l = project.numItems; i <= l; i++) {
                var item = project.item(i);
                if (filter(item)) {
                    return item;
                }
            }
            return null;
        }
        Utils.getItem = getItem;
        function getActiveItem() {
            return app.project.activeItem;
        }
        Utils.getActiveItem = getActiveItem;
        function getActiveComp() {
            var item = getActiveItem();
            if (!item || !isCompItem(item)) {
                return null;
            }
            return item;
        }
        Utils.getActiveComp = getActiveComp;
        function getCompByName(name) {
            return getItem([function (item) {
                    return isCompItem(item) && item.name === name;
                }]);
        }
        Utils.getCompByName = getCompByName;
        function getAVItemByName(name) {
            return getItem([function (item) {
                    return isAVItem(item) && item.name === name;
                }]);
        }
        Utils.getAVItemByName = getAVItemByName;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
/// <reference path="item.ts" />
/// <reference path="_impl.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function isLayer(layer) {
            return isAVLayer(layer) || isCameraLayer(layer) || isLightLayer(layer);
        }
        Utils.isLayer = isLayer;
        function isTextLayer(layer) {
            return layer instanceof TextLayer;
        }
        Utils.isTextLayer = isTextLayer;
        function isShapeLayer(layer) {
            return layer instanceof ShapeLayer;
        }
        Utils.isShapeLayer = isShapeLayer;
        function isAVLayer(layer, strict) {
            if (strict === void 0) { strict = false; }
            return (layer instanceof AVLayer && (layer.hasVideo || !strict)) || isTextLayer(layer) || isShapeLayer(layer);
        }
        Utils.isAVLayer = isAVLayer;
        function isCameraLayer(layer) {
            return layer instanceof CameraLayer;
        }
        Utils.isCameraLayer = isCameraLayer;
        function isLightLayer(layer) {
            return layer instanceof LightLayer;
        }
        Utils.isLightLayer = isLightLayer;
        function isNullLayer(layer) {
            return layer.nullLayer;
        }
        Utils.isNullLayer = isNullLayer;
        function isSolidLayer(layer) {
            return isAVLayer(layer) && Utils.isFootageItem(layer.source) && layer.source.mainSource instanceof SolidSource;
        }
        Utils.isSolidLayer = isSolidLayer;
        function isFileLayer(layer) {
            return isAVLayer(layer) && Utils.isFootageItem(layer.source) && layer.source.mainSource instanceof FileSource;
        }
        Utils.isFileLayer = isFileLayer;
        function isStillLayer(layer) {
            return isAVLayer(layer) && Utils.isFootageItem(layer.source) && layer.source.mainSource.isStill;
        }
        Utils.isStillLayer = isStillLayer;
        function isCompLayer(layer) {
            return isAVLayer(layer) && Utils.isCompItem(layer.source);
        }
        Utils.isCompLayer = isCompLayer;
        function forEachLayer(comp, fn, ctx) {
            for (var i = 1, l = comp.numLayers; i <= l; i++) {
                fn.call(ctx, comp.layer(i), i);
            }
        }
        Utils.forEachLayer = forEachLayer;
        function forEachPropertyGroup(property_group, fn, ctx) {
            for (var i = 1, l = property_group.numProperties; i <= l; i++) {
                fn.call(ctx, property_group.property(i), i);
            }
        }
        Utils.forEachPropertyGroup = forEachPropertyGroup;
        function forEachEffect(layer, fn, ctx) {
            if (isAVLayer(layer)) {
                forEachPropertyGroup(layer.property('ADBE Effect Parade'), function (effect, i) {
                    fn.call(ctx, effect, i);
                });
            }
        }
        Utils.forEachEffect = forEachEffect;
        Utils.LAYER_FILTER = {
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
        function getLayerFilter(filter) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var invert = false;
            var fn;
            if (filter[0] === '!') {
                invert = true;
                filter = filter.slice(1);
            }
            switch (filter) {
                case Utils.LAYER_FILTER.NONE:
                    fn = function () { return false; };
                    break;
                case Utils.LAYER_FILTER.ALL:
                    fn = function () { return true; };
                    break;
                case Utils.LAYER_FILTER.TEXT:
                    fn = isTextLayer;
                    break;
                case Utils.LAYER_FILTER.SHAPE:
                    fn = isShapeLayer;
                    break;
                case Utils.LAYER_FILTER.AV:
                    fn = isAVLayer;
                    break;
                case Utils.LAYER_FILTER.CAMERA:
                    fn = isCameraLayer;
                    break;
                case Utils.LAYER_FILTER.LIGHT:
                    fn = isLightLayer;
                    break;
                case Utils.LAYER_FILTER.NULL:
                    fn = isNullLayer;
                    break;
                case Utils.LAYER_FILTER.NAME:
                    fn = (function (name) {
                        return function (layer) {
                            return layer.name === name;
                        };
                    })(args[0]);
                    break;
                case Utils.LAYER_FILTER.COMMENT:
                    fn = (function (comment) {
                        return function (layer) {
                            return layer.comment.indexOf(comment) >= 0;
                        };
                    })(args[0]);
                    break;
                case Utils.LAYER_FILTER.INDEX:
                case Utils.LAYER_FILTER.TIME:
                case Utils.LAYER_FILTER.START_TIME:
                case Utils.LAYER_FILTER.STRETCH:
                case Utils.LAYER_FILTER.IN_POINT:
                case Utils.LAYER_FILTER.OUT_POINT:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (layer) {
                            return layer[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    break;
                case Utils.LAYER_FILTER.ENABLED:
                case Utils.LAYER_FILTER.SOLO:
                case Utils.LAYER_FILTER.SHY:
                case Utils.LAYER_FILTER.LOCKED:
                case Utils.LAYER_FILTER.HAS_VIDEO:
                case Utils.LAYER_FILTER.ACTIVE:
                case Utils.LAYER_FILTER.IS_NAME_SET:
                case Utils.LAYER_FILTER.SELECTED:
                    fn = (function (key) {
                        return function (layer) {
                            return layer[key];
                        };
                    })(filter);
                    break;
                //for av layer
                case Utils.LAYER_FILTER.SOLID:
                    fn = isSolidLayer;
                    break;
                case Utils.LAYER_FILTER.FILE:
                    fn = isFileLayer;
                    break;
                case Utils.LAYER_FILTER.STILL:
                    fn = isStillLayer;
                    break;
                case Utils.LAYER_FILTER.COMP:
                    fn = isCompLayer;
                    break;
                case Utils.LAYER_FILTER.HEIGHT:
                case Utils.LAYER_FILTER.WIDTH:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (layer) {
                            return layer[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    fn = Utils._Impl.and(Utils.isCompItem, fn);
                    break;
                case Utils.LAYER_FILTER.IS_NAME_FROM_SOURCE:
                case Utils.LAYER_FILTER.AUDIO_ENABLED:
                case Utils.LAYER_FILTER.MOTION_BLUR:
                case Utils.LAYER_FILTER.EFFECT_ACTIVE:
                case Utils.LAYER_FILTER.ADJUSTMENT_LAYER:
                case Utils.LAYER_FILTER.GUIDE_LAYER:
                case Utils.LAYER_FILTER.THREED_LAYER:
                case Utils.LAYER_FILTER.THREED_PER_CHAR:
                case Utils.LAYER_FILTER.ENVIRONMENT_LAYER:
                case Utils.LAYER_FILTER.COLLAPSE_TRANSFORMATION:
                case Utils.LAYER_FILTER.FRAME_BLENDING:
                case Utils.LAYER_FILTER.TIME_REAMP_ENABLED:
                case Utils.LAYER_FILTER.HAS_AUDIO:
                case Utils.LAYER_FILTER.AUDIO_ACTIVE:
                case Utils.LAYER_FILTER.PRESERVE_TRANSPARENCY:
                case Utils.LAYER_FILTER.IS_TRACK_MATTE:
                case Utils.LAYER_FILTER.HAS_TRACK_MATTE:
                    fn = (function (key) {
                        return function (layer) {
                            return layer[key];
                        };
                    })(filter);
                    fn = Utils._Impl.and(isAVLayer, fn);
                    break;
                default:
                    throw new Error('Bad filter type');
            }
            if (invert) {
                fn = Utils._Impl.not(fn);
            }
            return fn;
        }
        function createLayerFilter() {
            var filters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                filters[_i - 0] = arguments[_i];
            }
            var fns = [];
            Utils.forEach(filters, function (filter) {
                if (Utils.isArray(filter)) {
                    fns.push(getLayerFilter.apply(null, filter));
                }
                else if (Utils.isFunction(filter)) {
                    fns.push(filter);
                }
                else {
                    fns.push(getLayerFilter(filter));
                }
            });
            return fns.length > 0 ? Utils._Impl.and(fns) : getLayerFilter(Utils.LAYER_FILTER.ALL);
        }
        Utils.createLayerFilter = createLayerFilter;
        function getLayers(filters, comp) {
            if (filters === void 0) { filters = []; }
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return [];
            }
            var filter = createLayerFilter.apply(void 0, filters);
            var layers = [];
            forEachLayer(comp, function (layer) {
                if (filter(layer)) {
                    layers.push(layer);
                }
            });
            return layers;
        }
        Utils.getLayers = getLayers;
        function getLayer(filters, comp) {
            if (filters === void 0) { filters = []; }
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return null;
            }
            var filter = createLayerFilter.apply(void 0, filters);
            for (var i = 1, l = comp.numLayers; i <= l; i++) {
                var layer = comp.layer(i);
                if (filter(layer)) {
                    return layer;
                }
            }
            return null;
        }
        Utils.getLayer = getLayer;
        function getLayerByName(name, comp) {
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return null;
            }
            return comp.layers.byName(name);
        }
        Utils.getLayerByName = getLayerByName;
        function selectLayers(filters, deselect, comp) {
            if (filters === void 0) { filters = []; }
            if (deselect === void 0) { deselect = true; }
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return false;
            }
            var filter = createLayerFilter.apply(void 0, filters);
            var selected = false;
            forEachLayer(comp, function (layer) {
                if (filter(layer)) {
                    layer.selected = true;
                    selected = true;
                }
                else if (deselect) {
                    layer.selected = false;
                }
            });
            return selected;
        }
        Utils.selectLayers = selectLayers;
        function selectLayer(filters, deselect, comp) {
            if (filters === void 0) { filters = []; }
            if (deselect === void 0) { deselect = true; }
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return false;
            }
            var filter = createLayerFilter.apply(void 0, filters);
            var selected = false;
            forEachLayer(comp, function (layer) {
                if (!selected && filter(layer)) {
                    layer.selected = true;
                    selected = true;
                }
                else if (deselect) {
                    layer.selected = false;
                }
            });
            return selected;
        }
        Utils.selectLayer = selectLayer;
        function deselectLayers(comp) {
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return;
            }
            Utils.forEach(comp.selectedLayers, function (layer) {
                layer.selected = false;
            });
        }
        Utils.deselectLayers = deselectLayers;
        function getSelectedLayers(comp) {
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return [];
            }
            return comp.selectedLayers.slice();
        }
        Utils.getSelectedLayers = getSelectedLayers;
        function getSelectedLayer(comp) {
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            var layers = getSelectedLayers(comp);
            return layers.length ? layers[0] : null;
        }
        Utils.getSelectedLayer = getSelectedLayer;
        function removeAllLayers(comp) {
            if (comp === void 0) { comp = Utils.getActiveComp(); }
            if (!comp) {
                return;
            }
            Utils.forEach(Utils.getLayers(['all'], comp), function (layer) { return layer.remove(); });
        }
        Utils.removeAllLayers = removeAllLayers;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
/// <reference path="item.ts" />
/// <reference path="layer.ts" />
/// <reference path="_impl.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function isProperty(property) {
            return property instanceof Property;
        }
        Utils.isProperty = isProperty;
        function isPropertyGroup(property) {
            return property instanceof PropertyGroup || property instanceof MaskPropertyGroup;
        }
        Utils.isPropertyGroup = isPropertyGroup;
        function isHiddenProperty(property) {
            var hidden = false;
            try {
                var selected = property.selected;
                property.selected = selected;
            }
            catch (e) {
                hidden = true;
            }
            return hidden;
        }
        Utils.isHiddenProperty = isHiddenProperty;
        function getPropertyDimensions(property) {
            switch (property.propertyValueType) {
                case PropertyValueType.ThreeD_SPATIAL:
                case PropertyValueType.ThreeD:
                    return 3;
                case PropertyValueType.TwoD_SPATIAL:
                case PropertyValueType.TwoD:
                    return 2;
                case PropertyValueType.COLOR:
                    return 4;
                case PropertyValueType.OneD:
                case PropertyValueType.LAYER_INDEX:
                case PropertyValueType.MASK_INDEX:
                    return 1;
            }
            return 0;
        }
        Utils.getPropertyDimensions = getPropertyDimensions;
        Utils.PROPERTY_FILTER = {
            NONE: 'none',
            ALL: 'all',
            PROPERTY: 'property',
            PROPERTY_GROUP: 'propertyGrouop',
            NAME: 'name',
            MATCH_NAME: 'matchName',
            PROPERTY_INDEX: 'propertyIndex',
            PROPERTY_DEPTH: 'propertyDepth',
            IS_MODIFIED: 'isModified',
            CAN_SET_ENABLED: 'canSetEnabled',
            ENABLED: 'enabled',
            ACTIVE: 'active',
            ELIDED: 'elided',
            IS_EFFECT: 'isEffect',
            IS_MASK: 'isMask',
            SELECTED: 'selected',
            //for property
            NO_VALUE: 'NO_VALUE',
            THREED_SPATIAL: 'ThreeD_SPATIAL',
            THREED: 'ThreeD',
            TWOD_SPATIAL: 'TwoD_SPATIAL',
            TWOD: 'TwoD',
            ONED: 'OneD',
            COLOR: 'COLOR',
            CUSTOM_VALUE: 'CUSTOM_VALUE',
            MARKER: 'MARKER',
            LAYER_INDEX: 'LAYER_INDEX',
            MASK_INDEX: 'MASK_INDEX',
            SHAPE: 'SHAPE',
            TEXT_DOCUMENT: 'TEXT_DOCUMENT',
            DIMENSIONS: 'dimensions',
            HAS_MIN: 'hasMin',
            HAS_MAX: 'hasMax',
            IS_SPATIAL: 'isSpatial',
            CAN_VARY_OVER_TIME: 'canVaryOverTime',
            IS_TIME_VARYING: 'isTimeVarying',
            NUM_KEYS: 'numKeys',
            CAN_SET_EXPRESSION: 'canSetExpression',
            EXPRESSION_ENABLED: 'expressionEnabled',
            DIMENSION_SEPARATED: 'dimensionsSeparated',
            IS_SEPRATION_FOLLOWER: 'isSeparationFollower'
        };
        function getPropertyFilter(filter) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var invert = false;
            var fn;
            if (filter[0] === '!') {
                invert = true;
                filter = filter.slice(1);
            }
            switch (filter) {
                case Utils.PROPERTY_FILTER.NONE:
                    fn = function () { return false; };
                    break;
                case Utils.PROPERTY_FILTER.ALL:
                    fn = function () { return true; };
                    break;
                case Utils.PROPERTY_FILTER.PROPERTY:
                    fn = isProperty;
                    break;
                case Utils.PROPERTY_FILTER.PROPERTY_GROUP:
                    fn = isPropertyGroup;
                    break;
                case Utils.PROPERTY_FILTER.NAME:
                case Utils.PROPERTY_FILTER.MATCH_NAME:
                    fn = (function (key, name) {
                        return function (property) {
                            return property[key] === name;
                        };
                    })(filter, args[0]);
                    break;
                case Utils.PROPERTY_FILTER.PROPERTY_INDEX:
                case Utils.PROPERTY_FILTER.PROPERTY_DEPTH:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (property) {
                            return property[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    break;
                case Utils.PROPERTY_FILTER.IS_MODIFIED:
                case Utils.PROPERTY_FILTER.CAN_SET_ENABLED:
                case Utils.PROPERTY_FILTER.ENABLED:
                case Utils.PROPERTY_FILTER.ACTIVE:
                case Utils.PROPERTY_FILTER.ELIDED:
                case Utils.PROPERTY_FILTER.IS_EFFECT:
                case Utils.PROPERTY_FILTER.IS_MASK:
                case Utils.PROPERTY_FILTER.SELECTED:
                    fn = (function (key) {
                        return function (property) {
                            return property[key];
                        };
                    })(filter);
                    break;
                //for property
                case Utils.PROPERTY_FILTER.NO_VALUE:
                case Utils.PROPERTY_FILTER.THREED_SPATIAL:
                case Utils.PROPERTY_FILTER.THREED:
                case Utils.PROPERTY_FILTER.TWOD_SPATIAL:
                case Utils.PROPERTY_FILTER.TWOD:
                case Utils.PROPERTY_FILTER.ONED:
                case Utils.PROPERTY_FILTER.COLOR:
                case Utils.PROPERTY_FILTER.CUSTOM_VALUE:
                case Utils.PROPERTY_FILTER.MARKER:
                case Utils.PROPERTY_FILTER.LAYER_INDEX:
                case Utils.PROPERTY_FILTER.MASK_INDEX:
                case Utils.PROPERTY_FILTER.SHAPE:
                case Utils.PROPERTY_FILTER.TEXT_DOCUMENT:
                    fn = (function (key) {
                        return function (property) {
                            return property.propertyValueType === PropertyValueType[key];
                        };
                    })(filter);
                    fn = Utils._Impl.and(isProperty, fn);
                    break;
                case Utils.PROPERTY_FILTER.DIMENSIONS:
                    fn = (function (dimensions) {
                        return function (property) {
                            var property_dimensions = getPropertyDimensions(property);
                            return property_dimensions > 0 && property_dimensions === dimensions;
                        };
                    })(~~args[0]);
                    fn = Utils._Impl.and(isProperty, fn);
                    break;
                case Utils.PROPERTY_FILTER.HAS_MIN:
                case Utils.PROPERTY_FILTER.HAS_MAX:
                case Utils.PROPERTY_FILTER.IS_SPATIAL:
                case Utils.PROPERTY_FILTER.CAN_VARY_OVER_TIME:
                case Utils.PROPERTY_FILTER.IS_TIME_VARYING:
                case Utils.PROPERTY_FILTER.CAN_SET_EXPRESSION:
                case Utils.PROPERTY_FILTER.EXPRESSION_ENABLED:
                case Utils.PROPERTY_FILTER.DIMENSION_SEPARATED:
                case Utils.PROPERTY_FILTER.IS_SEPRATION_FOLLOWER:
                    fn = (function (key) {
                        return function (property) {
                            return property[key];
                        };
                    })(filter);
                    fn = Utils._Impl.and(isProperty, fn);
                    break;
                case Utils.PROPERTY_FILTER.NUM_KEYS:
                    fn = (function (key, op, rhs) {
                        return Utils._Impl.createOperatorFilter(function (property) {
                            return property[key];
                        }, op, rhs);
                    })(filter, args[0], args[1]);
                    fn = Utils._Impl.and(isProperty, fn);
                    break;
                default:
                    throw new Error('Bad filter type');
            }
            if (invert) {
                fn = Utils._Impl.not(fn);
            }
            return fn;
        }
        function createPropertyFilter() {
            var filters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                filters[_i - 0] = arguments[_i];
            }
            var fns = [];
            Utils.forEach(filters, function (filter) {
                if (Utils.isArray(filter)) {
                    fns.push(getPropertyFilter.apply(null, filter));
                }
                else if (Utils.isFunction(filter)) {
                    fns.push(filter);
                }
                else {
                    fns.push(getPropertyFilter(filter));
                }
            });
            return fns.length > 0 ? Utils._Impl.and(fns) : getPropertyFilter(Utils.PROPERTY_FILTER.ALL);
        }
        Utils.createPropertyFilter = createPropertyFilter;
        function getSelectedProperties(options) {
            var options_ = Utils.assign({
                multiple: true,
                propertyGroup: false,
                filter: function () { return true; }
            }, options);
            var layers = Utils.getSelectedLayers();
            if (!options_.multiple && layers.length) {
                layers = [layers[0]];
            }
            var properties = [];
            Utils.forEach(layers, function (layer) {
                var selected_properties = layer.selectedProperties.slice();
                Utils.forEach(selected_properties, function (property) {
                    if ((options_.propertyGroup || isProperty(property)) && options_.filter(property)) {
                        properties.push(property);
                    }
                });
            });
            return properties;
        }
        Utils.getSelectedProperties = getSelectedProperties;
        function getSelectedPropertiesWithLayer(options) {
            var options_ = Utils.assign({
                multiple: true,
                propertyGroup: false,
                filter: function () { return true; }
            }, options);
            var layers = Utils.getSelectedLayers();
            if (!options_.multiple && layers.length) {
                layers = [layers[0]];
            }
            var result = [];
            Utils.forEach(layers, function (layer) {
                var selected_properties = layer.selectedProperties.slice();
                var properties = [];
                Utils.forEach(selected_properties, function (property) {
                    if ((options_.propertyGroup || isProperty(property)) && options_.filter(property)) {
                        properties.push(property);
                    }
                });
                if (properties.length) {
                    result.push({ layer: layer, properties: properties });
                }
            });
            return result;
        }
        Utils.getSelectedPropertiesWithLayer = getSelectedPropertiesWithLayer;
        function getSelectedProperty() {
            var layer = Utils.getSelectedLayer();
            if (!layer) {
                return null;
            }
            var properties = layer.selectedProperties.slice();
            return Utils.find(properties, isProperty);
        }
        Utils.getSelectedProperty = getSelectedProperty;
        function getSelectedPropertyWithLayer() {
            var layer = Utils.getSelectedLayer();
            if (!layer) {
                return null;
            }
            var properties = layer.selectedProperties.slice();
            var property = Utils.find(properties, isProperty);
            if (!property) {
                return null;
            }
            return {
                layer: layer,
                property: property
            };
        }
        Utils.getSelectedPropertyWithLayer = getSelectedPropertyWithLayer;
        function getPathOfProperty(property, match_name) {
            if (match_name === void 0) { match_name = false; }
            var paths = [];
            while (property) {
                paths.push(match_name ? property.matchName : property.name);
                property = property.parentProperty;
            }
            paths.pop();
            paths.reverse();
            return paths;
        }
        Utils.getPathOfProperty = getPathOfProperty;
        function getPathOfSelectedProperty(match_name) {
            if (match_name === void 0) { match_name = false; }
            var property = getSelectedProperty();
            if (!property) {
                return null;
            }
            return getPathOfProperty(property, match_name);
        }
        Utils.getPathOfSelectedProperty = getPathOfSelectedProperty;
        function getPropertyFromPath(layer, path) {
            var property = layer;
            for (var i = 0, l = path.length; i < l; i++) {
                var name = path[i];
                if (Utils.isString(name) && /^\d+$/.test(name)) {
                    var index = parseInt(name);
                    property = property.property(index);
                }
                else {
                    property = property.property(name);
                }
                if (!property) {
                    return null;
                }
            }
            return property;
        }
        Utils.getPropertyFromPath = getPropertyFromPath;
        function getLayerOfProperty(property) {
            var parent;
            while (parent = property.parentProperty) {
                property = parent;
            }
            return property;
        }
        Utils.getLayerOfProperty = getLayerOfProperty;
        function removeAllKeys(property) {
            var num_keys = property.numKeys;
            if (!num_keys) {
                return;
            }
            for (var i = num_keys; i >= 1; i--) {
                property.removeKey(i);
            }
        }
        Utils.removeAllKeys = removeAllKeys;
        function scaleOneDProperty(property, scale) {
            function scaleValue(value) {
                return Utils.clamp(value * scale, minvalue, maxvalue);
            }
            if (property.propertyValueType !== PropertyValueType.OneD) {
                throw new Error('PropertyValueType is not matched');
            }
            var minvalue = property.hasMin ? property.minValue : -Infinity;
            var maxvalue = property.hasMax ? property.maxValue : Infinity;
            if (property.numKeys === 0) {
                property.setValue(scaleValue(property.value));
            }
            else {
                for (var i = 1, l = property.numKeys; i <= l; i++) {
                    var value = property.keyValue(i);
                    property.setValueAtKey(i, scaleValue(value));
                }
            }
        }
        Utils.scaleOneDProperty = scaleOneDProperty;
        function scaleTwoDProperty(property, scale, tangent) {
            if (tangent === void 0) { tangent = true; }
            function scaleValue(value) {
                return [value[0] * scale[0], value[1] * scale[1]];
            }
            if (!(property.propertyValueType === PropertyValueType.TwoD || property.propertyValueType === PropertyValueType.TwoD_SPATIAL)) {
                throw new Error('PropertyValueType is not matched');
            }
            if (property.numKeys === 0) {
                property.setValue(scaleValue(property.value));
            }
            else {
                var do_tangent = property.propertyValueType === PropertyValueType.TwoD_SPATIAL && tangent;
                for (var i = 1, l = property.numKeys; i <= l; i++) {
                    var value = property.keyValue(i);
                    property.setValueAtKey(i, scaleValue(value));
                    if (do_tangent) {
                        property.setSpatialTangentsAtKey(i, scaleValue(property.keyInSpatialTangent(i)), scaleValue(property.keyOutSpatialTangent(i)));
                    }
                }
            }
        }
        Utils.scaleTwoDProperty = scaleTwoDProperty;
        function scaleThreeDProperty(property, scale, tangent) {
            if (tangent === void 0) { tangent = true; }
            function scaleValue(value) {
                return [value[0] * scale[0], value[1] * scale[1], value[2] * scale[2]];
            }
            if (!(property.propertyValueType === PropertyValueType.ThreeD || property.propertyValueType === PropertyValueType.ThreeD_SPATIAL)) {
                throw new Error('PropertyValueType is not matched');
            }
            if (property.numKeys === 0) {
                property.setValue(scaleValue(property.value));
            }
            else {
                var do_tangent = property.propertyValueType === PropertyValueType.ThreeD_SPATIAL && tangent;
                for (var i = 1, l = property.numKeys; i <= l; i++) {
                    var value = property.keyValue(i);
                    property.setValueAtKey(i, scaleValue(value));
                    if (do_tangent) {
                        property.setSpatialTangentsAtKey(i, scaleValue(property.keyInSpatialTangent(i)), scaleValue(property.keyOutSpatialTangent(i)));
                    }
                }
            }
        }
        Utils.scaleThreeDProperty = scaleThreeDProperty;
        function scaleShapeProperty(property, scale, src_origin, dst_origin) {
            if (src_origin === void 0) { src_origin = [0, 0]; }
            if (dst_origin === void 0) { dst_origin = src_origin; }
            function scaleVector(vector, use_origin) {
                if (use_origin === void 0) { use_origin = true; }
                if (use_origin) {
                    return [(vector[0] - src_origin[0]) * scale[0] + dst_origin[0], (vector[1] - src_origin[1]) * scale[1] + dst_origin[1]];
                }
                return [vector[0] * scale[0], vector[1] * scale[1]];
            }
            function scaleValue(value) {
                value.vertices = Utils.map(value.vertices, function (vertex) { return scaleVector(vertex); });
                value.inTangents = Utils.map(value.inTangents, function (vertex) { return scaleVector(vertex, false); });
                value.outTangents = Utils.map(value.outTangents, function (vertex) { return scaleVector(vertex, false); });
                return value;
            }
            if (property.propertyValueType !== PropertyValueType.SHAPE) {
                throw new Error('PropertyValueType is not matched');
            }
            if (property.numKeys === 0) {
                property.setValue(scaleValue(property.value));
            }
            else {
                for (var i = 1, l = property.numKeys; i <= l; i++) {
                    var value = property.keyValue(i);
                    property.setValueAtKey(i, scaleValue(value));
                }
            }
        }
        Utils.scaleShapeProperty = scaleShapeProperty;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        function rgbToHsl(rgba) {
            var r = Utils.clamp(rgba[0]);
            var g = Utils.clamp(rgba[1]);
            var b = Utils.clamp(rgba[2]);
            var mx = Math.max(r, g, b);
            var mn = Math.min(r, g, b);
            var h;
            var s;
            var l = (mx + mn) / 2;
            if (mx === mn) {
                h = s = 0;
            }
            else {
                var d = mx - mn;
                s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
                switch (mx) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [h, s, l, rgba[3]];
        }
        Utils.rgbToHsl = rgbToHsl;
        function hslToRgb(hsla) {
            function clampH(h) {
                return (((h % 1) + 1) % 1);
            }
            function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            var h = clampH(hsla[0]);
            var s = Utils.clamp(hsla[1]);
            var l = Utils.clamp(hsla[2]);
            var r;
            var g;
            var b;
            if (s === 0) {
                r = g = b = l;
            }
            else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [r, g, b, hsla[3]];
        }
        Utils.hslToRgb = hslToRgb;
        function rgbToYuv(rgba) {
            var r = Utils.clamp(rgba[0]);
            var g = Utils.clamp(rgba[1]);
            var b = Utils.clamp(rgba[2]);
            var y = 0.299 * r + 0.587 * g + 0.114 * b;
            var u = -0.169 * r - 0.331 * g + 0.5 * b;
            var v = 0.5 * r - 0.419 * g - 0.081 * b;
            return [y, u + 0.5, v + 0.5, rgba[3]];
        }
        Utils.rgbToYuv = rgbToYuv;
        function yuvToRgb(yuva) {
            var y = Utils.clamp(yuva[0], 0, 1);
            var u = Utils.clamp(yuva[1], 0, 1) - 0.5;
            var v = Utils.clamp(yuva[2], 0, 1) - 0.5;
            var r = 1 * y + 1.402 * v;
            var g = 1 * y - 0.344 * u - 0.714 * v;
            var b = 1 * y + 1.772 * u;
            return [r, g, b, yuva[3]];
        }
        Utils.yuvToRgb = yuvToRgb;
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../typings/aftereffects/ae.d.ts" />
var KIKAKU;
(function (KIKAKU) {
    KIKAKU.JSON = {};
    (function () {
        "use strict";
        function f(e) { return e < 10 ? "0" + e : e; }
        function quote(e) { escapable.lastIndex = 0; return escapable.test(e) ? '"' + e.replace(escapable, function (e) { var t = meta[e]; return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + e + '"'; }
        function str(e, t) { var n, r, i, s, o = gap, u, a = t[e]; if (a && typeof a === "object" && typeof a.toJSON === "function") {
            a = a.toJSON(e);
        } if (typeof rep === "function") {
            a = rep.call(t, e, a);
        } switch (typeof a) {
            case "string": return quote(a);
            case "number": return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null": return String(a);
            case "object":
                if (!a) {
                    return "null";
                }
                gap += indent;
                u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1) {
                        u[n] = str(n, a) || "null";
                    }
                    i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]";
                    gap = o;
                    return i;
                }
                if (rep && typeof rep === "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1) {
                        if (typeof rep[n] === "string") {
                            r = rep[n];
                            i = str(r, a);
                            if (i) {
                                u.push(quote(r) + (gap ? ": " : ":") + i);
                            }
                        }
                    }
                }
                else {
                    for (r in a) {
                        if (Object.prototype.hasOwnProperty.call(a, r)) {
                            i = str(r, a);
                            if (i) {
                                u.push(quote(r) + (gap ? ": " : ":") + i);
                            }
                        }
                    }
                }
                i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}";
                gap = o;
                return i;
        } }
        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null; };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf(); };
        }
        var cx, escapable, gap, indent, meta, rep;
        if (typeof KIKAKU.JSON.stringify !== "function") {
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" };
            KIKAKU.JSON.stringify = function (e, t, n) { var r; gap = ""; indent = ""; if (typeof n === "number") {
                for (r = 0; r < n; r += 1) {
                    indent += " ";
                }
            }
            else if (typeof n === "string") {
                indent = n;
            } rep = t; if (t && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) {
                throw new Error("JSON.stringify");
            } return str("", { "": e }); };
        }
        if (typeof KIKAKU.JSON.parse !== "function") {
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            KIKAKU.JSON.parse = function (text, reviver) { function walk(e, t) { var n, r, i = e[t]; if (i && typeof i === "object") {
                for (n in i) {
                    if (Object.prototype.hasOwnProperty.call(i, n)) {
                        r = walk(i, n);
                        if (r !== undefined) {
                            i[n] = r;
                        }
                        else {
                            delete i[n];
                        }
                    }
                }
            } return reviver.call(e, t, i); } var j; text = String(text); cx.lastIndex = 0; if (cx.test(text)) {
                text = text.replace(cx, function (e) { return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4); });
            } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({ "": j }, "") : j;
            } throw new SyntaxError("JSON.parse"); };
        }
    })();
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="../KikakuJSON.ts" />
/// <reference path="utility.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils;
    (function (Utils) {
        var Comment;
        (function (Comment) {
            var JSON = KIKAKU.JSON;
            var COMMENT_KEY = 'comment';
            function parseComment(layer_or_item) {
                var comment = layer_or_item.comment;
                var parsed_comment;
                try {
                    parsed_comment = JSON.parse(comment);
                }
                catch (e) {
                    parsed_comment = comment ? (_a = {}, _a[COMMENT_KEY] = comment, _a) : {};
                }
                return parsed_comment;
                var _a;
            }
            function stringifyComment(layer_or_item, parsed_comment) {
                var has_comment_key = false;
                var has_not_comment_key = false;
                for (var key in parsed_comment) {
                    if (key === COMMENT_KEY) {
                        has_comment_key = true;
                    }
                    else {
                        has_not_comment_key = true;
                    }
                    if (has_comment_key && has_not_comment_key) {
                        break;
                    }
                }
                if (!has_not_comment_key) {
                    layer_or_item.comment = has_comment_key ? parsed_comment[COMMENT_KEY] : '';
                }
                else {
                    layer_or_item.comment = JSON.stringify(parsed_comment);
                }
            }
            function get(layer_or_item, key) {
                var parsed_comment = parseComment(layer_or_item);
                return Utils.isUndefined(parsed_comment[key]) ? null : parsed_comment[key];
            }
            Comment.get = get;
            function set(layer_or_item, key, value) {
                var parsed_comment = parseComment(layer_or_item);
                parsed_comment[key] = value;
                stringifyComment(layer_or_item, parsed_comment);
            }
            Comment.set = set;
            function remove(layer_or_item, key) {
                var parsed_comment = parseComment(layer_or_item);
                delete parsed_comment[key];
                stringifyComment(layer_or_item, parsed_comment);
            }
            Comment.remove = remove;
        })(Comment = Utils.Comment || (Utils.Comment = {}));
    })(Utils = KIKAKU.Utils || (KIKAKU.Utils = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="utils/config.ts" />
/// <reference path="utils/utility.ts" />
/// <reference path="utils/filesystem.ts" />
/// <reference path="utils/item.ts" />
/// <reference path="utils/layer.ts" />
/// <reference path="utils/property.ts" />
/// <reference path="utils/color.ts" />
/// <reference path="utils/comment.ts" /> 
/// <reference path="../typings/aftereffects/ae.d.ts" />
var KIKAKU;
(function (KIKAKU) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this._listners = {};
        }
        EventDispatcher.prototype.addEventListener = function (type, fn, ctx) {
            if (!this._listners[type]) {
                this._listners[type] = [];
            }
            this._listners[type].push({
                fn: fn,
                ctx: ctx || this
            });
        };
        EventDispatcher.prototype.removeEventListener = function (type, fn, ctx) {
            var listeners = this._listners[type];
            if (!listeners) {
                return;
            }
            ctx = ctx || this;
            for (var i = 0, l = listeners.length; i < l; i++) {
                var listener = listeners[i];
                if (listener.fn === fn && listener.ctx === ctx) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        };
        EventDispatcher.prototype.dispatchEvent = function (type) {
            var listeners = this._listners[type];
            if (!listeners) {
                return;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                var listener = listeners_1[_i];
                listener.fn.apply(listener.ctx, args);
            }
        };
        EventDispatcher.VERSION = '0.0.0';
        EventDispatcher.AUTHOR = 'Kareobana';
        return EventDispatcher;
    })();
    KIKAKU.EventDispatcher = EventDispatcher;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../typings/aftereffects/ae.d.ts" />
/// <reference path="KikakuUtils.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Utils = KIKAKU.Utils;
    var FileManager = (function () {
        function FileManager(path, type) {
            var directory_path;
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
        FileManager.validateFileName = function (file_name) {
            if (!Utils.isString(file_name) || file_name === '') {
                return false;
            }
            return file_name.match(/[:;\/|,*?"'<>]/) === null;
        };
        FileManager.prototype.getFilesAndFolders = function (options) {
            var options_ = Utils.assign({
                path: null,
                mask: '*'
            }, options);
            var folder_path = options_.path ? this._cd + '/' + options_.path : this._cd;
            var folder = new Folder(folder_path);
            var files = folder.exists ? folder.getFiles(options_.mask) : [];
            return files;
        };
        FileManager.prototype.getFiles = function (options) {
            return Utils.filter(this.getFilesAndFolders(options), function (file) {
                return file instanceof File;
            });
        };
        FileManager.prototype.getFile = function (file_name) {
            var file = new File(this._cd + '/' + file_name);
            return file;
        };
        FileManager.prototype.getFileNames = function (options) {
            return Utils.map(this.getFiles(options), function (file) { return file.displayName; });
        };
        FileManager.prototype.getFolders = function (options) {
            return Utils.filter(this.getFilesAndFolders(options), function (file) {
                return file instanceof Folder;
            });
        };
        FileManager.prototype.getFolder = function (folder_name) {
            var file = folder_name ? new Folder(this._cd + '/' + folder_name) : new Folder(this._cd);
            return file;
        };
        FileManager.prototype.getFolderNames = function (options) {
            return Utils.map(this.getFolders(options), function (folder) { return folder.displayName; });
        };
        FileManager.prototype.exists = function (file_name) {
            return this.getFile(file_name).exists;
        };
        FileManager.prototype.get = function (file_name) {
            var file = this.getFile(file_name);
            file.encoding = 'UTF-8';
            if (!file.exists) {
                return null;
            }
            if (!file.open('r')) {
                throw new Error('Unable to read file');
            }
            var text = file.read();
            file.close();
            return text;
        };
        FileManager.prototype.save = function (file_name, text) {
            var paths = file_name.split('/');
            if (!FileManager.validateFileName(paths.pop())) {
                throw new Error('Invalid file name');
            }
            Utils.createFolder(this._cd + '/' + paths.join('/'));
            var file = this.getFile(file_name);
            file.encoding = 'UTF-8';
            if (!file.open('w')) {
                throw new Error('Unable to write file');
            }
            file.write(text);
            file.close();
        };
        FileManager.prototype.delete = function (file_name) {
            var file = this.getFile(file_name);
            if (file.exists) {
                return file.remove();
            }
            return true;
        };
        FileManager.VERSION = '0.0.0';
        FileManager.AUTHOR = 'Kareobana';
        FileManager.TYPE = {
            CUSTOM: 'custom',
            APP_DATA: 'appData',
            COMMON_FILES: 'commonFiles',
            DESKTOP: 'desktop',
            MY_DOCUMENTS: 'myDocuments',
            USER_DATA: 'userData'
        };
        return FileManager;
    })();
    KIKAKU.FileManager = FileManager;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../typings/aftereffects/ae.d.ts" />
/// <reference path="KikakuUtils.ts" />
/// <reference path="KikakuJSON.ts" />
var KIKAKU;
(function (KIKAKU) {
    var JSON = KIKAKU.JSON;
    var SettingManager = (function () {
        function SettingManager(section) {
            this._section = section;
        }
        SettingManager.prototype.have = function (key) {
            return app.settings.haveSetting(this._section, key);
        };
        SettingManager.prototype.get = function (key, default_value) {
            if (!this.have(key)) {
                return default_value;
            }
            var value = app.settings.getSetting(this._section, key);
            return JSON.parse(value);
        };
        SettingManager.prototype.save = function (key, value) {
            app.settings.saveSetting(this._section, key, JSON.stringify(value));
        };
        SettingManager.prototype.delete = function (key) {
            if (!this.have(key)) {
                return;
            }
            app.preferences.deletePref('Settings_' + this._section, key);
        };
        SettingManager.VERSION = '0.0.0';
        SettingManager.AUTHOR = 'Kareobana';
        return SettingManager;
    })();
    KIKAKU.SettingManager = SettingManager;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../typings/aftereffects/ae.d.ts" />
/// <reference path="KikakuUtils.ts" />
/// <reference path="KikakuJSON.ts" />
/// <reference path="KikakuEventDispatcher.ts" />
/// <reference path="KikakuFileManager.ts" />
/// <reference path="KikakuSettingManager.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KIKAKU;
(function (KIKAKU) {
    var MATH_REGEX = /Math\s*\.\s*(?:E|LN2|LN10|LOG2E|LOG10E|PI|SQRT1_2|SQRT2|abs|acos|asin|atan2|atan|ceil|exp|floor|log|max|min|pow|random|round|sin|cos|sqrt|tan)/g;
    var FORMULA_REGEX = /^(?:[0-9.eE]|NaN|Infinifty|\!|\=|\?|\:|\+|\-|\*|\/|\%|\~|\&|\||\^|\<|\>|\(|\)|\s)*$/;
    var noop = function () { };
    function parseNumber(value) {
        if (KIKAKU.Utils.isString(value)) {
            if (FORMULA_REGEX.test(value.replace(MATH_REGEX, ''))) {
                try {
                    value = eval(value);
                }
                catch (e) {
                }
            }
        }
        value = parseFloat(value);
        if (isNaN(value) || !isFinite(value)) {
            value = 0;
        }
        return value;
    }
    var ParameterBase = (function () {
        function ParameterBase(name, value, options) {
            this._default_options = {
                title: true,
                helpTip: null,
                height: null,
                filter: null,
                callback: noop,
                onDoubleClick: noop,
                onChanging: noop
            };
            this._name = name;
            this._value = value;
            if (KIKAKU.Utils.isFunction(options)) {
                this._options = KIKAKU.Utils.assign({}, this._default_options, {
                    callback: options
                });
            }
            else {
                this._options = KIKAKU.Utils.assign({}, this._default_options, options);
            }
        }
        ParameterBase.prototype.getHeight = function () { return Parameter.DEFAULT_HEIGHT; };
        ParameterBase.prototype.build = function (group, builder) { };
        ParameterBase.prototype.init = function (obj) { };
        ParameterBase.prototype.get = function (index) { };
        ParameterBase.prototype.set = function (value_or_index, value2) { };
        ParameterBase.prototype.execute = function (undo) {
            if (undo === void 0) { undo = true; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        ParameterBase.prototype.enable = function (index) { };
        ParameterBase.prototype.disable = function (index) { };
        ParameterBase.prototype.visiblize = function (index) { };
        ParameterBase.prototype.getItems = function (index) { return []; };
        ParameterBase.prototype.addItems = function (items_or_index, items2) { };
        ParameterBase.prototype.removeItem = function (item_or_index, item2) { };
        ParameterBase.prototype.replaceItems = function (items_or_index, items2) { };
        ParameterBase.prototype.toJSON = function () { return {}; };
        ParameterBase.DEFAULT_HEIGHT = 24;
        return ParameterBase;
    })();
    var Parameter = (function (_super) {
        __extends(Parameter, _super);
        function Parameter() {
            _super.apply(this, arguments);
            this._initialized = function () { return false; };
        }
        Parameter.prototype.build = function (group, builder) {
            this._group = group;
            this._builder = builder;
            this.buildUI();
        };
        Parameter.prototype.buildUI = function () {
            var group = this._group;
            var builder = this._builder;
            var is_title = KIKAKU.Utils.isBoolean(this._options.title) ? this._options.title : true;
            var title_width = is_title ? builder.getTitleWidth() : 0;
            if (is_title) {
                this.buildTitle(title_width);
            }
            var parameter_width = group.size[0] - title_width;
            this.buildParameter(parameter_width);
        };
        Parameter.prototype.buildTitle = function (width) {
            var group = this._group;
            var height = this.getHeight();
            var title_group = group.add('group', [0, 0, width, height]);
            title_group.minimumSize = title_group.maximumSize = [width, height];
            title_group.spacing = title_group.margins = 0;
            title_group.alignment = ['left', 'top'];
            var title = KIKAKU.Utils.isString(this._options.title) ? this._options.title : this._name;
            title_group.add('statictext', undefined, title);
        };
        Parameter.prototype.buildParameter = function (width) { };
        Parameter.prototype.init = function (obj) {
            if (KIKAKU.Utils.isObject(obj)) {
                if (!KIKAKU.Utils.isUndefined(obj.items)) {
                    this.replaceItems(obj.items);
                }
                if (!KIKAKU.Utils.isUndefined(obj.value)) {
                    this.set(obj.value);
                }
            }
            this._initialized = function () { return true; };
        };
        Parameter.prototype.enable = function () {
            this._group.enabled = true;
        };
        Parameter.prototype.disable = function () {
            this._group.enabled = false;
        };
        Parameter.prototype.toJSON = function () {
            return {
                value: this.get()
            };
        };
        return Parameter;
    })(ParameterBase);
    var SingleParameter = (function (_super) {
        __extends(SingleParameter, _super);
        function SingleParameter() {
            _super.apply(this, arguments);
        }
        SingleParameter.prototype.onChange = function () {
            this.on('callback');
        };
        SingleParameter.prototype.on = function (event, update) {
            if (update === void 0) { update = true; }
            if (!this._initialized()) {
                return;
            }
            var builder = this._builder;
            var callback = this._options[event];
            if (KIKAKU.Utils.isFunction(callback)) {
                callback.call(builder);
            }
            if (update) {
                builder.update();
            }
        };
        return SingleParameter;
    })(Parameter);
    var MultipleParameter = (function (_super) {
        __extends(MultipleParameter, _super);
        function MultipleParameter() {
            _super.apply(this, arguments);
            this._uis = [];
        }
        MultipleParameter.prototype.onChange = function (index) {
            this.on(index, 'callback', true);
        };
        MultipleParameter.prototype.on = function (index, event, update) {
            if (update === void 0) { update = true; }
            if (!this._initialized()) {
                return;
            }
            var builder = this._builder;
            var callback = this._options[event];
            var done = false;
            if (KIKAKU.Utils.isFunction(callback)) {
                callback.call(builder, index);
                done = true;
            }
            else if (KIKAKU.Utils.isArray(callback) && KIKAKU.Utils.isFunction(callback[index])) {
                callback[index].call(builder, index);
                done = true;
            }
            if (done && update) {
                builder.update();
            }
        };
        MultipleParameter.prototype.enable = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                this._uis[index].enabled = true;
            }
            else {
                _super.prototype.enable.call(this);
            }
        };
        MultipleParameter.prototype.disable = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                this._uis[index].enabled = false;
            }
            else {
                _super.prototype.disable.call(this);
            }
        };
        return MultipleParameter;
    })(Parameter);
    var HeadingParameter = (function (_super) {
        __extends(HeadingParameter, _super);
        function HeadingParameter() {
            _super.apply(this, arguments);
        }
        HeadingParameter.prototype.buildUI = function () {
            var group = this._group;
            var width = group.size[0];
            var height = group.size[1];
            var heading_group = group.add('group', [0, 0, width, height]);
            heading_group.minimumSize = [width, height];
            heading_group.spacing = heading_group.margins = 0;
            heading_group.orientation = 'row';
            heading_group.alignment = ['fill', 'top'];
            heading_group.alignChildren = ['fill', 'fill'];
            var heading = this._name;
            if (KIKAKU.Utils.isString(this._value)) {
                heading = this._value;
            }
            else if (KIKAKU.Utils.isString(this._options.title)) {
                heading = this._options.title;
            }
            var heading_ui = this._ui = heading_group.add('statictext', [0, 0, width, height], heading);
            heading_ui.justify = 'center';
            if (this._options.helpTip) {
                heading_ui.helpTip = this._options.helpTip;
            }
        };
        HeadingParameter.prototype.get = function () {
            return this._ui.text;
        };
        HeadingParameter.prototype.set = function (value) {
            var text = String(value);
            if (text !== this.get()) {
                this._ui.text = text;
                this._builder.update();
            }
        };
        return HeadingParameter;
    })(Parameter);
    var SeparatorParameter = (function (_super) {
        __extends(SeparatorParameter, _super);
        function SeparatorParameter() {
            _super.apply(this, arguments);
        }
        SeparatorParameter.prototype.getHeight = function () {
            return SeparatorParameter.DEFAULT_HEIGHT;
        };
        SeparatorParameter.prototype.buildUI = function () {
            var group = this._group;
            var width = group.size[0];
            group.alignChildren = ['fill', 'center'];
            group.add('panel', [0, 0, width, 2]);
        };
        SeparatorParameter.DEFAULT_HEIGHT = 12;
        return SeparatorParameter;
    })(Parameter);
    var SpaceParameter = (function (_super) {
        __extends(SpaceParameter, _super);
        function SpaceParameter() {
            _super.apply(this, arguments);
        }
        SpaceParameter.prototype.getHeight = function () {
            if (KIKAKU.Utils.isNumber(this._value)) {
                this._value = Math.max(this._value, 0);
            }
            else {
                this._value = 5;
            }
            return this._value;
        };
        SpaceParameter.prototype.buildUI = function () { };
        SpaceParameter.prototype.enable = function () { };
        SpaceParameter.prototype.disable = function () { };
        return SpaceParameter;
    })(Parameter);
    var PanelParameter = (function (_super) {
        __extends(PanelParameter, _super);
        function PanelParameter() {
            _super.apply(this, arguments);
            this._stack = false;
        }
        PanelParameter.prototype.buildUI = function () {
            var group = this._group;
            var text = this._name;
            if (KIKAKU.Utils.isString(this._value)) {
                text = this._value;
            }
            else if (KIKAKU.Utils.isString(this._options.title)) {
                text = this._options.title;
            }
            if (KIKAKU.Utils.isBoolean(this._options.stack)) {
                this._stack = this._options.stack;
                if (this._stack) {
                    this._group.orientation = 'stack';
                }
            }
            group.text = text;
        };
        PanelParameter.prototype.init = function () {
            if (this._stack) {
                var children = this._group.children;
                for (var i = 1, l = children.length; i < l; ++i) {
                    children[i].visible = false;
                }
            }
        };
        PanelParameter.prototype.get = function () {
            return this._group.text;
        };
        PanelParameter.prototype.set = function (value) {
            var text = String(value);
            if (text !== this.get()) {
                this._group.text = text;
                this._builder.update();
            }
        };
        PanelParameter.prototype.visiblize = function (index) {
            if (this._stack) {
                var children = this._group.children;
                var children_num = children.length;
                if (index < 0 || index >= children_num) {
                    throw new RangeError;
                }
                for (var i = 0; i < children_num; ++i) {
                    if (i === index) {
                        children[i].visible = true;
                    }
                    else {
                        children[i].visible = false;
                    }
                }
            }
        };
        return PanelParameter;
    })(Parameter);
    var PanelEndParameter = (function (_super) {
        __extends(PanelEndParameter, _super);
        function PanelEndParameter() {
            _super.apply(this, arguments);
        }
        return PanelEndParameter;
    })(ParameterBase);
    var GroupParameter = (function (_super) {
        __extends(GroupParameter, _super);
        function GroupParameter() {
            _super.apply(this, arguments);
        }
        GroupParameter.prototype.buildUI = function () { };
        return GroupParameter;
    })(Parameter);
    var GroupEndParameter = (function (_super) {
        __extends(GroupEndParameter, _super);
        function GroupEndParameter() {
            _super.apply(this, arguments);
        }
        return GroupEndParameter;
    })(ParameterBase);
    //text parameter
    var TextParameter = (function (_super) {
        __extends(TextParameter, _super);
        function TextParameter() {
            _super.apply(this, arguments);
        }
        TextParameter.prototype.getCreationProperties = function () {
            return {};
        };
        TextParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var value = this._value || '';
            var text_ui = this._ui = group.add('edittext', undefined, value, this.getCreationProperties());
            if (this._options.helpTip) {
                text_ui.helpTip = this._options.helpTip;
            }
            text_ui.onChange = function () { _this.onChange(); };
            text_ui.onChanging = function () { _this.on('onChanging', false); };
            text_ui.onEnterKey = function () { _this.on('onEnterKey', false); };
            text_ui.onActivate = function () { _this.on('onActivate', false); };
            text_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        TextParameter.prototype.get = function () {
            return this._ui.text;
        };
        TextParameter.prototype.set = function (value) {
            var text = String(value);
            if (text !== this.get()) {
                this._ui.text = text;
                this.onChange();
            }
        };
        return TextParameter;
    })(SingleParameter);
    var TextsParameter = (function (_super) {
        __extends(TextsParameter, _super);
        function TextsParameter() {
            _super.apply(this, arguments);
        }
        TextsParameter.prototype.getCreationProperties = function () {
            return {};
        };
        TextsParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var ui = group.add('edittext', undefined, '', _this.getCreationProperties());
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.onChange = (function (index) {
                    return function () { _this.onChange(index); };
                })(i);
                ui.onChanging = (function (index) {
                    return function () { _this.on(index, 'onChanging', false); };
                })(i);
                ui.onEnterKey = (function (index) {
                    return function () { _this.on(index, 'onEnterKey', false); };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._uis.push(ui);
            });
        };
        TextsParameter.prototype.init = function (obj) {
            this.set(this._value);
            _super.prototype.init.call(this, obj);
        };
        TextsParameter.prototype.get = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                return this._uis[index].text;
            }
            var values = [];
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                values.push(ui.text);
            }
            return values;
        };
        TextsParameter.prototype.set = function (value_or_index, value2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(value2)) {
                var index = value_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var value = String(value2);
                if (value !== this.get(index)) {
                    this._uis[index].text = value;
                    this.onChange(index);
                }
            }
            else {
                if (KIKAKU.Utils.isArray(value_or_index)) {
                    var value = value_or_index.slice(0, this._uis.length);
                    KIKAKU.Utils.forEach(value, function (value, i) {
                        _this.set(i, value);
                    });
                }
            }
        };
        return TextsParameter;
    })(MultipleParameter);
    var TextAreaParameter = (function (_super) {
        __extends(TextAreaParameter, _super);
        function TextAreaParameter() {
            _super.apply(this, arguments);
        }
        TextAreaParameter.prototype.getCreationProperties = function () {
            return {
                multiline: true,
                scrolling: true
            };
        };
        TextAreaParameter.prototype.getHeight = function () {
            var height = TextAreaParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = this._options.height;
            }
            return height;
        };
        TextAreaParameter.DEFAULT_HEIGHT = 80;
        return TextAreaParameter;
    })(TextParameter);
    var TextAreasParameter = (function (_super) {
        __extends(TextAreasParameter, _super);
        function TextAreasParameter() {
            _super.apply(this, arguments);
        }
        TextAreasParameter.prototype.getCreationProperties = function () {
            return {
                multiline: true,
                scrolling: true
            };
        };
        TextAreasParameter.prototype.getHeight = function () {
            var height = TextAreasParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = this._options.height;
            }
            return height;
        };
        TextAreasParameter.DEFAULT_HEIGHT = 80;
        return TextAreasParameter;
    })(TextsParameter);
    var StaticTextParameter = (function (_super) {
        __extends(StaticTextParameter, _super);
        function StaticTextParameter() {
            _super.apply(this, arguments);
        }
        StaticTextParameter.prototype.buildParameter = function (width) {
            var group = this._group;
            var value = this._value || '';
            var text_ui = this._ui = group.add('statictext', undefined, value);
            if (this._options.helpTip) {
                text_ui.helpTip = this._options.helpTip;
            }
        };
        return StaticTextParameter;
    })(TextParameter);
    var StaticTextsParameter = (function (_super) {
        __extends(StaticTextsParameter, _super);
        function StaticTextsParameter() {
            _super.apply(this, arguments);
        }
        StaticTextsParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var ui = group.add('statictext', undefined, '');
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                _this._uis.push(ui);
            });
        };
        return StaticTextsParameter;
    })(TextsParameter);
    //number parameter
    function numberOnChange(parameter, options) {
        var _options = KIKAKU.Utils.assign({
            minvalue: -Infinity,
            maxvalue: Infinity,
            index: null
        }, options);
        return function () {
            var value = KIKAKU.Utils.clamp(parseNumber(this.text), _options.minvalue, _options.maxvalue);
            this.text = value + '';
            parameter.onChange(_options.index);
        };
    }
    function extractNumberValue(value) {
        var default_value = 0;
        var minvalue = -Infinity;
        var maxvalue = Infinity;
        if (KIKAKU.Utils.isObject(value)) {
            if (KIKAKU.Utils.isNumber(value.value)) {
                default_value = value.value;
            }
            if (KIKAKU.Utils.isNumber(value.minvalue)) {
                minvalue = value.minvalue;
            }
            if (KIKAKU.Utils.isNumber(value.maxvalue)) {
                maxvalue = value.maxvalue;
            }
        }
        else if (KIKAKU.Utils.isNumber(value)) {
            default_value = value;
        }
        return {
            value: default_value,
            minvalue: minvalue,
            maxvalue: maxvalue
        };
    }
    var NumberParameter = (function (_super) {
        __extends(NumberParameter, _super);
        function NumberParameter() {
            _super.apply(this, arguments);
        }
        NumberParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var minmax = extractNumberValue(this._value);
            this._minvalue = minmax.minvalue;
            this._maxvalue = minmax.maxvalue;
            var number_ui = this._ui = group.add('edittext', undefined, minmax.value);
            if (this._options.helpTip) {
                number_ui.helpTip = this._options.helpTip;
            }
            number_ui.onChange = numberOnChange(this, {
                minvalue: this._minvalue,
                maxvalue: this._maxvalue
            });
            number_ui.onEnterKey = function () { _this.on('onEnterKey', false); };
            number_ui.onActivate = function () { _this.on('onActivate', false); };
            number_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        NumberParameter.prototype.get = function () {
            return parseFloat(this._ui.text);
        };
        NumberParameter.prototype.set = function (value) {
            var num = KIKAKU.Utils.clamp(parseNumber(value), this._minvalue, this._maxvalue);
            if (num !== this.get()) {
                this._ui.text = num + '';
                this.onChange();
            }
        };
        return NumberParameter;
    })(SingleParameter);
    var NumbersParameter = (function (_super) {
        __extends(NumbersParameter, _super);
        function NumbersParameter() {
            _super.apply(this, arguments);
            this._default_values = [];
            this._minvalues = [];
            this._maxvalues = [];
        }
        NumbersParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var minmax = extractNumberValue(value);
                var ui = group.add('edittext', undefined, '');
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.onChange = numberOnChange(_this, {
                    minvalue: minmax.minvalue,
                    maxvalue: minmax.maxvalue,
                    index: i
                });
                ui.onEnterKey = (function (index) {
                    return function () { _this.on(index, 'onEnterKey', false); };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._default_values.push(minmax.value);
                _this._minvalues.push(minmax.minvalue);
                _this._maxvalues.push(minmax.maxvalue);
                _this._uis.push(ui);
            });
        };
        NumbersParameter.prototype.init = function (obj) {
            this.set(this._default_values);
            _super.prototype.init.call(this, obj);
        };
        NumbersParameter.prototype.get = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                return parseFloat(this._uis[index].text);
            }
            var values = [];
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                values.push(parseFloat(ui.text));
            }
            return values;
        };
        NumbersParameter.prototype.set = function (value_or_index, value2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(value2)) {
                var index = value_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var value = KIKAKU.Utils.clamp(parseNumber(value2), this._minvalues[index], this._maxvalues[index]);
                if (value !== this.get(index)) {
                    this._uis[index].text = value + '';
                    this.onChange(index);
                }
            }
            else {
                if (KIKAKU.Utils.isArray(value_or_index)) {
                    var value = value_or_index.slice(0, this._uis.length);
                    KIKAKU.Utils.forEach(value, function (value, i) {
                        _this.set(i, value);
                    });
                }
            }
        };
        return NumbersParameter;
    })(MultipleParameter);
    function extractSliderValue(obj) {
        var value = {};
        if (KIKAKU.Utils.isObject(obj)) {
            if (KIKAKU.Utils.isNumber(obj.minvalue)) {
                value.minvalue = obj.minvalue;
            }
            if (KIKAKU.Utils.isNumber(obj.maxvalue)) {
                value.maxvalue = obj.maxvalue;
            }
            if (KIKAKU.Utils.isNumber(obj.value)) {
                value.value = obj.value;
            }
        }
        else if (KIKAKU.Utils.isNumber(obj)) {
            value.value = obj;
        }
        return value;
    }
    var SliderParameter = (function (_super) {
        __extends(SliderParameter, _super);
        function SliderParameter() {
            _super.apply(this, arguments);
        }
        SliderParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var self = this;
            var group = this._group;
            var value = KIKAKU.Utils.assign({
                value: 0,
                minvalue: 0,
                maxvalue: 100
            }, extractSliderValue(this._value));
            this._minvalue = value.minvalue;
            this._maxvalue = value.maxvalue;
            var height = group.size[1];
            var number_width = Math.min(0.25 * width, 50);
            var slider_width = width - number_width;
            var slider_ui = this._ui = group.add('slider', undefined, value.value, value.minvalue, value.maxvalue);
            slider_ui.preferredSize = [slider_width, height];
            var number_ui = this._number_ui = group.add('edittext', undefined, value.value);
            number_ui.preferredSize = [number_width, height];
            number_ui.maximumSize = [Math.max(number_width, 100), height];
            if (this._options.helpTip) {
                slider_ui.helpTip = this._options.helpTip;
                number_ui.helpTip = this._options.helpTip;
            }
            slider_ui.onChange = function () {
                number_ui.text = this.value;
                self.onChange();
            };
            slider_ui.onActivate = function () { _this.on('onActivate', false); };
            slider_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
            number_ui.onChange = function () {
                var value = KIKAKU.Utils.clamp(parseNumber(this.text), self._minvalue, self._maxvalue);
                this.text = value;
                slider_ui.value = value;
                self.onChange();
            };
            number_ui.onEnterKey = function () { _this.on('onEnterKey', false); };
            number_ui.onActivate = function () { _this.on('onActivate', false); };
            number_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        SliderParameter.prototype.get = function () {
            return this._ui.value;
        };
        SliderParameter.prototype.set = function (value) {
            var num = KIKAKU.Utils.clamp(parseNumber(value), this._minvalue, this._maxvalue);
            if (num !== this.get()) {
                this._ui.value = num;
                this._number_ui.text = num + '';
                this.onChange();
            }
        };
        return SliderParameter;
    })(SingleParameter);
    //point parameter
    var PointParameterBase = (function (_super) {
        __extends(PointParameterBase, _super);
        function PointParameterBase() {
            _super.apply(this, arguments);
            this._uis = [];
        }
        PointParameterBase.prototype.getDimensions = function () {
            return 2;
        };
        PointParameterBase.prototype.buildParameter = function () {
            var _this = this;
            if (!KIKAKU.Utils.isArray(this._value)) {
                this._value = [];
                for (var i = 0; i < this.getDimensions(); i++) {
                    this._value.push(0);
                }
            }
            else {
                for (var i = 0; i < this.getDimensions(); i++) {
                    this._value[i] = parseNumber(this._value[i]);
                }
            }
            var group = this._group;
            for (var i = 0; i < this.getDimensions(); i++) {
                var ui = group.add('edittext', undefined, '0');
                if (this._options.helpTip) {
                    ui.helpTip = this._options.helpTip;
                }
                ui.onChange = numberOnChange(this);
                ui.onEnterKey = function () { _this.on('onEnterKey', false); };
                ui.onActivate = function () { _this.on('onActivate', false); };
                ui.onDeactivate = function () { _this.on('onDeactivate', false); };
                this._uis.push(ui);
            }
        };
        PointParameterBase.prototype.init = function (obj) {
            this.set(this._value);
            _super.prototype.init.call(this, obj);
        };
        PointParameterBase.prototype.get = function () {
            var value = [];
            for (var i = 0; i < this.getDimensions(); i++) {
                value.push(parseFloat(this._uis[i].text));
            }
            return value;
        };
        PointParameterBase.prototype.set = function (value) {
            if (!(KIKAKU.Utils.isArray(value) && value.length === this.getDimensions())) {
                throw new Error('Invalid value');
            }
            var point = [];
            var current_point = this.get();
            var is_same = true;
            for (var i = 0; i < this.getDimensions(); i++) {
                point[i] = parseNumber(value[i]);
                if (point[i] !== current_point[i]) {
                    is_same = false;
                }
            }
            if (!is_same) {
                for (var i = 0; i < this.getDimensions(); i++) {
                    this._uis[i].text = point[i] + '';
                }
                this.onChange();
            }
        };
        return PointParameterBase;
    })(SingleParameter);
    var PointParameter = (function (_super) {
        __extends(PointParameter, _super);
        function PointParameter() {
            _super.apply(this, arguments);
        }
        return PointParameter;
    })(PointParameterBase);
    var Point3DParameter = (function (_super) {
        __extends(Point3DParameter, _super);
        function Point3DParameter() {
            _super.apply(this, arguments);
        }
        Point3DParameter.prototype.getDimensions = function () {
            return 3;
        };
        return Point3DParameter;
    })(PointParameterBase);
    //file parameter
    var FileParameter = (function (_super) {
        __extends(FileParameter, _super);
        function FileParameter() {
            _super.apply(this, arguments);
        }
        FileParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var height = group.size[1];
            var value = this._value || '';
            var path_ui = this._ui = group.add('edittext', undefined, value);
            if (this._options.helpTip) {
                path_ui.helpTip = this._options.helpTip;
            }
            path_ui.onChange = function () { _this.onChange(); };
            path_ui.onEnterKey = function () { _this.on('onEnterKey', false); };
            path_ui.onActivate = function () { _this.on('onActivate', false); };
            path_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
            var filter = this._options.filter;
            var browse_ui = group.add('button', undefined, '...');
            browse_ui.maximumSize = [20, height];
            browse_ui.alignment = ['right', 'fill'];
            browse_ui.onClick = browse_ui.onEnterKey = function () {
                var file = File.openDialog(undefined, filter, false);
                if (file) {
                    if (path_ui.text !== file.absoluteURI) {
                        path_ui.text = file.absoluteURI;
                        _this.onChange();
                    }
                }
            };
        };
        return FileParameter;
    })(TextParameter);
    var FolderParameter = (function (_super) {
        __extends(FolderParameter, _super);
        function FolderParameter() {
            _super.apply(this, arguments);
        }
        FolderParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var height = group.size[1];
            var value = this._value || '';
            var path_ui = this._ui = group.add('edittext', undefined, value);
            if (this._options.helpTip) {
                path_ui.helpTip = this._options.helpTip;
            }
            path_ui.onChange = function () { _this.onChange(); };
            path_ui.onEnterKey = function () { _this.on('onEnterKey', false); };
            path_ui.onActivate = function () { _this.on('onActivate', false); };
            path_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
            var browse_ui = group.add('button', undefined, '...');
            browse_ui.maximumSize = [20, height];
            browse_ui.alignment = ['right', 'fill'];
            browse_ui.onClick = browse_ui.onEnterKey = function () {
                var folder = Folder.selectDialog();
                if (folder) {
                    if (path_ui.text !== folder.absoluteURI) {
                        path_ui.text = folder.absoluteURI;
                        _this.onChange();
                    }
                }
            };
        };
        return FolderParameter;
    })(TextParameter);
    //checkbox parameter
    function extractCheckboxValue(obj) {
        var value = true;
        var text = '';
        if (KIKAKU.Utils.isObject(obj)) {
            if (KIKAKU.Utils.isBoolean(obj.value)) {
                value = obj.value;
            }
            if (KIKAKU.Utils.isString(obj.text)) {
                text = obj.text;
            }
        }
        else {
            value = !!obj;
        }
        return {
            value: value,
            text: text
        };
    }
    var CheckboxParameter = (function (_super) {
        __extends(CheckboxParameter, _super);
        function CheckboxParameter() {
            _super.apply(this, arguments);
        }
        CheckboxParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var check = extractCheckboxValue(this._value);
            var checkbox_ui = this._ui = group.add('checkbox', undefined, check.text);
            if (this._options.helpTip) {
                checkbox_ui.helpTip = this._options.helpTip;
            }
            checkbox_ui.alignment = ['fill', 'bottom'];
            checkbox_ui.value = check.value;
            checkbox_ui.onClick = function () {
                _this.onChange();
            };
            checkbox_ui.onActivate = function () { _this.on('onActivate', false); };
            checkbox_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        CheckboxParameter.prototype.get = function () {
            return this._ui.value;
        };
        CheckboxParameter.prototype.set = function (value) {
            var check = !!value;
            if (check !== this.get()) {
                this._ui.value = check;
                this.onChange();
            }
        };
        return CheckboxParameter;
    })(SingleParameter);
    var CheckboxesParameter = (function (_super) {
        __extends(CheckboxesParameter, _super);
        function CheckboxesParameter() {
            _super.apply(this, arguments);
            this._texts = [];
        }
        CheckboxesParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var check = extractCheckboxValue(value);
                var ui = group.add('checkbox', undefined, check.text);
                ui.alignment = ['fill', 'bottom'];
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.value = check.value;
                ui.onClick = (function (index) {
                    return function () { _this.onChange(index); };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._texts.push(check.text);
                _this._uis.push(ui);
            });
        };
        CheckboxesParameter.prototype.init = function (obj) {
            var _this = this;
            KIKAKU.Utils.forEach(this._uis, function (ui, i) {
                ui.text = _this._texts[i];
            });
            _super.prototype.init.call(this, obj);
        };
        CheckboxesParameter.prototype.get = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                return this._uis[index].value;
            }
            var values = [];
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                values.push(ui.value);
            }
            return values;
        };
        CheckboxesParameter.prototype.set = function (value_or_index, value2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(value2)) {
                var index = value_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var value = !!value2;
                if (value !== this.get(index)) {
                    this._uis[index].value = value;
                    this.onChange(index);
                }
            }
            else {
                if (KIKAKU.Utils.isArray(value_or_index)) {
                    var value = value_or_index.slice(0, this._uis.length);
                    KIKAKU.Utils.forEach(value, function (value, i) {
                        _this.set(i, value);
                    });
                }
            }
        };
        return CheckboxesParameter;
    })(MultipleParameter);
    //radiobutton parameter
    var RadiobuttonParameter = (function (_super) {
        __extends(RadiobuttonParameter, _super);
        function RadiobuttonParameter() {
            _super.apply(this, arguments);
            this._uis = [];
        }
        RadiobuttonParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var ui = group.add('radiobutton', undefined);
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                if (i === 0) {
                    ui.value = true;
                }
                ui.onClick = (function (index) {
                    return function () { _this.onChange(); };
                })(i);
                _this._uis.push(ui);
            });
        };
        RadiobuttonParameter.prototype.init = function (obj) {
            var _this = this;
            KIKAKU.Utils.forEach(this._uis, function (ui, i) {
                ui.text = _this._value[i] || '';
            });
            _super.prototype.init.call(this, obj);
        };
        RadiobuttonParameter.prototype.get = function () {
            var text = '';
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                if (ui.value) {
                    text = ui.text;
                    break;
                }
            }
            return text;
        };
        RadiobuttonParameter.prototype.set = function (value) {
            var text = String(value);
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                if (ui.text === text) {
                    if (!ui.value) {
                        ui.value = true;
                        this.onChange();
                    }
                    break;
                }
            }
        };
        return RadiobuttonParameter;
    })(SingleParameter);
    function parseColor(value) {
        var color = [1, 0, 0, 1];
        if (KIKAKU.Utils.isArray(value)) {
            for (var i = 0, l = Math.min(value.length, 3); i < l; i++) {
                color[i] = KIKAKU.Utils.clamp(parseNumber(value[i]));
            }
        }
        return color;
    }
    function isSameColor(c1, c2) {
        for (var i = 0; i < 3; i++) {
            if (c1[i] !== c2[i]) {
                return false;
            }
        }
        return true;
    }
    function hexToRgb(hex) {
        var r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
        return [r / 255, g / 255, b / 255, 1];
    }
    function rgbToHex(rgb) {
        var r = ~~(255 * rgb[0]) << 16, g = ~~(255 * rgb[1]) << 8, b = ~~(255 * rgb[2]);
        return r | g | b;
    }
    var ColorParameter = (function (_super) {
        __extends(ColorParameter, _super);
        function ColorParameter() {
            _super.apply(this, arguments);
        }
        ColorParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            this._color = parseColor(this._value);
            var color_ui = this._ui = group.add('checkbox', undefined);
            if (this._options.helpTip) {
                color_ui.helpTip = this._options.helpTip;
            }
            color_ui.onDraw = function () {
                var graphics = color_ui.graphics;
                graphics.rectPath(0, 0, color_ui.size[0], color_ui.size[1]);
                graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, _this._color));
                if (!color_ui.enabled) {
                    graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0.3]));
                }
            };
            color_ui.onClick = color_ui.onEnterKey = function () {
                var hex = $.colorPicker(rgbToHex(_this._color));
                if (hex !== -1) {
                    _this._color = hexToRgb(hex);
                    _this.onChange();
                }
            };
            color_ui.onActivate = function () { _this.on('onActivate', false); };
            color_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        ColorParameter.prototype.onChange = function () {
            _super.prototype.onChange.call(this);
            this._ui.notify('onDraw');
        };
        ColorParameter.prototype.get = function () {
            return this._color;
        };
        ColorParameter.prototype.set = function (value) {
            var color = parseColor(value);
            if (!isSameColor(color, this._color)) {
                this._color = color;
                this.onChange();
            }
        };
        return ColorParameter;
    })(SingleParameter);
    var ColorsParameter = (function (_super) {
        __extends(ColorsParameter, _super);
        function ColorsParameter() {
            _super.apply(this, arguments);
            this._colors = [];
        }
        ColorsParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var color = parseColor(value);
                var ui = group.add('button', undefined, '');
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.onDraw = (function (index) {
                    return function () {
                        var graphics = ui.graphics;
                        graphics.rectPath(0, 0, ui.size[0], ui.size[1]);
                        graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, _this._colors[i]));
                        if (!ui.enabled) {
                            graphics.fillPath(graphics.newBrush(graphics.BrushType.SOLID_COLOR, [0, 0, 0, 0.3]));
                        }
                    };
                })(i);
                ui.onClick = ui.onEnterKey = (function (index) {
                    return function () {
                        var hex = $.colorPicker(rgbToHex(_this._colors[i]));
                        if (hex !== -1) {
                            _this._colors[i] = hexToRgb(hex);
                            _this.onChange(i);
                        }
                    };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._colors.push(color);
                _this._uis.push(ui);
            });
        };
        ColorsParameter.prototype.onChange = function (index) {
            _super.prototype.onChange.call(this, index);
            this._uis[index].notify('onDraw');
        };
        ColorsParameter.prototype.get = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                return this._colors[index];
            }
            var values = [];
            for (var _i = 0, _a = this._colors; _i < _a.length; _i++) {
                var color = _a[_i];
                values.push(color.slice());
            }
            return values;
        };
        ColorsParameter.prototype.set = function (value_or_index, value2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(value2)) {
                var index = value_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var color = parseColor(value2);
                if (!isSameColor(color, this._colors[index])) {
                    this._colors[index] = color;
                    this.onChange(index);
                }
            }
            else {
                if (KIKAKU.Utils.isArray(value_or_index)) {
                    var value = value_or_index.slice(0, this._uis.length);
                    KIKAKU.Utils.forEach(value, function (value, i) {
                        _this.set(i, value);
                    });
                }
            }
        };
        return ColorsParameter;
    })(MultipleParameter);
    //item parameter
    function extractItemValue(obj) {
        var value = null, items = [];
        if (KIKAKU.Utils.isObject(obj)) {
            if (!KIKAKU.Utils.isUndefined(obj.value)) {
                value = obj.value;
            }
            if (KIKAKU.Utils.isArray(obj.items)) {
                items = obj.items;
            }
        }
        else if (KIKAKU.Utils.isArray(obj)) {
            items = obj;
        }
        return {
            value: value,
            items: items
        };
    }
    function processItemUI(ui, lock, builder, fn) {
        try {
            lock.lock = true;
            fn(ui);
            if (ui.selection === null) {
                if (ui.items.length) {
                    ui.selection = ui.items[0];
                }
            }
        }
        catch (e) {
        }
        finally {
            lock.lock = false;
            builder.update();
        }
    }
    var ItemParameter = (function (_super) {
        __extends(ItemParameter, _super);
        function ItemParameter() {
            _super.apply(this, arguments);
            this._lock = { lock: false };
        }
        ItemParameter.prototype.init = function (obj) {
            if (this._default_value) {
                this.set(this._default_value);
            }
            _super.prototype.init.call(this, obj);
        };
        ItemParameter.prototype.get = function () {
            if (this._ui.selection === null) {
                return null;
            }
            return this._ui.selection.text;
        };
        ItemParameter.prototype.set = function (value) {
            var text = String(value);
            var ui = this._ui;
            var current_index = ui.selection === null ? -1 : ui.selection.index;
            for (var i = 0, l = ui.items.length; i < l; i++) {
                var item = ui.items[i];
                if (item.text === text) {
                    if (current_index !== i) {
                        ui.selection = item;
                        this.onChange();
                    }
                    break;
                }
            }
        };
        ItemParameter.prototype.getItems = function () {
            var items = [];
            for (var _i = 0, _a = this._ui.items; _i < _a.length; _i++) {
                var item = _a[_i];
                items.push(item.text);
            }
            return items;
        };
        ItemParameter.prototype.replaceItems = function (items) {
            processItemUI(this._ui, this._lock, this._builder, function (ui) {
                ui.removeAll();
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    ui.add('item', item);
                }
            });
        };
        ItemParameter.prototype.addItems = function (items) {
            items = KIKAKU.Utils.isArray(items) ? items : [items];
            processItemUI(this._ui, this._lock, this._builder, function (ui) {
                for (var _i = 0, _a = items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    ui.add('item', item);
                }
            });
        };
        ItemParameter.prototype.removeItem = function (item) {
            processItemUI(this._ui, this._lock, this._builder, function (ui) {
                ui.remove(item);
            });
        };
        ItemParameter.prototype.toJSON = function () {
            return {
                value: this.get(),
                items: this.getItems()
            };
        };
        return ItemParameter;
    })(SingleParameter);
    var ItemsParameter = (function (_super) {
        __extends(ItemsParameter, _super);
        function ItemsParameter() {
            _super.apply(this, arguments);
            this._default_values = [];
            this._locks = [];
        }
        ItemsParameter.prototype.init = function (obj) {
            for (var i = 0, l = this._uis.length; i < l; i++) {
                this.replaceItems(i, this._default_values[i].items);
                this.set(i, this._default_values[i].value);
            }
            _super.prototype.init.call(this, obj);
        };
        ItemsParameter.prototype.get = function (index) {
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var ui = this._uis[index];
                if (ui.selection === null) {
                    return null;
                }
                else {
                    return ui.selection.text;
                }
            }
            var values = [];
            for (var _i = 0, _a = this._uis; _i < _a.length; _i++) {
                var ui = _a[_i];
                if (ui.selection === null) {
                    values.push(null);
                }
                else {
                    values.push(ui.selection.text);
                }
            }
            return values;
        };
        ItemsParameter.prototype.set = function (value_or_index, value2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(value2)) {
                var index = value_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var text = String(value2);
                var ui = this._uis[index];
                var current_index = ui.selection === null ? -1 : ui.selection.index;
                for (var i = 0, l = ui.items.length; i < l; i++) {
                    var item = ui.items[i];
                    if (item.text === text) {
                        if (current_index !== i) {
                            ui.selection = item;
                            this.onChange(index);
                        }
                        break;
                    }
                }
            }
            else {
                if (KIKAKU.Utils.isArray(value_or_index)) {
                    var value = value_or_index.slice(0, this._uis.length);
                    KIKAKU.Utils.forEach(value, function (value, i) {
                        _this.set(i, value);
                    });
                }
            }
        };
        ItemsParameter.prototype.getItems = function (index) {
            var _this = this;
            if (KIKAKU.Utils.isNumber(index)) {
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var ui = this._uis[index];
                var items_2 = [];
                for (var _i = 0, _a = ui.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    items_2.push(item.text);
                }
                return items_2;
            }
            var items = [];
            KIKAKU.Utils.forEach(this._uis, function (ui, i) {
                items.push(_this.getItems(i));
            });
            return items;
        };
        ItemsParameter.prototype.replaceItems = function (items_or_index, items2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(items2)) {
                var index = items_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var items = items2;
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    ui.removeAll();
                    for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                        var item = items_3[_i];
                        ui.add('item', item);
                    }
                });
                return;
            }
            KIKAKU.Utils.forEach(items_or_index, function (items, i) {
                _this.replaceItems(i, items);
            });
        };
        ItemsParameter.prototype.addItems = function (items_or_index, items2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(items2)) {
                var index = items_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var items = KIKAKU.Utils.isArray(items2) ? items2 : [items2];
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                        var item = items_4[_i];
                        ui.add('item', item);
                    }
                });
                return;
            }
            KIKAKU.Utils.forEach(items_or_index, function (items, i) {
                _this.addItems(i, items);
            });
        };
        ItemsParameter.prototype.removeItem = function (item_or_index, item2) {
            var _this = this;
            if (!KIKAKU.Utils.isUndefined(item2)) {
                var index = item_or_index;
                if (index < 0 || index >= this._uis.length) {
                    throw new RangeError;
                }
                var item = item2;
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    ui.remove(item);
                });
                return;
            }
            KIKAKU.Utils.forEach(item_or_index, function (item, i) {
                _this.removeItem(i, item);
            });
        };
        ItemsParameter.prototype.toJSON = function () {
            return {
                value: this.get(),
                items: this.getItems()
            };
        };
        return ItemsParameter;
    })(MultipleParameter);
    var PopupParameter = (function (_super) {
        __extends(PopupParameter, _super);
        function PopupParameter() {
            _super.apply(this, arguments);
        }
        PopupParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var value = extractItemValue(this._value);
            this._default_value = value.value;
            var popup_ui = this._ui = group.add('dropdownlist', undefined, value.items);
            if (this._options.helpTip) {
                popup_ui.helpTip = this._options.helpTip;
            }
            if (popup_ui.items.length) {
                popup_ui.selection = popup_ui.items[0];
            }
            popup_ui.onChange = function () {
                if (!_this._lock.lock) {
                    _this.onChange();
                }
            };
            popup_ui.onActivate = function () { _this.on('onActivate', false); };
            popup_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        return PopupParameter;
    })(ItemParameter);
    var PopupsParameter = (function (_super) {
        __extends(PopupsParameter, _super);
        function PopupsParameter() {
            _super.apply(this, arguments);
        }
        PopupsParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var default_value = extractItemValue(value);
                var ui = group.add('dropdownlist', undefined, []);
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.onChange = (function (index) {
                    return function () {
                        if (!_this._locks[index].lock) {
                            _this.onChange(index);
                        }
                    };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._default_values.push(default_value);
                _this._locks.push({ lock: false });
                _this._uis.push(ui);
            });
        };
        return PopupsParameter;
    })(ItemsParameter);
    var ListboxParameter = (function (_super) {
        __extends(ListboxParameter, _super);
        function ListboxParameter() {
            _super.apply(this, arguments);
        }
        ListboxParameter.prototype.getHeight = function () {
            var height = ListboxParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = Math.max(0, this._options.height);
            }
            return height;
        };
        ListboxParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var value = extractItemValue(this._value);
            this._default_value = value.value;
            var listbox_ui = this._ui = group.add('listbox', undefined, value.items);
            if (this._options.helpTip) {
                listbox_ui.helpTip = this._options.helpTip;
            }
            listbox_ui.onChange = function () {
                if (!_this._lock.lock) {
                    _this.onChange();
                }
            };
            listbox_ui.onDoubleClick = function () {
                if (!_this._lock.lock) {
                    _this.on('onDoubleClick', false);
                }
            };
            listbox_ui.onActivate = function () { _this.on('onActivate', false); };
            listbox_ui.onDeactivate = function () { _this.on('onDeactivate', false); };
        };
        ListboxParameter.DEFAULT_HEIGHT = 80;
        return ListboxParameter;
    })(ItemParameter);
    var ListboxesParameter = (function (_super) {
        __extends(ListboxesParameter, _super);
        function ListboxesParameter() {
            _super.apply(this, arguments);
        }
        ListboxesParameter.prototype.getHeight = function () {
            var height = ListboxesParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = Math.max(0, this._options.height);
            }
            return height;
        };
        ListboxesParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var default_value = extractItemValue(value);
                var ui = group.add('listbox', undefined, []);
                if (KIKAKU.Utils.isString(help_tip)) {
                    ui.helpTip = help_tip;
                }
                else if (KIKAKU.Utils.isArray(help_tip) && KIKAKU.Utils.isString(help_tip[i])) {
                    ui.helpTip = help_tip[i];
                }
                ui.onChange = (function (index) {
                    return function () {
                        if (!_this._locks[index].lock) {
                            _this.onChange(index);
                        }
                    };
                })(i);
                ui.onDoubleClick = (function (index) {
                    return function () {
                        if (!_this._locks[index].lock) {
                            _this.on(index, 'onDoubleClick', false);
                        }
                    };
                })(i);
                ui.onActivate = (function (index) {
                    return function () { _this.on(index, 'onActivate', false); };
                })(i);
                ui.onDeactivate = (function (index) {
                    return function () { _this.on(index, 'onDeactivate', false); };
                })(i);
                _this._default_values.push(default_value);
                _this._locks.push({ lock: false });
                _this._uis.push(ui);
            });
        };
        ListboxesParameter.DEFAULT_HEIGHT = 80;
        return ListboxesParameter;
    })(ItemsParameter);
    //script
    var ScriptParameter = (function (_super) {
        __extends(ScriptParameter, _super);
        function ScriptParameter() {
            _super.apply(this, arguments);
            this._undo = true;
        }
        ScriptParameter.prototype.buildUI = function () {
            var _this = this;
            var group = this._group;
            var builder = this._builder;
            var name = this._name;
            var title = name;
            var callback = noop;
            var help_tip = null;
            var value = this._value;
            if (KIKAKU.Utils.isFunction(value)) {
                callback = value;
            }
            else if (KIKAKU.Utils.isObject(value)) {
                if (KIKAKU.Utils.isString(value.title)) {
                    title = value.title;
                }
                if (KIKAKU.Utils.isFunction(value.callback)) {
                    callback = value.callback;
                }
                if (value.helpTip) {
                    help_tip = value.helpTip;
                }
                if (KIKAKU.Utils.isBoolean(value.undo)) {
                    this._undo = value.undo;
                }
            }
            this._title = title;
            this._callback = callback;
            var ui;
            switch (title.toLowerCase()) {
                case 'ok':
                    ui = this._ui = group.add('button', undefined, 'Dummy', { name: 'ok' });
                    break;
                case 'cancel':
                    ui = this._ui = group.add('button', undefined, 'Dummy', { name: 'cancel' });
                    break;
                default:
                    ui = this._ui = group.add('button', undefined, 'Dummy');
                    break;
            }
            ui.alignment = ['fill', 'fill'];
            if (help_tip) {
                ui.helpTip = help_tip;
            }
            ui.onClick = function () {
                _this.execute();
            };
        };
        ScriptParameter.prototype.init = function () {
            this._ui.text = this._title;
        };
        ScriptParameter.prototype.execute = function (undo) {
            if (undo === void 0) { undo = this._undo; }
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var builder = this._builder;
            var callback = this._callback;
            var value;
            try {
                if (undo) {
                    app.beginUndoGroup(builder.getName() + ': ' + this._name);
                }
                value = callback.apply(builder, args);
            }
            catch (e) {
                alert(e);
            }
            finally {
                if (undo) {
                    app.endUndoGroup();
                }
            }
            return value;
        };
        ScriptParameter.prototype.enable = function () {
            this._ui.enabled = true;
        };
        ScriptParameter.prototype.disable = function () {
            this._ui.enabled = false;
        };
        ScriptParameter.prototype.get = function () {
            return this._ui.text;
        };
        ScriptParameter.prototype.set = function (value) {
            var text = String(value);
            if (text !== this.get()) {
                this._ui.text = text;
                this._builder.update();
            }
        };
        ScriptParameter.prototype.toJSON = function () {
            return {};
        };
        return ScriptParameter;
    })(Parameter);
    //help parameter
    var HelpParameter = (function (_super) {
        __extends(HelpParameter, _super);
        function HelpParameter() {
            _super.apply(this, arguments);
        }
        HelpParameter.prototype.build = function (group, builder) {
            var name = this._name;
            var value = this._value;
            var callback = KIKAKU.Utils.isFunction(value) ? value : function () {
                alert(value, name);
            };
            var help_ui = this._ui = group.add('button', [0, 0, 20, 20], '?');
            help_ui.onClick = function () {
                callback.call(builder);
            };
        };
        return HelpParameter;
    })(ParameterBase);
    //setting manager
    var UISettingManger = (function () {
        function UISettingManger(section, name) {
            this._obj = {};
            this._initilized = function () { return false; };
            this._setting_manager = new KIKAKU.SettingManager(section);
            this._name = name;
        }
        UISettingManger.prototype._have = function () {
            return this._setting_manager.have(this._name);
        };
        UISettingManger.prototype._initialize = function () {
            if (!this._initilized()) {
                if (this._have()) {
                    try {
                        this._obj = this._setting_manager.get(this._name, {});
                    }
                    catch (e) {
                    }
                }
                this._initilized = function () { return true; };
            }
        };
        UISettingManger.prototype._empty = function () {
            for (var key in this._obj) {
                return false;
            }
            return true;
        };
        UISettingManger.prototype.get = function (key, default_value) {
            this._initialize();
            if (KIKAKU.Utils.isUndefined(this._obj[key])) {
                return default_value;
            }
            return this._obj[key];
        };
        UISettingManger.prototype._save = function () {
            this._setting_manager.save(this._name, this._obj);
        };
        UISettingManger.prototype.save = function (key, value) {
            this._initialize();
            this._obj[key] = value;
            this._save();
        };
        UISettingManger.prototype._delete = function () {
            this._setting_manager.delete(this._name);
        };
        UISettingManger.prototype.delete = function (key) {
            this._initialize();
            if (this._obj[key]) {
                delete this._obj[key];
            }
            if (this._have()) {
                if (this._empty()) {
                    this._delete();
                }
                else {
                    this._save();
                }
            }
        };
        return UISettingManger;
    })();
    //file manager
    var UIFileManager = (function () {
        function UIFileManager(root, file_type) {
            this._file_manager = new KIKAKU.FileManager(root);
            this._file_type = file_type;
        }
        UIFileManager.prototype.getFileNames = function () {
            var file_type = this._file_type;
            var file_names = this._file_manager.getFileNames({
                mask: '*.' + file_type
            });
            var re = new RegExp('\.' + file_type + '$');
            file_names = KIKAKU.Utils.map(file_names, function (file_name) {
                return file_name.replace(re, '');
            });
            return file_names;
        };
        UIFileManager.prototype.exists = function (filename) {
            filename += '.' + this._file_type;
            return this._file_manager.exists(filename);
        };
        UIFileManager.prototype.get = function (filename) {
            filename += '.' + this._file_type;
            var data = this._file_manager.get(filename);
            if (data && this._file_type === UIFileManager.FILE_TYPE.JSON) {
                try {
                    data = KIKAKU.JSON.parse(data);
                }
                catch (e) {
                }
            }
            return data;
        };
        UIFileManager.prototype.save = function (filename, data) {
            filename += '.' + this._file_type;
            if (this._file_type === UIFileManager.FILE_TYPE.JSON) {
                data = KIKAKU.JSON.stringify(data);
            }
            this._file_manager.save(filename, data);
        };
        UIFileManager.prototype.delete = function (filename) {
            filename += '.' + this._file_type;
            return this._file_manager.delete(filename);
        };
        UIFileManager.FILE_TYPE = {
            TEXT: 'txt',
            JSON: 'json'
        };
        return UIFileManager;
    })();
    var api_scripts = {};
    var API = function (script_name, api_name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (api_scripts[script_name] && api_scripts[script_name][api_name]) {
            var api = api_scripts[script_name][api_name];
            return api.fn.apply(api.ctx, args);
        }
        throw new Error('API error');
    };
    API.exists = function (script_name, api_name) {
        if (KIKAKU.Utils.isUndefined(api_name)) {
            return !!api_scripts[script_name];
        }
        return !!api_scripts[script_name] && !!api_scripts[script_name][api_name];
    };
    API.add = function (script_name, api_name, fn, ctx) {
        if (!api_scripts[script_name]) {
            api_scripts[script_name] = {};
        }
        api_scripts[script_name][api_name] = {
            fn: fn,
            ctx: ctx
        };
    };
    API.remove = function (script_name) {
        if (api_scripts[script_name]) {
            return delete api_scripts[script_name];
        }
        return true;
    };
    var UIBuilder = (function () {
        function UIBuilder(global, name, options) {
            this._parameters = {};
            this._layer = 0;
            this._built = function () { return false; };
            this._global = global;
            this._name = name;
            this._options = KIKAKU.Utils.assign({
                version: '0.0.0',
                author: '',
                url: '',
                title: this._name,
                resizeable: true,
                numberOfScriptColumns: 2,
                titleWidth: 70,
                width: 200,
                help: true,
                autoSave: false,
                fileType: UIFileManager.FILE_TYPE.TEXT,
                api: false
            }, options);
            this._event_dispatcher = new KIKAKU.EventDispatcher;
            this._setting_manager = new UISettingManger(UIBuilder.LIBRARY_NAME, this._name);
            this._file_manager = new UIFileManager(UIBuilder.ALIAS + '/' + UIBuilder.LIBRARY_NAME + '/' + this._name, this._options.fileType);
        }
        UIBuilder.prototype.getName = function () { return this._name; };
        UIBuilder.prototype.getVersion = function () { return this._options.version; };
        UIBuilder.prototype.getAuthor = function () { return this._options.author; };
        UIBuilder.prototype.getUrl = function () { return this._options.url; };
        UIBuilder.prototype.getTitleWidth = function () { return this._options.titleWidth; };
        UIBuilder.prototype.getWidth = function () { return this._options.width; };
        UIBuilder.prototype.add = function (type, name, value, options) {
            if (this._built()) {
                throw new Error('Has been built');
            }
            else if (this._parameters[name]) {
                throw new Error('Give a unique name');
            }
            switch (type) {
                case UIBuilder.PARAMETER_TYPE.HEADING:
                    this._parameters[name] = new HeadingParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.SEPARATOR:
                    this._parameters[name] = new SeparatorParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.SPACE:
                    this._parameters[name] = new SpaceParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.PANEL:
                    this._parameters[name] = new PanelParameter(name, value, options);
                    this._layer++;
                    if (this._options.width < this._layer * 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE)) {
                        throw new Error('Too many panels or groups');
                    }
                    break;
                case UIBuilder.PARAMETER_TYPE.PANEL_END:
                    this._parameters[name] = new PanelEndParameter(name, value, options);
                    this._layer--;
                    break;
                case UIBuilder.PARAMETER_TYPE.GROUP:
                    this._parameters[name] = new GroupParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.GROUP_END:
                    this._parameters[name] = new GroupEndParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.TEXT:
                    this._parameters[name] = new TextParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.TEXTS:
                    this._parameters[name] = new TextsParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.TEXTAREA:
                    this._parameters[name] = new TextAreaParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.TEXTAREAS:
                    this._parameters[name] = new TextAreasParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.STATICTEXT:
                    this._parameters[name] = new StaticTextParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.STATICTEXTS:
                    this._parameters[name] = new StaticTextsParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.NUMBER:
                    this._parameters[name] = new NumberParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.NUMBERS:
                    this._parameters[name] = new NumbersParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.SLIDER:
                    this._parameters[name] = new SliderParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.POINT:
                    this._parameters[name] = new PointParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.POINT3D:
                    this._parameters[name] = new Point3DParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.FILE:
                    this._parameters[name] = new FileParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.FOLDER:
                    this._parameters[name] = new FolderParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.CHECKBOX:
                    this._parameters[name] = new CheckboxParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.CHECKBOXES:
                    this._parameters[name] = new CheckboxesParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.RADIOBUTTON:
                    this._parameters[name] = new RadiobuttonParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.COLOR:
                    this._parameters[name] = new ColorParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.COLORS:
                    this._parameters[name] = new ColorsParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.POPUP:
                    this._parameters[name] = new PopupParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.POPUPS:
                    this._parameters[name] = new PopupsParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.LISTBOX:
                    this._parameters[name] = new ListboxParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.LISTBOXES:
                    this._parameters[name] = new ListboxesParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.SCRIPT:
                    this._parameters[name] = new ScriptParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.HELP:
                    if (this._help) {
                        throw new Error('Help has been defined');
                    }
                    else if (!(KIKAKU.Utils.isString(value) || KIKAKU.Utils.isFunction(value))) {
                        throw new Error('Invalid help value');
                    }
                    this._help = new HelpParameter(name, value);
                    break;
                default:
                    throw new Error('Invalid parameter type');
            }
            return this;
        };
        UIBuilder.prototype.api = function (name, fn) {
            UIBuilder.API.add(this.getName(), name, fn, this);
            return this;
        };
        UIBuilder.prototype.on = function (type, fn) {
            this._event_dispatcher.addEventListener(type, fn, this);
            return this;
        };
        UIBuilder.prototype.off = function (type, fn) {
            this._event_dispatcher.removeEventListener(type, fn, this);
            return this;
        };
        UIBuilder.prototype.trigger = function (type) {
            this._event_dispatcher.dispatchEvent.apply(this._event_dispatcher, arguments);
            return this;
        };
        UIBuilder.prototype.validateParameter = function (name) {
            if (!this._built()) {
                throw new Error('Not bult yet');
            }
            else if (!this._parameters[name]) {
                throw new Error('Invalid parameter name');
            }
        };
        UIBuilder.prototype.get = function (name, index) {
            this.validateParameter(name);
            return this._parameters[name].get(index);
        };
        UIBuilder.prototype.set = function (name, arg1, arg2) {
            this.validateParameter(name);
            this._parameters[name].set(arg1, arg2);
            return this;
        };
        UIBuilder.prototype.execute = function (name, undo) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.validateParameter(name);
            return this._parameters[name].execute.apply(this._parameters[name], [undo].concat(args));
        };
        UIBuilder.prototype.enable = function (name, index) {
            this.validateParameter(name);
            this._parameters[name].enable(index);
            return this;
        };
        UIBuilder.prototype.disable = function (name, index) {
            this.validateParameter(name);
            this._parameters[name].disable(index);
            return this;
        };
        UIBuilder.prototype.visiblize = function (name, index) {
            this.validateParameter(name);
            this._parameters[name].visiblize(index);
            return this;
        };
        UIBuilder.prototype.getItems = function (name, index) {
            this.validateParameter(name);
            return this._parameters[name].getItems(index);
        };
        UIBuilder.prototype.replaceItems = function (name, items_or_index, items2) {
            this.validateParameter(name);
            this._parameters[name].replaceItems(items_or_index, items2);
            return this;
        };
        UIBuilder.prototype.addItems = function (name, items_or_index, items2) {
            this.validateParameter(name);
            this._parameters[name].addItems(items_or_index, items2);
            return this;
        };
        UIBuilder.prototype.removeItem = function (name, item_or_index, item2) {
            this.validateParameter(name);
            this._parameters[name].removeItem(item_or_index, item2);
            return this;
        };
        UIBuilder.prototype.getSetting = function (key, default_value) {
            return this._setting_manager.get(key, default_value);
        };
        UIBuilder.prototype.saveSetting = function (key, value) {
            this._setting_manager.save(key, value);
            return this;
        };
        UIBuilder.prototype.deleteSetting = function (key) {
            this._setting_manager.delete(key);
            return this;
        };
        UIBuilder.prototype.getFileNames = function () {
            return this._file_manager.getFileNames();
        };
        UIBuilder.prototype.existsFile = function (filename) {
            return this._file_manager.exists(filename);
        };
        UIBuilder.prototype.getFile = function (filename) {
            return this._file_manager.get(filename);
        };
        UIBuilder.prototype.saveFile = function (filename, data) {
            this._file_manager.save(filename, data);
            return this;
        };
        UIBuilder.prototype.deleteFile = function (filename) {
            return this._file_manager.delete(filename);
        };
        UIBuilder.prototype.update = function () {
            if (!this._built()) {
                throw new Error('Not built yet');
            }
            var auto_save = this._options.autoSave;
            if (auto_save) {
                this._setting_manager.save(UIBuilder.PARAMETERS_KEY, this._parameters);
            }
        };
        UIBuilder.prototype.close = function () {
            if (!this._built()) {
                throw new Error('Not built yet');
            }
            if (this._ui instanceof Window) {
                this._ui.close();
            }
        };
        UIBuilder.prototype.build = function () {
            var _this = this;
            if (this._built()) {
                throw new Error('Has been built');
            }
            this._built = function () { return true; };
            var resizeable = this._options.resizeable;
            var title = this._options.title;
            var w = this._ui = (function (global) {
                if (global instanceof Panel) {
                    return global;
                }
                else if (global === 'dialog') {
                    return new Window('dialog', title, undefined, { resizeable: resizeable });
                }
                return new Window('palette', title, undefined, { resizeable: resizeable });
            })(this._global);
            var group;
            var width = this._options.width;
            w.minimumSize = [width, undefined];
            w.spacing = UIBuilder.SPACING_SIZE;
            w.margins = UIBuilder.MARGINS_SIZE;
            if (resizeable) {
                w.onResizing = w.onResize = function () {
                    this.layout.resize();
                };
            }
            var current_container = w;
            var current_width = width - 2 * UIBuilder.MARGINS_SIZE;
            var script_index = 0;
            var script_columns = this._options.numberOfScriptColumns;
            //build parameters
            for (var name in this._parameters) {
                var parameter = this._parameters[name];
                if (parameter instanceof PanelParameter) {
                    current_container = current_container.add('panel');
                    current_container.minimumSize = [current_width, undefined];
                    current_container.spacing = UIBuilder.SPACING_SIZE;
                    current_container.margins = UIBuilder.MARGINS_SIZE;
                    current_container.alignment = ['fill', 'top'];
                    current_container.alignChildren = ['fill', 'fill'];
                    current_width -= 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE);
                    script_index = 0;
                    parameter.build(current_container, this);
                }
                else if (parameter instanceof PanelEndParameter) {
                    current_container = current_container.parent;
                    current_width += 2 * (UIBuilder.SPACING_SIZE + UIBuilder.MARGINS_SIZE);
                    script_index = 0;
                }
                else if (parameter instanceof GroupParameter) {
                    current_container = current_container.add('group');
                    current_container.orientation = 'column';
                    current_container.minimumSize = [current_width, undefined];
                    current_container.spacing = 0;
                    current_container.margins = 0;
                    current_container.alignment = ['fill', 'top'];
                    current_container.alignChildren = ['fill', 'fill'];
                    script_index = 0;
                    parameter.build(current_container, this);
                }
                else if (parameter instanceof GroupEndParameter) {
                    current_container = current_container.parent;
                    script_index = 0;
                }
                else {
                    var create_group = true;
                    if (parameter instanceof ScriptParameter) {
                        if (script_index % script_columns !== 0) {
                            create_group = false;
                        }
                        script_index++;
                    }
                    else {
                        if (parameter instanceof SpaceParameter && parameter.getHeight() === 0) {
                            create_group = false;
                        }
                        script_index = 0;
                    }
                    if (create_group) {
                        group = current_container.add('group', [0, 0, current_width, parameter.getHeight()]);
                        group.minimumSize = [current_width, parameter.getHeight()];
                        group.spacing = 1;
                        group.margins = 0;
                        group.orientation = 'row';
                        group.alignment = ['fill', 'top'];
                        group.alignChildren = ['fill', 'fill'];
                    }
                    parameter.build(group, this);
                }
            }
            //help
            if (this._options.help && !this._help) {
                var text = this.getName() + ' v' + this.getVersion();
                if (this.getAuthor()) {
                    text += '\n\n' + this.getAuthor();
                }
                if (this.getUrl()) {
                    text += '\n' + this.getUrl();
                }
                this._help = new HelpParameter(this.getName(), text);
            }
            if (this._help) {
                group = w.add('group', undefined);
                group.spacing = group.margins = 0;
                group.alignment = ['right', 'top'];
                group.alignChildren = ['right', 'top'];
                this._help.build(group, this);
            }
            //api
            if (this._options.api) {
                var default_api = {
                    get: true,
                    set: true,
                    execute: true,
                    enable: false,
                    disable: false,
                    replaceItems: false,
                    addItems: false,
                    removeItem: false
                };
                var api = KIKAKU.Utils.isBoolean(this._options.api) ? default_api : KIKAKU.Utils.assign({}, default_api, this._options.api);
                for (var method in api) {
                    this.api(method, this[method]);
                }
            }
            //init
            var init = function () {
                var auto_save = _this._options.autoSave;
                var values = {};
                if (auto_save) {
                    values = _this.getSetting(UIBuilder.PARAMETERS_KEY, {});
                }
                else {
                    _this.deleteSetting(UIBuilder.PARAMETERS_KEY);
                }
                for (var name in _this._parameters) {
                    _this._parameters[name].init(values[name]);
                }
                _this.trigger('init');
            };
            if (w instanceof Window) {
                w.onShow = function () { init(); };
                w.onClose = function () {
                    UIBuilder.API.remove(_this.getName());
                    _this.trigger('close');
                };
                w.center();
                w.show();
            }
            else {
                w.layout.layout(true);
                init();
            }
        };
        UIBuilder.LIBRARY_NAME = 'KikakuUIBuilder';
        UIBuilder.VERSION = '2.3.1';
        UIBuilder.AUTHOR = 'Kareobana';
        UIBuilder.ALIAS = 'Atarabi';
        UIBuilder.PARAMETER_TYPE = {
            HEADING: 'heading',
            SEPARATOR: 'separator',
            SPACE: 'space',
            PANEL: 'panel',
            PANEL_END: 'panelend',
            GROUP: 'group',
            GROUP_END: 'groupend',
            TEXT: 'text',
            TEXTS: 'texts',
            TEXTAREA: 'textarea',
            TEXTAREAS: 'textareas',
            STATICTEXT: 'statictext',
            STATICTEXTS: 'statictexts',
            NUMBER: 'number',
            NUMBERS: 'numbers',
            SLIDER: 'slider',
            POINT: 'point',
            POINT3D: 'point3d',
            FILE: 'file',
            FOLDER: 'folder',
            CHECKBOX: 'checkbox',
            CHECKBOXES: 'checkboxes',
            RADIOBUTTON: 'radiobutton',
            COLOR: 'color',
            COLORS: 'colors',
            POPUP: 'popup',
            POPUPS: 'popups',
            LISTBOX: 'listbox',
            LISTBOXES: 'listboxes',
            SCRIPT: 'script',
            HELP: 'help',
            CUSTOM: 'custom'
        };
        UIBuilder.PARAMETERS_KEY = '__parameters__';
        UIBuilder.SPACING_SIZE = 2;
        UIBuilder.MARGINS_SIZE = 5;
        UIBuilder.API = API;
        return UIBuilder;
    })();
    KIKAKU.UIBuilder = UIBuilder;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="../typings/aftereffects/ae.d.ts" />
/// <reference path="KikakuUtils.ts" />
var KIKAKU;
(function (KIKAKU) {
    var Unit;
    (function (Unit) {
        var noop = function () { };
        function test(name, hooks_or_tests, tests2) {
            var hooks = {
                before: noop,
                beforeEach: noop,
                afterEach: noop,
                after: noop
            };
            var tests;
            if (KIKAKU.Utils.isUndefined(tests2)) {
                tests = hooks_or_tests;
            }
            else {
                hooks = KIKAKU.Utils.assign(hooks, hooks_or_tests);
                tests = tests2;
            }
            var test = new Test(name, hooks, tests);
            return test.run();
        }
        Unit.test = test;
        var Test = (function () {
            function Test(name, hooks, tests) {
                this._name = name;
                this._hooks = hooks;
                this._tests = tests;
            }
            Test.prototype.run = function () {
                var name = this._name;
                var hooks = this._hooks;
                var tests = this._tests;
                var utility = new Utility;
                var ctx = {};
                var passed = 0;
                var exception = 0;
                var total = 0;
                $.writeln('\n------- ' + name + ' started -------');
                hooks.before.call(ctx, utility);
                for (var key in tests) {
                    var test_1 = tests[key];
                    var assert = new Assert(key);
                    $.writeln('*** ' + key + ' started ***');
                    hooks.beforeEach.call(ctx, utility);
                    try {
                        test_1.call(ctx, assert, utility);
                        if (assert.isPassed()) {
                            passed++;
                        }
                    }
                    catch (e) {
                        $.writeln(e);
                        exception++;
                    }
                    hooks.afterEach.call(ctx, utility);
                    $.writeln('*** ' + key + ' finished: ' + assert.getPassed() + ' / ' + assert.getTotal() + ' ***');
                    total++;
                }
                hooks.after.call(ctx, utility);
                $.writeln('------- ' + name + ' finished: ' + passed + ' / ' + total + (exception ? ' (Exception: ' + exception + ')' : '') + ' -------');
                return passed === total;
            };
            return Test;
        })();
        var Assert = (function () {
            function Assert(name) {
                this._passed = 0;
                this._total = 0;
                this._name = name;
            }
            Assert.prototype.getTotal = function () { return this._total; };
            Assert.prototype.getPassed = function () { return this._passed; };
            Assert.prototype.isPassed = function () { return this._passed === this._total; };
            Assert.prototype.createMessage = function (message) {
                return message || this._name + '#' + (this._total + 1);
            };
            Assert.prototype.check = function (result, suffix, message) {
                if (result) {
                    this._passed++;
                }
                else {
                    $.writeln(this.createMessage(message) + suffix);
                }
                this._total++;
            };
            Assert.prototype.ok = function (result, message) {
                this.check(result, ': bad', message);
            };
            Assert.prototype.notOk = function (result, message) {
                this.check(!result, ': bad', message);
            };
            Assert.prototype.toSource = function (obj) {
                if (obj === null) {
                    return 'null';
                }
                else if (obj === void 0) {
                    return 'undefined';
                }
                return obj.toSource();
            };
            Assert.prototype.equal = function (actual, expected, message) {
                var result = this.toSource(actual) === this.toSource(expected);
                this.check(result, ': ' + String(actual) + ' is different from ' + String(expected), message);
            };
            Assert.prototype.notEqual = function (actual, expected, message) {
                var result = this.toSource(actual) === this.toSource(expected);
                this.check(!result, ': ' + String(actual) + ' is same as ' + String(expected), message);
            };
            return Assert;
        })();
        Unit.Assert = Assert;
        var Utility = (function () {
            function Utility() {
                this._width = 640;
                this._height = 320;
                this._items = {};
                this._layers = {};
            }
            Utility.prototype.setSize = function (width, height) {
                this._width = width;
                this._height = height;
            };
            Utility.prototype.checkItem = function (name) {
                if (this._items[name]) {
                    throw new Error(name + ' already exists');
                }
            };
            Utility.prototype.addCompItem = function (name, pixelAsplect, duration, frameRate) {
                if (pixelAsplect === void 0) { pixelAsplect = 1; }
                if (duration === void 0) { duration = 10; }
                if (frameRate === void 0) { frameRate = 30; }
                this.checkItem(name);
                var comp = this._items[name] = app.project.items.addComp(name, this._width, this._height, pixelAsplect, duration, frameRate);
                return comp;
            };
            Utility.prototype.addFolderItem = function (name) {
                this.checkItem(name);
                var folder = this._items[name] = app.project.items.addFolder(name);
                return folder;
            };
            Utility.prototype.addFootageItem = function (name, path) {
                this.checkItem(name);
                var file = new File(path);
                if (!file.exists) {
                    throw new Error(path + ' doesn\'t exists');
                }
                var import_options = new ImportOptions(file);
                if (!import_options.canImportAs(ImportAsType.FOOTAGE)) {
                    throw new Error('Unable to import ' + path);
                }
                var footage = this._items[name] = app.project.importFile(import_options);
                footage.name = name;
                return footage;
            };
            Utility.prototype.getItem = function (name) {
                if (!this._items[name]) {
                    throw new Error(name + ' doesn\'t exists');
                }
                return this._items[name];
            };
            Utility.prototype.removeItem = function (name) {
                if (this._items[name]) {
                    try {
                        this._items[name].remove();
                    }
                    catch (e) {
                    }
                    delete this._items[name];
                }
            };
            Utility.prototype.removeItems = function () {
                for (var name in this._items) {
                    this.removeItem(name);
                }
            };
            Utility.prototype.checkLayer = function (comp_name, name) {
                if (!this._items[comp_name]) {
                    throw new Error(comp_name + ' doesn\'t exists');
                }
                else if (!KIKAKU.Utils.isCompItem(this._items[comp_name])) {
                    throw new Error(comp_name + ' isn\'t CompItem');
                }
                else if (this._layers[name]) {
                    throw new Error(name + ' already exists');
                }
            };
            Utility.prototype.addAVLayer = function (comp_name, name, av_item_name, duration) {
                this.checkLayer(comp_name, name);
                if (!this._items[av_item_name]) {
                    throw new Error(av_item_name + ' doesn\'t exists');
                }
                else if (!KIKAKU.Utils.isAVItem(this._items[av_item_name])) {
                    throw new Error(av_item_name + ' isn\'t AVItem');
                }
                var comp = this._items[comp_name];
                var av_item = this._items[av_item_name];
                var layer = this._layers[name] = KIKAKU.Utils.isUndefined(duration) ? comp.layers.add(av_item) : comp.layers.add(av_item, duration);
                layer.name = name;
                return layer;
            };
            Utility.prototype.addNullLayer = function (comp_name, name, duration) {
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = KIKAKU.Utils.isUndefined(duration) ? comp.layers.addNull() : comp.layers.addNull(duration);
                layer.name = name;
                return layer;
            };
            Utility.prototype.addSolidLayer = function (comp_name, name, color, duration) {
                if (color === void 0) { color = [1, 1, 1]; }
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = KIKAKU.Utils.isUndefined(duration) ? comp.layers.addSolid(color, name, this._width, this._height, comp.pixelAspect) : comp.layers.addSolid(color, name, this._width, this._height, comp.pixelAspect, duration);
                return layer;
            };
            Utility.prototype.addTextLayer = function (comp_name, name, source_text) {
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = KIKAKU.Utils.isUndefined(source_text) ? comp.layers.addText() : comp.layers.addText(source_text);
                layer.name = name;
                return layer;
            };
            Utility.prototype.addBoxTextLayer = function (comp_name, name, size, source_text) {
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = KIKAKU.Utils.isUndefined(source_text) ? comp.layers.addBoxText(size) : comp.layers.addBoxText(size, source_text);
                layer.name = name;
                return layer;
            };
            Utility.prototype.addCameraLayer = function (comp_name, name, center_point) {
                if (center_point === void 0) { center_point = [0.5 * this._width, 0.5 * this._height]; }
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = comp.layers.addCamera(name, center_point);
                return layer;
            };
            Utility.prototype.addLightLayer = function (comp_name, name, center_point) {
                if (center_point === void 0) { center_point = [0.5 * this._width, 0.5 * this._height]; }
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = comp.layers.addLight(name, center_point);
                return layer;
            };
            Utility.prototype.addShapeLayer = function (comp_name, name) {
                this.checkLayer(comp_name, name);
                var comp = this._items[comp_name];
                var layer = this._layers[name] = comp.layers.addShape();
                layer.name = name;
                return layer;
            };
            Utility.prototype.getLayer = function (name) {
                if (!this._layers[name]) {
                    throw new Error(name + ' doesn\'t exists');
                }
                return this._layers[name];
            };
            Utility.prototype.removeLayer = function (name) {
                if (this._layers[name]) {
                    try {
                        var folder_item;
                        var layer = this._layers[name];
                        if (KIKAKU.Utils.isSolidLayer(layer)) {
                            var source = layer.source;
                            var folder_item_1 = source.parentFolder;
                            source.remove();
                            if (!folder_item_1.numItems) {
                                folder_item_1.remove();
                            }
                        }
                        else {
                            this._layers[name].remove();
                        }
                    }
                    catch (e) {
                    }
                    delete this._layers[name];
                }
            };
            Utility.prototype.removeLayers = function () {
                for (var name in this._layers) {
                    this.removeLayer(name);
                }
            };
            Utility.prototype.removeAll = function () {
                this.removeLayers();
                this.removeItems();
            };
            return Utility;
        })();
        Unit.Utility = Utility;
    })(Unit = KIKAKU.Unit || (KIKAKU.Unit = {}));
})(KIKAKU || (KIKAKU = {}));
/// <reference path="KikakuConfig.ts" />
/// <reference path="KikakuUtils.ts" />
/// <reference path="KikakuJSON.ts" />
/// <reference path="KikakuEventDispatcher.ts" />
/// <reference path="KikakuFileManager.ts" />
/// <reference path="KikakuSettingManager.ts" />
/// <reference path="KikakuUIBuilder.ts" />
/// <reference path="KikakuUnit.ts" /> 
