var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var KIKAKU;
(function (KIKAKU) {
    KIKAKU.MAJOR_VERSION = 0;
    KIKAKU.MINOR_VERSION = 8;
    KIKAKU.PATCH_VERSION = 7;
    KIKAKU.VERSION = KIKAKU.MAJOR_VERSION + "." + KIKAKU.MINOR_VERSION + "." + KIKAKU.PATCH_VERSION;
    KIKAKU.AUTHOR = 'Kareobana';
    KIKAKU.LICENSE = 'MIT';
    function checkVersion(version) {
        var versions = version.split('.');
        var _a = [~~versions[0], ~~versions[1], ~~versions[2]], major = _a[0], minor = _a[1], patch = _a[2];
        if (major > KIKAKU.MAJOR_VERSION) {
            return true;
        }
        else if (major == KIKAKU.MAJOR_VERSION) {
            if (minor > KIKAKU.MINOR_VERSION) {
                return true;
            }
            else if (minor == KIKAKU.MINOR_VERSION) {
                if (patch >= KIKAKU.PATCH_VERSION) {
                    return true;
                }
            }
        }
        return false;
    }
    KIKAKU.checkVersion = checkVersion;
})(KIKAKU || (KIKAKU = {}));
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
        } switch ((typeof a)) {
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
            child["super"] = parent;
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
                filters[_i] = arguments[_i];
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
                filters[_i] = arguments[_i];
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
                filters[_i] = arguments[_i];
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
                    if (comment) {
                        parsed_comment = (_a = {}, _a[COMMENT_KEY] = comment, _a);
                    }
                    else {
                        parsed_comment = {};
                    }
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
/// <reference path="utils/utility.ts" />
/// <reference path="utils/filesystem.ts" />
/// <reference path="utils/item.ts" />
/// <reference path="utils/layer.ts" />
/// <reference path="utils/property.ts" />
/// <reference path="utils/color.ts" />
/// <reference path="utils/comment.ts" /> 
var KIKAKU;
(function (KIKAKU) {
    var KArray = (function () {
        function KArray(_arr) {
            this._arr = _arr;
        }
        KArray.from = function (arr) {
            return new KArray(arr);
        };
        KArray.of = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return new KArray(items);
        };
        KArray.prototype.get = function () {
            return this._arr;
        };
        KArray.prototype.at = function (index) {
            return this._arr[index];
        };
        KArray.prototype.length = function () {
            return this._arr.length;
        };
        //Mutator
        KArray.prototype.copyWithin = function (target, start, end) {
            if (end === void 0) { end = this._arr.length; }
            var len = this._arr.length;
            var to = target < 0 ? Math.max(len + target, 0) : Math.min(target, len);
            var from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
            var last = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
            var count = Math.min(last - from, len - to);
            var direction = 1;
            if (from < to && to < (from + count)) {
                direction = -1;
                from += count - 1;
                to += count - 1;
            }
            for (; count > 0; --count) {
                this._arr[to] = this._arr[from];
                from += direction;
                to += direction;
            }
            return this;
        };
        KArray.prototype.fill = function (value, start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = this._arr.length; }
            var len = this._arr.length;
            var k = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
            var last = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
            for (; k < last; ++k) {
                this._arr[k] = value;
            }
            return this;
        };
        KArray.prototype.pop = function () {
            return this._arr.pop();
        };
        KArray.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return (_a = this._arr).push.apply(_a, items);
            var _a;
        };
        KArray.prototype.reverse = function () {
            this._arr.reverse();
            return this;
        };
        KArray.prototype.shift = function () {
            return this._arr.shift();
        };
        KArray.prototype.sort = function (cmp) {
            this._arr.sort(cmp);
            return this;
        };
        KArray.prototype.splice = function (start, deleteCount) {
            var items = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                items[_i - 2] = arguments[_i];
            }
            (_a = this._arr).splice.apply(_a, [start, deleteCount].concat(items));
            return this;
            var _a;
        };
        KArray.prototype.unshift = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return (_a = this._arr).unshift.apply(_a, items);
            var _a;
        };
        //Accessor
        KArray.prototype.concat = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return new KArray((_a = this._arr).concat.apply(_a, items));
            var _a;
        };
        KArray.prototype.includes = function (searchElement, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            var len = this._arr.length;
            var k = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);
            for (; k < len; ++k) {
                if (searchElement === this._arr[k]) {
                    return true;
                }
            }
            return false;
        };
        KArray.prototype.join = function (sepqrator) {
            return this._arr.join(sepqrator);
        };
        KArray.prototype.slice = function (start, end) {
            return new KArray(this._arr.slice(start, end));
        };
        KArray.prototype.toSource = function () {
            return this._arr.toSource();
        };
        KArray.prototype.toString = function () {
            return this._arr.toString();
        };
        KArray.prototype.toLocaleString = function () {
            return this._arr.toLocaleString();
        };
        KArray.prototype.indexOf = function (searchElement, fromIndex) {
            var len = this._arr.length;
            if (len === 0) {
                return -1;
            }
            var n = fromIndex !== void 0 ? fromIndex : 0;
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; ++k) {
                if (this._arr[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
        KArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
            var len = this._arr.length;
            if (len === 0) {
                return -1;
            }
            var n = fromIndex !== void 0 ? fromIndex : len;
            var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
            for (; k >= 0; --k) {
                if (this._arr[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
        //iteration
        KArray.prototype.forEach = function (callbackfn, thisArg) {
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                callbackfn.call(thisArg, this._arr[k], k, this._arr);
            }
        };
        KArray.prototype.entries = function () {
            var arr = [];
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                arr.push([k, this._arr[k]]);
            }
            return new KArray(arr);
        };
        KArray.prototype.every = function (callbackfn, thisArg) {
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                if (!callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
                    return false;
                }
            }
            return true;
        };
        KArray.prototype.keys = function () {
            var arr = [];
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                arr.push(k);
            }
            return new KArray(arr);
        };
        KArray.prototype.map = function (callbackfn, thisArg) {
            var arr = [];
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                arr.push(callbackfn.call(thisArg, this._arr[k], k, this._arr));
            }
            return new KArray(arr);
        };
        KArray.prototype.some = function (callbackfn, thisArg) {
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
                    return true;
                }
            }
            return false;
        };
        KArray.prototype.filter = function (callbackfn, thisArg) {
            var arr = [];
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
                    arr.push(this._arr[k]);
                }
            }
            return new KArray(arr);
        };
        KArray.prototype.find = function (callbackfn, thisArg) {
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
                    return this._arr[k];
                }
            }
            return void 0;
        };
        KArray.prototype.findIndex = function (callbackfn, thisArg) {
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
                    return k;
                }
            }
            return -1;
        };
        KArray.prototype.reduce = function (callbackfn, initialValue) {
            var len = this._arr.length;
            var k = 0;
            var value;
            if (initialValue === void 0) {
                if (len === 0) {
                    throw new TypeError();
                }
                value = this._arr[k++];
            }
            for (; k < len; ++k) {
                value = callbackfn.call(undefined, value, this._arr[k], k, this._arr);
            }
            return value;
        };
        KArray.prototype.reduceRight = function (callbackfn, initialValue) {
            var len = this._arr.length;
            var k = len - 1;
            var value;
            if (initialValue === void 0) {
                if (len === 0) {
                    throw new TypeError();
                }
                value = this._arr[k--];
            }
            for (; k >= 0; --k) {
                value = callbackfn.call(undefined, value, this._arr[k], k, this._arr);
            }
            return value;
        };
        KArray.prototype.values = function () {
            var arr = [];
            for (var k = 0, len = this._arr.length; k < len; ++k) {
                arr.push(this._arr[k]);
            }
            return new KArray(arr);
        };
        return KArray;
    }());
    KIKAKU.KArray = KArray;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var KFile = (function () {
        function KFile(file) {
            if (file instanceof File) {
                this._file = file;
            }
            else {
                this._file = new File(file);
            }
        }
        KFile.prototype.get = function () {
            return this._file;
        };
        //static
        KFile.fs = function () {
            return File.fs;
        };
        KFile.decode = function (uri) {
            return File.decode(uri);
        };
        KFile.encode = function (name) {
            return File.encode(name);
        };
        KFile.isEncodingAvailable = function (name) {
            return File.isEncodingAvailable(name);
        };
        KFile.openDialog = function (prompt_, filter, multiSelect) {
            var file = File.openDialog(prompt_, filter, multiSelect);
            if (file === null) {
                return null;
            }
            else if (file instanceof File) {
                return new KFile(file);
            }
            else {
                return new KIKAKU.KArray(file).map(function (file) { return new KFile(file); });
            }
        };
        KFile.saveDialog = function (prompt_, filter) {
            return new KFile(File.saveDialog(prompt_, filter));
        };
        //attributes
        KFile.prototype.absoluteURI = function () {
            return this._file.absoluteURI;
        };
        KFile.prototype.alias = function () {
            return this._file.alias;
        };
        KFile.prototype.created = function () {
            return this._file.created;
        };
        KFile.prototype.creator = function () {
            return this._file.creator;
        };
        KFile.prototype.displayName = function () {
            return this._file.displayName;
        };
        KFile.prototype.encoding = function (encoding) {
            if (encoding !== void 0)
                this._file.encoding = encoding;
            return this._file.encoding;
        };
        KFile.prototype.eof = function () {
            return this._file.eof;
        };
        KFile.prototype.error = function () {
            return this._file.error;
        };
        KFile.prototype.exists = function () {
            return this._file.exists;
        };
        KFile.prototype.fsName = function () {
            return this._file.fsName;
        };
        KFile.prototype.fullName = function () {
            return this._file.fullName;
        };
        KFile.prototype.hidden = function (hidden) {
            if (hidden !== void 0)
                this._file.hidden = hidden;
            return this._file.hidden;
        };
        KFile.prototype.length = function () {
            return this._file.length;
        };
        KFile.prototype.lineFeed = function () {
            return this._file.lineFeed;
        };
        KFile.prototype.localizedName = function () {
            return this._file.localizedName;
        };
        KFile.prototype.modified = function () {
            return this._file.modified;
        };
        KFile.prototype.name = function () {
            return this._file.name;
        };
        KFile.prototype.parent = function () {
            return new KFolder(this._file.parent);
        };
        KFile.prototype.path = function () {
            return this._file.path;
        };
        KFile.prototype.readonly = function () {
            return this._file.readonly;
        };
        KFile.prototype.relativeURI = function () {
            return this._file.relativeURI;
        };
        KFile.prototype.type = function () {
            return this._file.type;
        };
        //methods
        KFile.prototype.changePath = function (path) {
            return this._file.changePath(path);
        };
        KFile.prototype.close = function () {
            return this._file.close();
        };
        KFile.prototype.copy = function (target) {
            return this._file.copy(target);
        };
        KFile.prototype.createAlias = function (path) {
            return this._file.createAlias(path);
        };
        KFile.prototype.execute = function () {
            return this._file.execute();
        };
        KFile.prototype.getRelativeURI = function (basePath) {
            return this._file.getRelativeURI(basePath);
        };
        KFile.prototype.open = function (mode, type, creator) {
            return this._file.open(mode, type, creator);
        };
        KFile.prototype.openDlg = function (prompt_, filter, multiSelect) {
            var file = this._file.openDlg(prompt_, filter, multiSelect);
            if (file === null) {
                return null;
            }
            else if (file instanceof File) {
                return new KFile(file);
            }
            else {
                return new KIKAKU.KArray(file).map(function (file) { return new KFile(file); });
            }
        };
        KFile.prototype.read = function (chars) {
            return this._file.read(chars);
        };
        KFile.prototype.readch = function () {
            return this._file.readch();
        };
        KFile.prototype.readln = function () {
            return this._file.readln();
        };
        KFile.prototype.remove = function () {
            return this._file.remove();
        };
        KFile.prototype.rename = function (newName) {
            return this._file.rename(newName);
        };
        KFile.prototype.resolve = function () {
            return this._file.resolve();
        };
        KFile.prototype.saveDlg = function (prompt_, preset) {
            var file = this._file.saveDlg(prompt_, preset);
            if (file === null) {
                return null;
            }
            return new KFile(file);
        };
        KFile.prototype.seek = function (pos, mode) {
            return this._file.seek(pos, mode);
        };
        KFile.prototype.tell = function () {
            return this._file.tell();
        };
        KFile.prototype.write = function (text) {
            var texts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                texts[_i - 1] = arguments[_i];
            }
            return (_a = this._file).write.apply(_a, [text].concat(texts));
            var _a;
        };
        KFile.prototype.writeln = function (text) {
            var texts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                texts[_i - 1] = arguments[_i];
            }
            return (_a = this._file).writeln.apply(_a, [text].concat(texts));
            var _a;
        };
        return KFile;
    }());
    KIKAKU.KFile = KFile;
    var KFolder = (function () {
        function KFolder(folder) {
            if (folder instanceof Folder) {
                this._folder = folder;
            }
            else {
                this._folder = new Folder(folder);
            }
        }
        KFolder.prototype.get = function () {
            return this._folder;
        };
        //static
        KFolder.appData = function () {
            return new KFolder(Folder.appData);
        };
        KFolder.appPackage = function () {
            return new KFolder(Folder.appPackage);
        };
        KFolder.commonFiles = function () {
            return new KFolder(Folder.commonFiles);
        };
        KFolder.current = function () {
            return new KFolder(Folder.current);
        };
        KFolder.desktop = function () {
            return new KFolder(Folder.desktop);
        };
        KFolder.fs = function () {
            return Folder.fs;
        };
        KFolder.myDocuments = function () {
            return new KFolder(Folder.myDocuments);
        };
        KFolder.startup = function () {
            return new KFolder(Folder.startup);
        };
        KFolder.system = function () {
            return new KFolder(Folder.system);
        };
        KFolder.temp = function () {
            return new KFolder(Folder.temp);
        };
        KFolder.trash = function () {
            return new KFolder(Folder.trash);
        };
        KFolder.userData = function () {
            return new KFolder(Folder.userData);
        };
        KFolder.decode = function (uri) {
            return File.decode(uri);
        };
        KFolder.encode = function (name) {
            return File.encode(name);
        };
        KFolder.selectDialog = function (prompt) {
            var file = Folder.selectDialog(prompt);
            if (file === null) {
                return null;
            }
            else if (file instanceof File) {
                return new KFile(file);
            }
            else {
                return new KFolder(file);
            }
        };
        //attributes
        KFolder.prototype.absoluteURI = function () {
            return this._folder.absoluteURI;
        };
        KFolder.prototype.alias = function () {
            return this._folder.alias;
        };
        KFolder.prototype.created = function () {
            return this._folder.created;
        };
        KFolder.prototype.displayName = function () {
            return this._folder.displayName;
        };
        KFolder.prototype.error = function () {
            return this._folder.error;
        };
        KFolder.prototype.exists = function () {
            return this._folder.exists;
        };
        KFolder.prototype.fsName = function () {
            return this._folder.fsName;
        };
        KFolder.prototype.fullName = function () {
            return this._folder.fullName;
        };
        KFolder.prototype.localizedName = function () {
            return this._folder.localizedName;
        };
        KFolder.prototype.modified = function () {
            return this._folder.modified;
        };
        KFolder.prototype.name = function () {
            return this._folder.name;
        };
        KFolder.prototype.parent = function () {
            return new KFolder(this._folder.parent);
        };
        KFolder.prototype.path = function () {
            return this._folder.path;
        };
        KFolder.prototype.relativeURI = function () {
            return this._folder.relativeURI;
        };
        //methods
        KFolder.prototype.changePath = function (path) {
            return this._folder.changePath(path);
        };
        KFolder.prototype.create = function () {
            return this._folder.create();
        };
        KFolder.prototype.execute = function () {
            return this._folder.execute();
        };
        KFolder.prototype.getFiles = function (mask) {
            var files = this._folder.getFiles(mask);
            if (files === null) {
                return new KIKAKU.KArray([]);
            }
            return new KIKAKU.KArray(files).map(function (file) {
                if (file instanceof File) {
                    return new KFile(file);
                }
                else {
                    return new KFolder(file);
                }
            });
        };
        KFolder.prototype.getRelativeURI = function (basePath) {
            return this._folder.getRelativeURI(basePath);
        };
        KFolder.prototype.remove = function () {
            return this._folder.remove();
        };
        KFolder.prototype.rename = function (newName) {
            return this._folder.rename(newName);
        };
        KFolder.prototype.resolve = function () {
            return new KFolder(this._folder.resolve());
        };
        KFolder.prototype.selectDlg = function (prompt_) {
            var file = this._folder.selectDlg(prompt_);
            if (file === null) {
                return null;
            }
            else if (file instanceof File) {
                return new KFile(file);
            }
            else {
                return new KFolder(file);
            }
        };
        return KFolder;
    }());
    KIKAKU.KFolder = KFolder;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var getProject = function () { return app.project; };
    var KProject = (function () {
        function KProject() {
        }
        KProject.prototype.get = function () {
            return getProject();
        };
        //attributes
        KProject.prototype.file = function () {
            return new KIKAKU.KFile(getProject().file);
        };
        KProject.prototype.rootFolder = function () {
            return new KIKAKU.KFolderItem(getProject().rootFolder);
        };
        KProject.prototype.items = function () {
            return new KIKAKU.KItemCollection(getProject().items);
        };
        KProject.prototype.activeItem = function () {
            return new KIKAKU.KItem(getProject().activeItem);
        };
        KProject.prototype.bitsPerChannel = function (bitsPerChannel) {
            if (bitsPerChannel !== void 0)
                getProject().bitsPerChannel = bitsPerChannel;
            return getProject().bitsPerChannel;
        };
        KProject.prototype.transparencyGridThumbnails = function (transparencyGridThumbnails) {
            if (transparencyGridThumbnails !== void 0)
                getProject().transparencyGridThumbnails = transparencyGridThumbnails;
            return getProject().transparencyGridThumbnails;
        };
        KProject.prototype.numItems = function () {
            return getProject().numItems;
        };
        KProject.prototype.selection = function () {
            return new KIKAKU.KArray(getProject().selection).map(function (item) { return new KIKAKU.KItem(item); });
        };
        KProject.prototype.renderQueue = function () {
            return getProject().renderQueue;
        };
        KProject.prototype.timeDisplayType = function (timeDisplayType) {
            if (timeDisplayType !== void 0)
                getProject().timeDisplayType = timeDisplayType;
            return getProject().timeDisplayType;
        };
        KProject.prototype.footageTimecodeDisplayStartType = function (footageTimecodeDisplayStartType) {
            if (footageTimecodeDisplayStartType !== void 0)
                getProject().footageTimecodeDisplayStartType = footageTimecodeDisplayStartType;
            return getProject().footageTimecodeDisplayStartType;
        };
        KProject.prototype.framesUseFeetFrames = function (framesUseFeetFrames) {
            if (framesUseFeetFrames !== void 0)
                getProject().framesUseFeetFrames = framesUseFeetFrames;
            return getProject().framesUseFeetFrames;
        };
        KProject.prototype.feetFramesFilmType = function (feetFramesFilmType) {
            if (feetFramesFilmType !== void 0)
                getProject().feetFramesFilmType = feetFramesFilmType;
            return getProject().feetFramesFilmType;
        };
        KProject.prototype.framesCountType = function (framesCountType) {
            if (framesCountType !== void 0)
                getProject().framesCountType = framesCountType;
            return getProject().framesCountType;
        };
        KProject.prototype.displayStartFrame = function (displayStartFrame) {
            if (displayStartFrame !== void 0)
                getProject().displayStartFrame = displayStartFrame;
            return getProject().displayStartFrame;
        };
        KProject.prototype.linearBlending = function (linearBlending) {
            if (linearBlending !== void 0)
                getProject().linearBlending = linearBlending;
            return getProject().linearBlending;
        };
        KProject.prototype.xmpPacket = function (xmpPacket) {
            if (xmpPacket !== void 0)
                getProject().xmpPacket = xmpPacket;
            return getProject().xmpPacket;
        };
        //methods
        KProject.prototype.item = function (index) {
            return new KIKAKU.KItem(getProject().item(index));
        };
        KProject.prototype.consolidateFootage = function () {
            return getProject().consolidateFootage();
        };
        KProject.prototype.removeUnusedFootage = function () {
            return getProject().removeUnusedFootage();
        };
        KProject.prototype.close = function (closeOptions) {
            return getProject().close(closeOptions);
        };
        KProject.prototype.save = function (file) {
            if (file === void 0) {
                return getProject().save();
            }
            else if (file instanceof KIKAKU.KFile) {
                return getProject().save(file.get());
            }
            else {
                return getProject().save(file);
            }
        };
        KProject.prototype.saveWithDialog = function () {
            return getProject().saveWithDialog();
        };
        KProject.prototype.importPlaceholder = function (name, width, height, frameRate, duration) {
            return getProject().importPlaceholder(name, width, height, frameRate, duration);
        };
        KProject.prototype.importFile = function (importOptions) {
            return new KIKAKU.KFootageItem(getProject().importFile(importOptions));
        };
        KProject.prototype.importFileWithDialog = function () {
            var items = getProject().importFileWithDialog() || [];
            return new KIKAKU.KArray(items).map(function (item) { return new KIKAKU.KItem(item); });
        };
        KProject.prototype.showWindow = function (doShow) {
            return getProject().showWindow(doShow);
        };
        KProject.prototype.autoFixExpressions = function (oldText, newText) {
            return getProject().autoFixExpressions(oldText, newText);
        };
        return KProject;
    }());
    KIKAKU.KProject = KProject;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var KFootageSource = (function () {
        //prototype
        function KFootageSource(_source) {
            this._source = _source;
        }
        //static
        KFootageSource.isValid = function (source) {
            if (source instanceof KFootageSource) {
                source = source.get();
            }
            return isValid(source) && (source instanceof FootageSource || source instanceof SolidSource || source instanceof PlaceholderSource || source instanceof FileSource);
        };
        KFootageSource.prototype.get = function () {
            return this._source;
        };
        KFootageSource.prototype.isValid = function () {
            return KFootageSource.isValid(this);
        };
        //cast
        KFootageSource.prototype.asSolid = function () {
            return new KSolidSource(this._source);
        };
        KFootageSource.prototype.ifSolid = function (fn) {
            if (KSolidSource.isValid(this)) {
                fn(this.asSolid());
            }
            return this;
        };
        KFootageSource.prototype.asPlaceholder = function () {
            return new KPlaceholderSource(this._source);
        };
        KFootageSource.prototype.ifPlaceholder = function (fn) {
            if (KPlaceholderSource.isValid(this)) {
                fn(this.asPlaceholder());
            }
            return this;
        };
        KFootageSource.prototype.asFile = function () {
            return new KFileSource(this._source);
        };
        KFootageSource.prototype.ifFile = function (fn) {
            if (KPlaceholderSource.isValid(this)) {
                fn(this.asFile());
            }
            return this;
        };
        //attributes
        KFootageSource.prototype.hasAlpha = function (hasAlpha) {
            if (hasAlpha !== void 0)
                this._source.hasAlpha = hasAlpha;
            return this._source.hasAlpha;
        };
        KFootageSource.prototype.alphaMode = function (alphaMode) {
            if (alphaMode !== void 0)
                this._source.alphaMode = alphaMode;
            return this._source.alphaMode;
        };
        KFootageSource.prototype.premulColor = function (premulColor) {
            if (premulColor !== void 0)
                this._source.premulColor = premulColor;
            return this._source.premulColor;
        };
        KFootageSource.prototype.invertAlpha = function (invertAlpha) {
            if (invertAlpha !== void 0)
                this._source.invertAlpha = invertAlpha;
            return this._source.invertAlpha;
        };
        KFootageSource.prototype.isStill = function () {
            return this._source.isStill;
        };
        KFootageSource.prototype.fieldSeparationType = function (fieldSeparationType) {
            if (fieldSeparationType !== void 0)
                this._source.fieldSeparationType = fieldSeparationType;
            return this._source.fieldSeparationType;
        };
        KFootageSource.prototype.highQualityFieldSeparation = function (highQualityFieldSeparation) {
            if (highQualityFieldSeparation !== void 0)
                this._source.highQualityFieldSeparation = highQualityFieldSeparation;
            return this._source.highQualityFieldSeparation;
        };
        KFootageSource.prototype.removePulldown = function (removePulldown) {
            if (removePulldown !== void 0)
                this._source.removePulldown = removePulldown;
            return this._source.removePulldown;
        };
        KFootageSource.prototype.loop = function (loop) {
            if (loop !== void 0)
                this._source.loop = loop;
            return this._source.loop;
        };
        KFootageSource.prototype.nativeFrameRate = function (nativeFrameRate) {
            if (nativeFrameRate !== void 0)
                this._source.nativeFrameRate = nativeFrameRate;
            return this._source.nativeFrameRate;
        };
        KFootageSource.prototype.displayFrameRate = function () {
            return this._source.displayFrameRate;
        };
        KFootageSource.prototype.conformFrameRate = function (conformFrameRate) {
            if (conformFrameRate !== void 0)
                this._source.conformFrameRate = conformFrameRate;
            return this._source.conformFrameRate;
        };
        //methods
        KFootageSource.prototype.guessAlphaMode = function () {
            this._source.guessAlphaMode();
        };
        KFootageSource.prototype.guessPulldown = function (method) {
            this._source.guessPulldown(method);
        };
        return KFootageSource;
    }());
    KIKAKU.KFootageSource = KFootageSource;
    var KSolidSource = (function (_super) {
        __extends(KSolidSource, _super);
        function KSolidSource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KSolidSource.isValid = function (source) {
            if (source instanceof KFootageSource) {
                source = source.get();
            }
            return isValid(source) && source instanceof SolidSource;
        };
        //prototype
        KSolidSource.prototype.isValid = function () {
            return KSolidSource.isValid(this);
        };
        //attributes
        KSolidSource.prototype.color = function (color) {
            if (color !== void 0)
                this._source.color = color;
            return this._source.color;
        };
        return KSolidSource;
    }(KFootageSource));
    KIKAKU.KSolidSource = KSolidSource;
    var KPlaceholderSource = (function (_super) {
        __extends(KPlaceholderSource, _super);
        function KPlaceholderSource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KPlaceholderSource.isValid = function (source) {
            if (source instanceof KFootageSource) {
                source = source.get();
            }
            return isValid(source) && source instanceof PlaceholderSource;
        };
        //prototype
        KPlaceholderSource.prototype.isValid = function () {
            return KPlaceholderSource.isValid(this);
        };
        return KPlaceholderSource;
    }(KFootageSource));
    KIKAKU.KPlaceholderSource = KPlaceholderSource;
    var KFileSource = (function (_super) {
        __extends(KFileSource, _super);
        function KFileSource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KFileSource.isValid = function (source) {
            if (source instanceof KFootageSource) {
                source = source.get();
            }
            return isValid(source) && source instanceof FileSource;
        };
        //prototype
        KFileSource.prototype.isValid = function () {
            return KFileSource.isValid(this);
        };
        //attributes
        KFileSource.prototype.file = function () {
            return new KIKAKU.KFile(this._source.file);
        };
        KFileSource.prototype.missingFootagePath = function () {
            return this._source.missingFootagePath;
        };
        //methods
        KFileSource.prototype.reload = function () {
            return this._source.reload();
        };
        return KFileSource;
    }(KFootageSource));
    KIKAKU.KFileSource = KFileSource;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var KItemCollection = (function () {
        function KItemCollection(_items) {
            this._items = _items;
        }
        KItemCollection.prototype.length = function () {
            return this._items.length;
        };
        //utility
        KItemCollection.prototype.forEach = function (fn) {
            var items = this._items;
            for (var i = 1, l = items.length; i <= l; i++) {
                fn(new KItem(items[i]), i);
            }
        };
        //methods
        KItemCollection.prototype.at = function (index) {
            return new KItem(this._items[index]);
        };
        KItemCollection.prototype.addComp = function (name, width, height, pixelAspect, duration, frameRate) {
            return new KCompItem(this._items.addComp(name, width, height, pixelAspect, duration, frameRate));
        };
        KItemCollection.prototype.addFolder = function (name) {
            return new KFolderItem(this._items.addFolder(name));
        };
        return KItemCollection;
    }());
    KIKAKU.KItemCollection = KItemCollection;
    var KItem = (function () {
        //prototype
        function KItem(_item) {
            this._item = _item;
        }
        //static
        KItem.isValid = function (item) {
            if (item instanceof KItem) {
                item = item.get();
            }
            return isValid(item) && (item instanceof FolderItem || item instanceof FootageItem || item instanceof CompItem);
        };
        KItem.prototype.get = function () {
            return this._item;
        };
        KItem.prototype.isValid = function () {
            return KItem.isValid(this);
        };
        //cast
        KItem.prototype.asFolder = function () {
            return new KFolderItem(this._item);
        };
        KItem.prototype.ifFolder = function (fn) {
            if (KFolderItem.isValid(this)) {
                fn(this.asFolder());
            }
            return this;
        };
        KItem.prototype.asAV = function () {
            return new KAVItem(this._item);
        };
        KItem.prototype.ifAV = function (fn) {
            if (KAVItem.isValid(this)) {
                fn(this.asAV());
            }
            return this;
        };
        KItem.prototype.asComp = function () {
            return new KCompItem(this._item);
        };
        KItem.prototype.ifComp = function (fn) {
            if (KCompItem.isValid(this)) {
                fn(this.asComp());
            }
            return this;
        };
        KItem.prototype.asFootage = function () {
            return new KFootageItem(this._item);
        };
        KItem.prototype.ifFootage = function (fn) {
            if (KFootageItem.isValid(this)) {
                fn(this.asFootage());
            }
            return this;
        };
        //attributes
        KItem.prototype.name = function (name) {
            if (name !== void 0)
                this._item.name = name;
            return this._item.name;
        };
        KItem.prototype.comment = function (comment) {
            if (comment !== void 0)
                this._item.comment = comment;
            return this._item.comment;
        };
        KItem.prototype.id = function () {
            return this._item.id;
        };
        KItem.prototype.parentFolder = function (parent) {
            if (parent !== void 0) {
                var parent_item = parent instanceof KFolderItem ? parent.get() : parent;
                this._item.parentFolder = parent_item;
            }
            return new KFolderItem(this._item.parentFolder);
        };
        KItem.prototype.selected = function (selected) {
            if (selected !== void 0)
                this._item.selected = selected;
            return this._item.selected;
        };
        KItem.prototype.typeName = function () {
            return this._item.typeName;
        };
        KItem.prototype.label = function (label) {
            if (label !== void 0)
                this._item.label = label;
            return this._item.label;
        };
        //methods
        KItem.prototype.remove = function () {
            this._item.remove();
        };
        return KItem;
    }());
    KIKAKU.KItem = KItem;
    var KFolderItem = (function (_super) {
        __extends(KFolderItem, _super);
        function KFolderItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KFolderItem.isValid = function (item) {
            if (item instanceof KItem) {
                item = item.get();
            }
            return isValid(item) && item instanceof FolderItem;
        };
        //prototype
        KFolderItem.prototype.isValid = function () {
            return KItem.isValid(this);
        };
        //attributes
        KFolderItem.prototype.items = function () {
            return new KItemCollection(this._item.items);
        };
        KFolderItem.prototype.numItems = function () {
            return this._item.numItems;
        };
        //methods
        KFolderItem.prototype.item = function (index) {
            return new KItem(this._item.item(index));
        };
        //custom methods
        KFolderItem.prototype.forEach = function (fn) {
            var item = this._item;
            var item_num = item.numItems;
            for (var i = 1; i <= item_num; ++i) {
                fn(new KItem(item.item(i)), i);
            }
        };
        return KFolderItem;
    }(KItem));
    KIKAKU.KFolderItem = KFolderItem;
    var KAVItem = (function (_super) {
        __extends(KAVItem, _super);
        function KAVItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KAVItem.isValid = function (item) {
            if (item instanceof KItem) {
                item = item.get();
            }
            return isValid(item) && (item instanceof FootageItem || item instanceof CompItem);
        };
        //prototype
        KAVItem.prototype.isValid = function () {
            return KAVItem.isValid(this);
        };
        //attributes
        KAVItem.prototype.width = function (width) {
            if (width !== void 0)
                this._item.width = width;
            return this._item.width;
        };
        KAVItem.prototype.height = function (height) {
            if (height !== void 0)
                this._item.height = height;
            return this._item.height;
        };
        KAVItem.prototype.pixelAspect = function (pixelAspect) {
            if (pixelAspect !== void 0)
                this._item.pixelAspect = pixelAspect;
            return this._item.pixelAspect;
        };
        KAVItem.prototype.frameRate = function (frameRate) {
            if (frameRate !== void 0)
                this._item.frameRate = frameRate;
            return this._item.frameRate;
        };
        KAVItem.prototype.frameDuration = function (frameDuration) {
            if (frameDuration !== void 0)
                this._item.frameDuration = frameDuration;
            return this._item.frameDuration;
        };
        KAVItem.prototype.duration = function (duration) {
            if (duration !== void 0)
                this._item.duration = duration;
            return this._item.duration;
        };
        KAVItem.prototype.useProxy = function (useProxy) {
            if (useProxy !== void 0)
                this._item.useProxy = useProxy;
            return this._item.useProxy;
        };
        KAVItem.prototype.proxySource = function () {
            return new KIKAKU.KFootageSource(this._item.proxySource);
        };
        KAVItem.prototype.time = function (time) {
            if (time !== void 0)
                this._item.time = time;
            return this._item.time;
        };
        KAVItem.prototype.usedIn = function () {
            return this._item.usedIn;
        };
        KAVItem.prototype.hasVideo = function () {
            return this._item.hasVideo;
        };
        KAVItem.prototype.hasAudio = function () {
            return this._item.hasAudio;
        };
        KAVItem.prototype.footageMissing = function () {
            return this._item.footageMissing;
        };
        KAVItem.prototype.setProxy = function (file) {
            if (file instanceof KIKAKU.KFile) {
                this._item.setProxy(file.get());
            }
            else {
                this._item.setProxy(file);
            }
        };
        KAVItem.prototype.setProxyWithSequence = function (file, forceAlphabetical) {
            if (file instanceof KIKAKU.KFile) {
                this._item.setProxyWithSequence(file.get(), forceAlphabetical);
            }
            else {
                this._item.setProxyWithSequence(file, forceAlphabetical);
            }
        };
        KAVItem.prototype.setProxyWithSolid = function (color, name, width, height, pixelAspect) {
            this._item.setProxyWithSolid(color, name, width, height, pixelAspect);
        };
        KAVItem.prototype.setProxyWithPlaceholder = function (name, width, height, frameRate, duration) {
            this._item.setProxyWithPlaceholder(name, width, height, frameRate, duration);
        };
        KAVItem.prototype.setProxyToNone = function () {
            this._item.setProxyToNone();
        };
        return KAVItem;
    }(KItem));
    KIKAKU.KAVItem = KAVItem;
    var KCompItem = (function (_super) {
        __extends(KCompItem, _super);
        function KCompItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KCompItem.isValid = function (item) {
            if (item instanceof KItem) {
                item = item.get();
            }
            return isValid(item) && item instanceof CompItem;
        };
        //prototype
        KCompItem.prototype.isValid = function () {
            return KCompItem.isValid(this);
        };
        //attributes
        KCompItem.prototype.dropFrame = function (dropFrame) {
            if (dropFrame !== void 0)
                this._item.dropFrame = dropFrame;
            return this._item.dropFrame;
        };
        KCompItem.prototype.workAreaStart = function (workAreaStart) {
            if (workAreaStart !== void 0)
                this._item.workAreaStart = workAreaStart;
            return this._item.workAreaStart;
        };
        KCompItem.prototype.workAreaDuration = function (workAreaDuration) {
            if (workAreaDuration !== void 0)
                this._item.workAreaDuration = workAreaDuration;
            return this._item.workAreaDuration;
        };
        KCompItem.prototype.numLayers = function () {
            return this._item.numLayers;
        };
        KCompItem.prototype.hideShyLayers = function (hideShyLayers) {
            if (hideShyLayers !== void 0)
                this._item.hideShyLayers = hideShyLayers;
            return this._item.hideShyLayers;
        };
        KCompItem.prototype.motionBlur = function (motionBlur) {
            if (motionBlur !== void 0)
                this._item.motionBlur = motionBlur;
            return this._item.motionBlur;
        };
        KCompItem.prototype.draft3d = function (draft3d) {
            if (draft3d !== void 0)
                this._item.draft3d = draft3d;
            return this._item.draft3d;
        };
        KCompItem.prototype.frameBlending = function (frameBlending) {
            if (frameBlending !== void 0)
                this._item.frameBlending = frameBlending;
            return this._item.frameBlending;
        };
        KCompItem.prototype.preserveNestedFrameRate = function (preserveNestedFrameRate) {
            if (preserveNestedFrameRate !== void 0)
                this._item.preserveNestedFrameRate = preserveNestedFrameRate;
            return this._item.preserveNestedFrameRate;
        };
        KCompItem.prototype.preserveNestedResolution = function (preserveNestedResolution) {
            if (preserveNestedResolution !== void 0)
                this._item.preserveNestedResolution = preserveNestedResolution;
            return this._item.preserveNestedResolution;
        };
        KCompItem.prototype.bgColor = function (bgColor) {
            if (bgColor !== void 0)
                this._item.bgColor = bgColor;
            return this._item.bgColor;
        };
        KCompItem.prototype.activeCamera = function () {
            return new KIKAKU.KCameraLayer(this._item.activeCamera);
        };
        KCompItem.prototype.displayStartTime = function (displayStartTime) {
            if (displayStartTime !== void 0)
                this._item.displayStartTime = displayStartTime;
            return this._item.displayStartTime;
        };
        KCompItem.prototype.resolutionFactor = function (resolutionFactor) {
            if (resolutionFactor !== void 0)
                this._item.resolutionFactor = resolutionFactor;
            return this._item.resolutionFactor;
        };
        KCompItem.prototype.shutterAngle = function (shutterAngle) {
            if (shutterAngle !== void 0)
                this._item.shutterAngle = shutterAngle;
            return this._item.shutterAngle;
        };
        KCompItem.prototype.shutterPhase = function (shutterPhase) {
            if (shutterPhase !== void 0)
                this._item.shutterPhase = shutterPhase;
            return this._item.shutterPhase;
        };
        KCompItem.prototype.motionBlurSamplesPerFrame = function (motionBlurSamplesPerFrame) {
            if (motionBlurSamplesPerFrame !== void 0)
                this._item.motionBlurSamplesPerFrame = motionBlurSamplesPerFrame;
            return this._item.motionBlurSamplesPerFrame;
        };
        KCompItem.prototype.motionBlurAdaptiveSampleLimit = function (motionBlurAdaptiveSampleLimit) {
            if (motionBlurAdaptiveSampleLimit !== void 0)
                this._item.motionBlurAdaptiveSampleLimit = motionBlurAdaptiveSampleLimit;
            return this._item.motionBlurAdaptiveSampleLimit;
        };
        KCompItem.prototype.layers = function () {
            return new KIKAKU.KLayerCollection(this._item.layers);
        };
        KCompItem.prototype.selectedLayers = function () {
            return new KIKAKU.KArray(this._item.selectedLayers.slice()).map(function (layer) { return new KIKAKU.KLayer(layer); });
        };
        KCompItem.prototype.selectedProperties = function () {
            return this._item.selectedProperties;
        };
        KCompItem.prototype.renderer = function (renderer) {
            if (renderer !== void 0)
                this._item.renderer = renderer;
            return this._item.renderer;
        };
        KCompItem.prototype.renderers = function () {
            return new KIKAKU.KArray(this._item.renderers);
        };
        //methods
        KCompItem.prototype.duplicate = function () {
            return new KCompItem(this._item.duplicate());
        };
        KCompItem.prototype.layer = function (index_or_name) {
            return new KIKAKU.KLayer(this._item.layer(index_or_name));
        };
        KCompItem.prototype.openInViewer = function () {
            return this._item.openInViewer();
        };
        KCompItem.prototype.saveFrameToPng = function (time, file) {
            this._item.saveFrameToPng(time, file instanceof KIKAKU.KFile ? file.get() : file);
        };
        //custom methods
        KCompItem.prototype.forEach = function (fn) {
            var item = this._item;
            var layer_num = item.numLayers;
            for (var i = 1; i <= layer_num; ++i) {
                fn(new KIKAKU.KLayer(item.layer(i)), i);
            }
        };
        return KCompItem;
    }(KAVItem));
    KIKAKU.KCompItem = KCompItem;
    var KFootageItem = (function (_super) {
        __extends(KFootageItem, _super);
        function KFootageItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KFootageItem.isValid = function (item) {
            if (item instanceof KItem) {
                item = item.get();
            }
            return isValid(item) && item instanceof FootageItem;
        };
        //prototype
        KFootageItem.prototype.isValid = function () {
            return KFootageItem.isValid(this);
        };
        //attributes
        KFootageItem.prototype.file = function () {
            return new KIKAKU.KFile(this._item.file);
        };
        KFootageItem.prototype.mainSource = function () {
            return new KIKAKU.KFootageSource(this._item.mainSource);
        };
        //methods
        KFootageItem.prototype.replace = function (file) {
            if (file instanceof KIKAKU.KFile) {
                this._item.replace(file.get());
            }
            else {
                this._item.replace(file);
            }
        };
        KFootageItem.prototype.replaceWithSequence = function (file, forceAlphabetical) {
            if (file instanceof KIKAKU.KFile) {
                this._item.replaceWithSequence(file.get(), forceAlphabetical);
            }
            else {
                this._item.replaceWithSequence(file, forceAlphabetical);
            }
        };
        KFootageItem.prototype.replaceWithPlaceholder = function (name, width, height, frameRate, duration) {
            this._item.replaceWithPlaceholder(name, width, height, frameRate, duration);
        };
        KFootageItem.prototype.replaceWithSolid = function (color, name, width, height, pixelAspect) {
            this._item.replaceWithSolid(color, name, width, height, pixelAspect);
        };
        KFootageItem.prototype.openInViewer = function () {
            return this._item.openInViewer();
        };
        return KFootageItem;
    }(KAVItem));
    KIKAKU.KFootageItem = KFootageItem;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var KLayerCollection = (function () {
        function KLayerCollection(_layers) {
            this._layers = _layers;
        }
        KLayerCollection.prototype.length = function () {
            return this._layers.length;
        };
        KLayerCollection.prototype.at = function (index) {
            return new KLayer(this._layers[index]);
        };
        //utility
        KLayerCollection.prototype.forEach = function (fn) {
            var layers = this._layers;
            for (var i = 1, l = layers.length; i <= l; i++) {
                fn(new KLayer(layers[i]), i);
            }
        };
        //methods
        KLayerCollection.prototype.add = function (item, duration) {
            var av_item = item instanceof KIKAKU.KAVItem ? item.get() : item;
            if (duration !== void 0) {
                return new KAVLayer(this._layers.add(av_item, duration));
            }
            return new KAVLayer(this._layers.add(av_item));
        };
        KLayerCollection.prototype.addNull = function (duration) {
            if (duration !== void 0) {
                return new KAVLayer(this._layers.addNull(duration));
            }
            return new KAVLayer(this._layers.addNull());
        };
        KLayerCollection.prototype.addSolid = function (color, name, width, height, pixelAspect, duration) {
            if (duration !== void 0) {
                return new KAVLayer(this._layers.addSolid(color, name, width, height, pixelAspect, duration));
            }
            return new KAVLayer(this._layers.addSolid(color, name, width, height, pixelAspect));
        };
        KLayerCollection.prototype.addText = function (sourceText) {
            if (sourceText !== void 0) {
                return new KTextLayer(this._layers.addText(sourceText));
            }
            return new KTextLayer(this._layers.addText());
        };
        KLayerCollection.prototype.addBoxText = function (size, sourceText) {
            if (sourceText !== void 0) {
                return new KTextLayer(this._layers.addBoxText(size, sourceText));
            }
            return new KTextLayer(this._layers.addBoxText(size));
        };
        KLayerCollection.prototype.addCamera = function (name, centerPoint) {
            return new KCameraLayer(this._layers.addCamera(name, centerPoint));
        };
        KLayerCollection.prototype.addLight = function (name, centerPoint) {
            return new KLightLayer(this._layers.addLight(name, centerPoint));
        };
        KLayerCollection.prototype.addShape = function (name) {
            var shape_layer = this._layers.addShape();
            if (name !== void 0)
                shape_layer.name = name;
            return new KShapeLayer(shape_layer);
        };
        KLayerCollection.prototype.byName = function (name) {
            return new KLayer(this._layers.byName(name));
        };
        KLayerCollection.prototype.precompose = function (layerIndices, name, moveAllAttributes) {
            if (moveAllAttributes === void 0) { moveAllAttributes = true; }
            return new KIKAKU.KCompItem(this._layers.precompose(layerIndices, name, moveAllAttributes));
        };
        return KLayerCollection;
    }());
    KIKAKU.KLayerCollection = KLayerCollection;
    var KLayer = (function () {
        //prototype
        function KLayer(_layer) {
            this._layer = _layer;
        }
        //static
        KLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && (layer instanceof CameraLayer || layer instanceof LightLayer || layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer);
        };
        KLayer.prototype.get = function () {
            return this._layer;
        };
        KLayer.prototype.isValid = function () {
            return KLayer.isValid(this);
        };
        //cast
        KLayer.prototype.asAV = function () {
            return new KAVLayer(this._layer);
        };
        KLayer.prototype.ifAV = function (fn) {
            if (KAVLayer.isValid(this)) {
                fn(this.asAV());
            }
            return this;
        };
        KLayer.prototype.ifAVBase = function (fn) {
            if (KAVLayer.isValid(this) && !(KShapeLayer.isValid(this) || KTextLayer.isValid(this))) {
                fn(this.asAV());
            }
            return this;
        };
        KLayer.prototype.asShape = function () {
            return new KShapeLayer(this._layer);
        };
        KLayer.prototype.ifShape = function (fn) {
            if (KShapeLayer.isValid(this)) {
                fn(this.asShape());
            }
            return this;
        };
        KLayer.prototype.asText = function () {
            return new KTextLayer(this._layer);
        };
        KLayer.prototype.ifText = function (fn) {
            if (KTextLayer.isValid(this)) {
                fn(this.asText());
            }
            return this;
        };
        KLayer.prototype.asLight = function () {
            return new KLightLayer(this._layer);
        };
        KLayer.prototype.ifLight = function (fn) {
            if (KLightLayer.isValid(this)) {
                fn(this.asLight());
            }
            return this;
        };
        KLayer.prototype.asCamera = function () {
            return new KCameraLayer(this._layer);
        };
        KLayer.prototype.ifCamera = function (fn) {
            if (KCameraLayer.isValid(this)) {
                fn(this.asCamera());
            }
            return this;
        };
        //properties
        KLayer.prototype.marker = function () {
            return new KIKAKU.KMarkerProperty(this._layer.marker);
        };
        KLayer.prototype.transform = function () {
            return new KIKAKU.KPropertyGroup(this._layer.transform);
        };
        KLayer.prototype.anchorPoint = function () {
            return new KIKAKU.KThreeDSpatialProperty(this._layer.transform.anchorPoint);
        };
        KLayer.prototype.position = function () {
            return new KIKAKU.KThreeDSpatialProperty(this._layer.transform.position);
        };
        KLayer.prototype.xPosition = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.xPosition);
        };
        KLayer.prototype.yPosition = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.yPosition);
        };
        KLayer.prototype.zPosition = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.zPosition);
        };
        KLayer.prototype.scale = function () {
            return new KIKAKU.KThreeDProperty(this._layer.transform.scale);
        };
        KLayer.prototype.orientation = function () {
            return new KIKAKU.KThreeDSpatialProperty(this._layer.transform.orientation);
        };
        KLayer.prototype.rotation = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.rotation);
        };
        KLayer.prototype.xRotation = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.xRotation);
        };
        KLayer.prototype.yRotation = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.yRotation);
        };
        KLayer.prototype.zRotation = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.zRotation);
        };
        KLayer.prototype.opacity = function () {
            return new KIKAKU.KOneDProperty(this._layer.transform.opacity);
        };
        //attributes
        KLayer.prototype.index = function () {
            return this._layer.index;
        };
        KLayer.prototype.name = function (name) {
            if (name !== void 0)
                this._layer.name = name;
            return this._layer.name;
        };
        KLayer.prototype.parent = function (parent) {
            if (parent !== void 0) {
                if (parent instanceof KLayer) {
                    this._layer.parent = parent.get();
                }
                else {
                    this._layer.parent = parent;
                }
            }
            return this._layer.parent;
        };
        KLayer.prototype.time = function (time) {
            if (time !== void 0)
                this._layer.time = time;
            return this._layer.time;
        };
        KLayer.prototype.startTime = function (startTime) {
            if (startTime !== void 0)
                this._layer.startTime = startTime;
            return this._layer.startTime;
        };
        KLayer.prototype.stretch = function (stretch) {
            if (stretch !== void 0)
                this._layer.stretch = stretch;
            return this._layer.stretch;
        };
        KLayer.prototype.inPoint = function (inPoint) {
            if (inPoint !== void 0)
                this._layer.inPoint = inPoint;
            return this._layer.inPoint;
        };
        KLayer.prototype.outPoint = function (outPoint) {
            if (outPoint !== void 0)
                this._layer.outPoint = outPoint;
            return this._layer.outPoint;
        };
        KLayer.prototype.enabled = function (enabled) {
            if (enabled !== void 0)
                this._layer.enabled = enabled;
            return this._layer.enabled;
        };
        KLayer.prototype.solo = function (solo) {
            if (solo !== void 0)
                this._layer.solo = solo;
            return this._layer.solo;
        };
        KLayer.prototype.shy = function (shy) {
            if (shy !== void 0)
                this._layer.shy = shy;
            return this._layer.shy;
        };
        KLayer.prototype.locked = function (locked) {
            if (locked !== void 0)
                this._layer.locked = locked;
            return this._layer.locked;
        };
        KLayer.prototype.hasVideo = function () {
            return this._layer.hasVideo;
        };
        KLayer.prototype.active = function () {
            return this._layer.active;
        };
        KLayer.prototype.nullLayer = function () {
            return this._layer.nullLayer;
        };
        KLayer.prototype.selectedProperties = function () {
            return new KIKAKU.KArray(this._layer.selectedProperties.slice()).map(function (property) { return new KIKAKU.KPropertyBase(property); });
        };
        KLayer.prototype.comment = function (comment) {
            if (comment !== void 0)
                this._layer.comment = comment;
            return this._layer.comment;
        };
        KLayer.prototype.containingComp = function () {
            return new KIKAKU.KCompItem(this._layer.containingComp);
        };
        KLayer.prototype.isNameSet = function () {
            return this._layer.isNameSet;
        };
        KLayer.prototype.matchName = function () {
            return this._layer.matchName;
        };
        KLayer.prototype.propertyDepth = function () {
            return this._layer.propertyDepth;
        };
        KLayer.prototype.propertyType = function () {
            return this._layer.propertyType;
        };
        KLayer.prototype.selected = function (selected) {
            if (selected !== void 0)
                this._layer.selected = selected;
            return this._layer.selected;
        };
        KLayer.prototype.numProperties = function () {
            return this._layer.numProperties;
        };
        //methods
        KLayer.prototype.remove = function () {
            this._layer.remove();
        };
        KLayer.prototype.moveToBeginning = function () {
            this._layer.moveToBeginning();
        };
        KLayer.prototype.moveToEnd = function () {
            this._layer.moveToEnd();
        };
        KLayer.prototype.moveAfter = function (layer) {
            if (layer instanceof KLayer) {
                this._layer.moveAfter(layer.get());
            }
            else {
                this._layer.moveAfter(layer);
            }
        };
        KLayer.prototype.moveBefore = function (layer) {
            if (layer instanceof KLayer) {
                this._layer.moveBefore(layer.get());
            }
            else {
                this._layer.moveBefore(layer);
            }
        };
        KLayer.prototype.duplicate = function () {
            return new KLayer(this._layer.duplicate());
        };
        KLayer.prototype.copyToComp = function (intoComp) {
            var comp = intoComp instanceof KIKAKU.KCompItem ? intoComp.get() : intoComp;
            this._layer.copyToComp(comp);
            return new KLayer(comp.layer(1));
        };
        KLayer.prototype.activeAtTime = function (time) {
            return this._layer.activeAtTime(time);
        };
        KLayer.prototype.setParentWithJump = function (newParent) {
            if (newParent !== void 0) {
                var parent = newParent instanceof KLayer ? newParent.get() : newParent;
                this._layer.setParentWithJump(parent);
            }
            else
                this._layer.setParentWithJump();
        };
        KLayer.prototype.applyPreset = function (presetName) {
            if (presetName instanceof KIKAKU.KFile) {
                this._layer.applyPreset(presetName.get());
            }
            else {
                this._layer.applyPreset(presetName);
            }
        };
        KLayer.prototype.property = function (index_or_string) {
            return new KIKAKU.KPropertyBase(this._layer.property(index_or_string));
        };
        //custom methods
        KLayer.prototype.forEach = function (fn) {
            var layer = this._layer;
            var property_num = layer.numProperties;
            for (var i = 1; i <= property_num; ++i) {
                fn(new KIKAKU.KPropertyBase(layer.property(i)), i);
            }
        };
        return KLayer;
    }());
    KIKAKU.KLayer = KLayer;
    var KAVLayer = (function (_super) {
        __extends(KAVLayer, _super);
        function KAVLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KAVLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && (layer instanceof AVLayer || layer instanceof ShapeLayer || layer instanceof TextLayer);
        };
        //prototype
        KAVLayer.prototype.isValid = function () {
            return KAVLayer.isValid(this);
        };
        //properties
        KAVLayer.prototype.timeRemap = function () {
            return new KIKAKU.KOneDProperty(this._layer.timeRemap);
        };
        KAVLayer.prototype.mask = function () {
            return new KIKAKU.KMaskParade(this._layer.mask);
        };
        KAVLayer.prototype.effect = function () {
            return new KIKAKU.KEffectParade(this._layer.effect);
        };
        KAVLayer.prototype.layerStyle = function () {
            return new KIKAKU.KLayerStyles(this._layer.layerStyle);
        };
        KAVLayer.prototype.geometryOption = function () {
            return new KIKAKU.KPropertyGroup(this._layer.geometryOption);
        };
        KAVLayer.prototype.materialOption = function () {
            return new KIKAKU.KMaterialOptions(this._layer.materialOption);
        };
        KAVLayer.prototype.audio = function () {
            return new KIKAKU.KPropertyGroup(this._layer.audio);
        };
        //attributes
        KAVLayer.prototype.source = function () {
            return new KIKAKU.KAVItem(this._layer.source);
        };
        KAVLayer.prototype.isNameFromSource = function () {
            return this._layer.isNameFromSource;
        };
        KAVLayer.prototype.height = function () {
            return this._layer.height;
        };
        KAVLayer.prototype.width = function () {
            return this._layer.width;
        };
        KAVLayer.prototype.audioEnabled = function (audioEnabled) {
            if (audioEnabled !== void 0)
                this._layer.audioEnabled = audioEnabled;
            return this._layer.audioEnabled;
        };
        KAVLayer.prototype.motionBlur = function (motionBlur) {
            if (motionBlur !== void 0)
                this._layer.motionBlur = motionBlur;
            return this._layer.motionBlur;
        };
        KAVLayer.prototype.effectsActive = function (effectsActive) {
            if (effectsActive !== void 0)
                this._layer.effectsActive = effectsActive;
            return this._layer.effectsActive;
        };
        KAVLayer.prototype.adjustmentLayer = function (adjustmentLayer) {
            if (adjustmentLayer !== void 0)
                this._layer.adjustmentLayer = adjustmentLayer;
            return this._layer.adjustmentLayer;
        };
        KAVLayer.prototype.guideLayer = function (guideLayer) {
            if (guideLayer !== void 0)
                this._layer.guideLayer = guideLayer;
            return this._layer.guideLayer;
        };
        KAVLayer.prototype.threeDLayer = function (threeDLayer) {
            if (threeDLayer !== void 0)
                this._layer.threeDLayer = threeDLayer;
            return this._layer.threeDLayer;
        };
        KAVLayer.prototype.threeDPerChar = function (threeDPerChar) {
            if (threeDPerChar !== void 0)
                this._layer.threeDPerChar = threeDPerChar;
            return this._layer.threeDPerChar;
        };
        KAVLayer.prototype.environmentLayer = function (environmentLayer) {
            if (environmentLayer !== void 0)
                this._layer.environmentLayer = environmentLayer;
            return this._layer.environmentLayer;
        };
        KAVLayer.prototype.canSetCollapseTransformation = function () {
            return this._layer.canSetCollapseTransformation;
        };
        KAVLayer.prototype.collapseTransformation = function (collapseTransformation) {
            if (collapseTransformation !== void 0)
                this._layer.collapseTransformation = collapseTransformation;
            return this._layer.collapseTransformation;
        };
        KAVLayer.prototype.frameBlending = function (frameBlending) {
            if (frameBlending !== void 0)
                this._layer.frameBlending = frameBlending;
            return this._layer.frameBlending;
        };
        KAVLayer.prototype.frameBlendingType = function (frameBlendingType) {
            if (frameBlendingType !== void 0)
                this._layer.frameBlendingType = frameBlendingType;
            return this._layer.frameBlendingType;
        };
        KAVLayer.prototype.canSetTimeRemapEnabled = function () {
            return this._layer.canSetTimeRemapEnabled;
        };
        KAVLayer.prototype.timeRemapEnabled = function (timeRemapEnabled) {
            if (timeRemapEnabled !== void 0)
                this._layer.timeRemapEnabled = timeRemapEnabled;
            return this._layer.timeRemapEnabled;
        };
        KAVLayer.prototype.hasAudio = function () {
            return this._layer.hasAudio;
        };
        KAVLayer.prototype.audioActive = function () {
            return this._layer.audioActive;
        };
        KAVLayer.prototype.blendingMode = function (blendingMode) {
            if (blendingMode !== void 0)
                this._layer.blendingMode = blendingMode;
            return this._layer.blendingMode;
        };
        KAVLayer.prototype.preserveTransparency = function (preserveTransparency) {
            if (preserveTransparency !== void 0)
                this._layer.preserveTransparency = preserveTransparency;
            return this._layer.preserveTransparency;
        };
        KAVLayer.prototype.trackMatteType = function (trackMatteType) {
            if (trackMatteType !== void 0)
                this._layer.trackMatteType = trackMatteType;
            return this._layer.trackMatteType;
        };
        KAVLayer.prototype.isTrackMatte = function () {
            return this._layer.isTrackMatte;
        };
        KAVLayer.prototype.hasTrackMatte = function () {
            return this._layer.hasTrackMatte;
        };
        KAVLayer.prototype.quality = function (quality) {
            if (quality !== void 0)
                this._layer.quality = quality;
            return this._layer.quality;
        };
        KAVLayer.prototype.autoOrient = function (autoOrient) {
            if (autoOrient !== void 0)
                this._layer.autoOrient = autoOrient;
            return this._layer.autoOrient;
        };
        KAVLayer.prototype.samplingQuality = function (samplingQuality) {
            if (samplingQuality !== void 0)
                this._layer.samplingQuality = samplingQuality;
            return this._layer.samplingQuality;
        };
        //methods
        KAVLayer.prototype.audioActiveAtTime = function (time) {
            return this._layer.audioActiveAtTime(time);
        };
        KAVLayer.prototype.calculateTransformFromPoints = function (pointTopLeft, pointTopRight, pointBottomRight) {
            return this._layer.calculateTransformFromPoints(pointTopLeft, pointTopRight, pointBottomRight);
        };
        KAVLayer.prototype.replaceSource = function (newSource, fixExpressions) {
            var source = newSource instanceof KIKAKU.KAVItem ? newSource.get() : newSource;
            this._layer.replaceSource(source, fixExpressions);
        };
        KAVLayer.prototype.sourceRectAtTime = function (timeT, extents) {
            return this._layer.sourceRectAtTime(timeT, extents);
        };
        KAVLayer.prototype.openInViewer = function () {
            return this._layer.openInViewer();
        };
        KAVLayer.prototype.sourcePointToComp = function (point) {
            return this._layer.sourcePointToComp(point);
        };
        KAVLayer.prototype.compPointToSource = function (point) {
            return this._layer.compPointToSource(point);
        };
        return KAVLayer;
    }(KLayer));
    KIKAKU.KAVLayer = KAVLayer;
    var KShapeLayer = (function (_super) {
        __extends(KShapeLayer, _super);
        function KShapeLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KShapeLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && layer instanceof ShapeLayer;
        };
        //prototype
        KShapeLayer.prototype.isValid = function () {
            return KShapeLayer.isValid(this);
        };
        //properties
        KShapeLayer.prototype.contents = function () {
            return new KIKAKU.KRootVectors(this._layer.property('ADBE Root Vectors Group'));
        };
        return KShapeLayer;
    }(KAVLayer));
    KIKAKU.KShapeLayer = KShapeLayer;
    var KTextLayer = (function (_super) {
        __extends(KTextLayer, _super);
        function KTextLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KTextLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && layer instanceof TextLayer;
        };
        //prototype
        KTextLayer.prototype.isValid = function () {
            return KTextLayer.isValid(this);
        };
        //properties
        KTextLayer.prototype.text = function () {
            return new KIKAKU.KTextProperties(this._layer.text);
        };
        KTextLayer.prototype.sourceText = function () {
            return new KIKAKU.KTextDocumentProperty(this._layer.text.sourceText);
        };
        return KTextLayer;
    }(KAVLayer));
    KIKAKU.KTextLayer = KTextLayer;
    var KCameraLayer = (function (_super) {
        __extends(KCameraLayer, _super);
        function KCameraLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KCameraLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && layer instanceof CameraLayer;
        };
        //prototype
        KCameraLayer.prototype.isValid = function () {
            return KCameraLayer.isValid(this);
        };
        //properties
        KCameraLayer.prototype.cameraOption = function () {
            return new KIKAKU.KCameraOptions(this._layer.cameraOption);
        };
        return KCameraLayer;
    }(KLayer));
    KIKAKU.KCameraLayer = KCameraLayer;
    var KLightLayer = (function (_super) {
        __extends(KLightLayer, _super);
        function KLightLayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KLightLayer.isValid = function (layer) {
            if (layer instanceof KLayer) {
                layer = layer.get();
            }
            return isValid(layer) && layer instanceof LightLayer;
        };
        //prototype
        KLightLayer.prototype.isValid = function () {
            return KLightLayer.isValid(this);
        };
        //properties
        KLightLayer.prototype.lightOption = function () {
            return new KIKAKU.KLightOptions(this._layer.lightOption);
        };
        return KLightLayer;
    }(KLayer));
    KIKAKU.KLightLayer = KLightLayer;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var KPropertyBase = (function () {
        function KPropertyBase(_prop, _parent) {
            if (_parent === void 0) { _parent = null; }
            this._prop = _prop;
            this._parent = _parent;
            this._name = this._prop.name;
            if (!this._parent) {
                var parent = this._prop.parentProperty;
                if (parent) {
                    this._parent = new KPropertyGroup(parent);
                }
            }
        }
        //static
        KPropertyBase.isValid = function (prop) {
            if (prop instanceof KPropertyBase) {
                prop = prop.get();
            }
            return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup || prop instanceof Property);
        };
        KPropertyBase.prototype.get = function () {
            return this._prop;
        };
        KPropertyBase.prototype.isValid = function () {
            return KPropertyBase.isValid(this);
        };
        KPropertyBase.prototype.validate = function () {
            if (!this.isValid()) {
                if (this._parent) {
                    this._parent.validate();
                    if (this._parent.isValid()) {
                        this._prop = this._parent.get().property(this._name);
                    }
                }
            }
        };
        //cast
        KPropertyBase.prototype.asPropertyGroup = function () {
            return new KPropertyGroup(this._prop, this._parent);
        };
        KPropertyBase.prototype.ifPropertyGroup = function (fn) {
            if (KPropertyGroup.isValid(this)) {
                fn(this.asPropertyGroup());
            }
            return this;
        };
        KPropertyBase.prototype.asMaskPropertyGroup = function () {
            return new KMaskPropertyGroup(this._prop, this._parent);
        };
        KPropertyBase.prototype.ifMaskPropertyGroup = function (fn) {
            if (KMaskPropertyGroup.isValid(this)) {
                fn(this.asMaskPropertyGroup());
            }
            return this;
        };
        KPropertyBase.prototype.asProperty = function () {
            return new KProperty(this._prop, this._parent);
        };
        KPropertyBase.prototype.ifProperty = function (fn) {
            if (KProperty.isValid(this)) {
                fn(this.asProperty());
            }
            return this;
        };
        //attributes
        KPropertyBase.prototype.name = function (name) {
            this.validate();
            if (name !== void 0)
                this._name = this._prop.name = name;
            return this._prop.name;
        };
        KPropertyBase.prototype.matchName = function () {
            this.validate();
            return this._prop.matchName;
        };
        KPropertyBase.prototype.propertyIndex = function () {
            this.validate();
            return this._prop.propertyIndex;
        };
        KPropertyBase.prototype.propertyDepth = function () {
            this.validate();
            return this._prop.propertyDepth;
        };
        KPropertyBase.prototype.propertyType = function () {
            this.validate();
            return this._prop.propertyType;
        };
        KPropertyBase.prototype.parentProperty = function () {
            this.validate();
            if (this._parent) {
                return this._parent;
            }
            return new KPropertyGroup(this._prop.parentProperty);
        };
        KPropertyBase.prototype.isModified = function () {
            this.validate();
            return this._prop.isModified;
        };
        KPropertyBase.prototype.canSetEnabled = function () {
            this.validate();
            return this._prop.canSetEnabled;
        };
        KPropertyBase.prototype.enabled = function (enabled) {
            this.validate();
            if (enabled !== void 0)
                this._prop.enabled = enabled;
            return this._prop.enabled;
        };
        KPropertyBase.prototype.active = function () {
            this.validate();
            return this._prop.active;
        };
        KPropertyBase.prototype.elided = function () {
            this.validate();
            return this._prop.elided;
        };
        KPropertyBase.prototype.isEffect = function () {
            this.validate();
            return this._prop.isEffect;
        };
        KPropertyBase.prototype.isMask = function () {
            this.validate();
            return this._prop.isMask;
        };
        KPropertyBase.prototype.selected = function (selected) {
            this.validate();
            if (selected !== void 0)
                this._prop.selected = selected;
            return this._prop.selected;
        };
        //custom attributes
        KPropertyBase.prototype.hidden = function () {
            var hidden = false;
            try {
                var prop = this._prop;
                var selected = prop.selected;
                prop.selected = selected;
            }
            catch (e) {
                hidden = true;
            }
            return hidden;
        };
        //methods
        KPropertyBase.prototype.propertyGroup = function (countUp) {
            if (countUp === void 0) { countUp = 1; }
            this.validate();
            return new KPropertyGroup(this._prop.propertyGroup(countUp));
        };
        KPropertyBase.prototype.remove = function () {
            this.validate();
            this._prop.remove();
        };
        KPropertyBase.prototype.moveTo = function (newIndex) {
            this.validate();
            this._prop.moveTo(newIndex);
        };
        KPropertyBase.prototype.duplicate = function () {
            this.validate();
            return new KPropertyBase(this._prop.duplicate());
        };
        return KPropertyBase;
    }());
    KIKAKU.KPropertyBase = KPropertyBase;
    var KPropertyGroup = (function (_super) {
        __extends(KPropertyGroup, _super);
        function KPropertyGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KPropertyGroup.isValid = function (prop) {
            if (prop instanceof KPropertyBase) {
                prop = prop.get();
            }
            return isValid(prop) && (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup);
        };
        //prototype
        KPropertyGroup.prototype.isValid = function () {
            return KPropertyGroup.isValid(this);
        };
        //attributes
        KPropertyGroup.prototype.numProperties = function () {
            this.validate();
            return this._prop.numProperties;
        };
        //methods
        KPropertyGroup.prototype.property = function (index_or_name) {
            this.validate();
            return new KPropertyBase(this._prop.property(index_or_name), this);
        };
        KPropertyGroup.prototype.propertyAsProperty = function (index_or_name) {
            this.validate();
            return new KProperty(this._prop.property(index_or_name), this);
        };
        KPropertyGroup.prototype.propertyAsPropertyGroup = function (index_or_name) {
            this.validate();
            return new KPropertyGroup(this._prop.property(index_or_name), this);
        };
        KPropertyGroup.prototype.canAddProperty = function (name) {
            this.validate();
            return this._prop.canAddProperty(name);
        };
        KPropertyGroup.prototype.addProperty = function (name) {
            this.validate();
            return new KPropertyBase(this._prop.addProperty(name));
        };
        KPropertyGroup.prototype.addPropertyAsProperty = function (name) {
            this.validate();
            return new KPropertyBase(this._prop.addProperty(name)).asProperty();
        };
        KPropertyGroup.prototype.addPropertyAsPropertyGroup = function (name) {
            this.validate();
            return new KPropertyBase(this._prop.addProperty(name)).asPropertyGroup();
        };
        //custom methods
        KPropertyGroup.prototype.forEach = function (fn) {
            var prop = this._prop;
            var property_num = prop.numProperties;
            for (var i = 1; i <= property_num; ++i) {
                fn(new KPropertyBase(prop.property(i)), i);
            }
        };
        return KPropertyGroup;
    }(KPropertyBase));
    KIKAKU.KPropertyGroup = KPropertyGroup;
    var KMaskPropertyGroup = (function (_super) {
        __extends(KMaskPropertyGroup, _super);
        function KMaskPropertyGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KMaskPropertyGroup.isValid = function (prop) {
            if (prop instanceof KPropertyBase) {
                prop = prop.get();
            }
            return isValid(prop) && prop instanceof MaskPropertyGroup;
        };
        //prototype
        KMaskPropertyGroup.prototype.isValid = function () {
            return KMaskPropertyGroup.isValid(this);
        };
        //properties
        KMaskPropertyGroup.prototype.maskPath = function () {
            this.validate();
            return new KShapeProperty(this._prop.property('ADBE Mask Shape'), this);
        };
        KMaskPropertyGroup.prototype.maskFeather = function () {
            this.validate();
            return new KTwoDProperty(this._prop.property('ADBE Mask Feather'), this);
        };
        KMaskPropertyGroup.prototype.maskOpacity = function () {
            this.validate();
            return new KOneDProperty(this._prop.property('ADBE Mask Opacity'), this);
        };
        KMaskPropertyGroup.prototype.maskExpansion = function () {
            this.validate();
            return new KOneDProperty(this._prop.property('ADBE Mask Offset'), this);
        };
        //attributes
        KMaskPropertyGroup.prototype.maskMode = function (maskMode) {
            this.validate();
            if (maskMode !== void 0)
                this._prop.maskMode = maskMode;
            return this._prop.maskMode;
        };
        KMaskPropertyGroup.prototype.inverted = function (inverted) {
            this.validate();
            if (inverted !== void 0)
                this._prop.inverted = inverted;
            return this._prop.inverted;
        };
        KMaskPropertyGroup.prototype.rotoBezier = function (rotoBezier) {
            this.validate();
            if (rotoBezier !== void 0)
                this._prop.rotoBezier = rotoBezier;
            return this._prop.rotoBezier;
        };
        KMaskPropertyGroup.prototype.maskMotionBlur = function (maskMotionBlur) {
            this.validate();
            if (maskMotionBlur !== void 0)
                this._prop.maskMotionBlur = maskMotionBlur;
            return this._prop.maskMotionBlur;
        };
        KMaskPropertyGroup.prototype.locked = function (locked) {
            this.validate();
            if (locked !== void 0)
                this._prop.locked = locked;
            return this._prop.locked;
        };
        KMaskPropertyGroup.prototype.color = function (color) {
            this.validate();
            if (color !== void 0)
                this._prop.color = color;
            return this._prop.color;
        };
        KMaskPropertyGroup.prototype.maskFeatherFalloff = function (maskFeatherFalloff) {
            this.validate();
            if (maskFeatherFalloff !== void 0)
                this._prop.maskFeatherFalloff = maskFeatherFalloff;
            return this._prop.maskFeatherFalloff;
        };
        return KMaskPropertyGroup;
    }(KPropertyGroup));
    KIKAKU.KMaskPropertyGroup = KMaskPropertyGroup;
    var KProperty = (function (_super) {
        __extends(KProperty, _super);
        function KProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //static
        KProperty.isValid = function (prop) {
            if (prop instanceof KPropertyBase) {
                prop = prop.get();
            }
            return isValid(prop) && prop instanceof Property;
        };
        //prototype
        KProperty.prototype.isValid = function () {
            return KProperty.isValid(this);
        };
        //cast
        KProperty.prototype.asNoValue = function () {
            return new KNoValueProperty(this._prop, this._parent);
        };
        KProperty.prototype.asThreeDSpatial = function () {
            return new KThreeDSpatialProperty(this._prop, this._parent);
        };
        KProperty.prototype.asThreeD = function () {
            return new KThreeDProperty(this._prop, this._parent);
        };
        KProperty.prototype.asTwoDSpatial = function () {
            return new KTwoDSpatialProperty(this._prop, this._parent);
        };
        KProperty.prototype.asTwoD = function () {
            return new KTwoDProperty(this._prop, this._parent);
        };
        KProperty.prototype.asOneD = function () {
            return new KOneDProperty(this._prop, this._parent);
        };
        KProperty.prototype.asColor = function () {
            return new KColorProperty(this._prop, this._parent);
        };
        KProperty.prototype.asCustomValue = function () {
            return new KCustomValueProperty(this._prop, this._parent);
        };
        KProperty.prototype.asMarker = function () {
            return new KMarkerProperty(this._prop, this._parent);
        };
        KProperty.prototype.asLayerIndex = function () {
            return new KLayerIndexProperty(this._prop, this._parent);
        };
        KProperty.prototype.asMaskIndex = function () {
            return new KMaskIndexProperty(this._prop, this._parent);
        };
        KProperty.prototype.asShape = function () {
            return new KShapeProperty(this._prop, this._parent);
        };
        KProperty.prototype.asTextDocument = function () {
            return new KTextDocumentProperty(this._prop, this._parent);
        };
        //attributes
        KProperty.prototype.propertyValueType = function () {
            return this._prop.propertyValueType;
        };
        KProperty.prototype.value = function () {
            return this._prop.value;
        };
        KProperty.prototype.hasMin = function () {
            return this._prop.hasMin;
        };
        KProperty.prototype.hasMax = function () {
            return this._prop.hasMax;
        };
        KProperty.prototype.minValue = function () {
            return this._prop.minValue;
        };
        KProperty.prototype.maxValue = function () {
            return this._prop.maxValue;
        };
        KProperty.prototype.isSpatial = function () {
            return this._prop.isSpatial;
        };
        KProperty.prototype.canVaryOverTime = function () {
            return this._prop.canVaryOverTime;
        };
        KProperty.prototype.isTimeVarying = function () {
            return this._prop.isTimeVarying;
        };
        KProperty.prototype.numKeys = function () {
            return this._prop.numKeys;
        };
        KProperty.prototype.unitsText = function () {
            return this._prop.unitsText;
        };
        KProperty.prototype.expression = function (expression) {
            if (expression !== void 0)
                this._prop.expression = expression;
            return this._prop.expression;
        };
        KProperty.prototype.canSetExpression = function () {
            return this._prop.canSetExpression;
        };
        KProperty.prototype.expressionEnabled = function (expressionEnabled) {
            if (expressionEnabled !== void 0)
                this._prop.expressionEnabled = expressionEnabled;
            return this._prop.expressionEnabled;
        };
        KProperty.prototype.expressionError = function () {
            return this._prop.expressionError;
        };
        KProperty.prototype.selectedKeys = function () {
            return new KIKAKU.KArray(this._prop.selectedKeys.slice());
        };
        KProperty.prototype.propertyIndex = function () {
            return this._prop.propertyIndex;
        };
        KProperty.prototype.dimensionsSeparated = function (dimensionsSeparated) {
            if (dimensionsSeparated !== void 0)
                this._prop.dimensionsSeparated = dimensionsSeparated;
            return this._prop.dimensionsSeparated;
        };
        KProperty.prototype.isSeparationFollower = function () {
            return this._prop.isSeparationFollower;
        };
        KProperty.prototype.isSeparationLeader = function () {
            return this._prop.isSeparationLeader;
        };
        KProperty.prototype.separationDimension = function () {
            return this._prop.separationDimension;
        };
        KProperty.prototype.separationLeader = function () {
            return this._prop.separationLeader;
        };
        //methods
        KProperty.prototype.valueAtTime = function (time, preExpression) {
            return this._prop.valueAtTime(time, preExpression);
        };
        KProperty.prototype.setValue = function (value) {
            this._prop.setValue(value);
        };
        KProperty.prototype.setValueAtTime = function (time, newValue) {
            this._prop.setValueAtTime(time, newValue);
        };
        KProperty.prototype.setValuesAtTimes = function (times, newValues) {
            this._prop.setValuesAtTimes(times, newValues);
        };
        KProperty.prototype.setValueAtKey = function (keyIndex, newValue) {
            this._prop.setValueAtKey(keyIndex, newValue);
        };
        KProperty.prototype.nearestKeyIndex = function (time) {
            return this._prop.nearestKeyIndex(time);
        };
        KProperty.prototype.keyTime = function (keyIndex_or_markerComment) {
            return this._prop.keyTime(keyIndex_or_markerComment);
        };
        KProperty.prototype.keyValue = function (keyIndex_or_markerComment) {
            return this._prop.keyValue(keyIndex_or_markerComment);
        };
        KProperty.prototype.addKey = function (time) {
            return this._prop.addKey(time);
        };
        KProperty.prototype.removeKey = function (keyIndex) {
            return this._prop.removeKey(keyIndex);
        };
        KProperty.prototype.isInterpolationTypeValid = function (type) {
            return this._prop.isInterpolationTypeValid(type);
        };
        KProperty.prototype.setInterpolationTypeAtKey = function (keyIndex, inType, outType) {
            this._prop.setInterpolationTypeAtKey(keyIndex, inType, outType);
        };
        KProperty.prototype.keyInInterpolationType = function (keyIndex) {
            return this._prop.keyInInterpolationType(keyIndex);
        };
        KProperty.prototype.keyOutInterpolationType = function (keyIndex) {
            return this._prop.keyOutInterpolationType(keyIndex);
        };
        KProperty.prototype.setSpatialTangentsAtKey = function (keyIndex, inTangent, outTangent) {
            this._prop.setSpatialTangentsAtKey(keyIndex, inTangent, outTangent);
        };
        KProperty.prototype.keyInSpatialTangent = function (keyIndex) {
            return this._prop.keyInSpatialTangent(keyIndex);
        };
        KProperty.prototype.keyOutSpatialTangent = function (keyIndex) {
            return this._prop.keyOutSpatialTangent(keyIndex);
        };
        KProperty.prototype.setTemporalEaseAtKey = function (keyIndex, inTemporalEase, outTemporalEase) {
            this._prop.setTemporalEaseAtKey(keyIndex, inTemporalEase, outTemporalEase);
        };
        KProperty.prototype.keyInTemporalEase = function (keyIndex) {
            return new KIKAKU.KArray(this._prop.keyInTemporalEase(keyIndex));
        };
        KProperty.prototype.keyOutTemporalEase = function (keyIndex) {
            return new KIKAKU.KArray(this._prop.keyOutTemporalEase(keyIndex));
        };
        KProperty.prototype.setTemporalContinuousAtKey = function (keyIndex, newVal) {
            this._prop.setTemporalContinuousAtKey(keyIndex, newVal);
        };
        KProperty.prototype.keyTemporalContinuous = function (keyIndex) {
            return this._prop.keyTemporalContinuous(keyIndex);
        };
        KProperty.prototype.setTemporalAutoBezierAtKey = function (keyIndex, newVal) {
            this._prop.setTemporalAutoBezierAtKey(keyIndex, newVal);
        };
        KProperty.prototype.keyTemporalAutoBezier = function (keyIndex) {
            return this._prop.keyTemporalAutoBezier(keyIndex);
        };
        KProperty.prototype.setSpatialContinuousAtKey = function (keyIndex, newVal) {
            this._prop.setSpatialContinuousAtKey(keyIndex, newVal);
        };
        KProperty.prototype.keySpatialContinuous = function (keyIndex) {
            return this._prop.keySpatialContinuous(keyIndex);
        };
        KProperty.prototype.setSpatialAutoBezierAtKey = function (keyIndex, newVal) {
            this._prop.setSpatialAutoBezierAtKey(keyIndex, newVal);
        };
        KProperty.prototype.keySpatialAutoBezier = function (keyIndex) {
            return this._prop.keySpatialAutoBezier(keyIndex);
        };
        KProperty.prototype.setRovingAtKey = function (keyIndex, newVal) {
            this._prop.setRovingAtKey(keyIndex, newVal);
        };
        KProperty.prototype.keyRoving = function (keyIndex) {
            return this._prop.keyRoving(keyIndex);
        };
        KProperty.prototype.setSelectedAtKey = function (keyIndex, onOff) {
            this._prop.setSelectedAtKey(keyIndex, onOff);
        };
        KProperty.prototype.keySelected = function (keyIndex) {
            return this._prop.keySelected(keyIndex);
        };
        KProperty.prototype.getSeparationFollower = function (dim) {
            return new KProperty(this._prop.getSeparationFollower(dim));
        };
        return KProperty;
    }(KPropertyBase));
    KIKAKU.KProperty = KProperty;
    var KNoValueProperty = (function (_super) {
        __extends(KNoValueProperty, _super);
        function KNoValueProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KNoValueProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.NO_VALUE;
        };
        return KNoValueProperty;
    }(KProperty));
    KIKAKU.KNoValueProperty = KNoValueProperty;
    var KThreeDSpatialProperty = (function (_super) {
        __extends(KThreeDSpatialProperty, _super);
        function KThreeDSpatialProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KThreeDSpatialProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL;
        };
        return KThreeDSpatialProperty;
    }(KProperty));
    KIKAKU.KThreeDSpatialProperty = KThreeDSpatialProperty;
    var KThreeDProperty = (function (_super) {
        __extends(KThreeDProperty, _super);
        function KThreeDProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KThreeDProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.ThreeD;
        };
        return KThreeDProperty;
    }(KProperty));
    KIKAKU.KThreeDProperty = KThreeDProperty;
    var KTwoDSpatialProperty = (function (_super) {
        __extends(KTwoDSpatialProperty, _super);
        function KTwoDSpatialProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTwoDSpatialProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.TwoD_SPATIAL;
        };
        return KTwoDSpatialProperty;
    }(KProperty));
    KIKAKU.KTwoDSpatialProperty = KTwoDSpatialProperty;
    var KTwoDProperty = (function (_super) {
        __extends(KTwoDProperty, _super);
        function KTwoDProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTwoDProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.TwoD;
        };
        return KTwoDProperty;
    }(KProperty));
    KIKAKU.KTwoDProperty = KTwoDProperty;
    var KOneDProperty = (function (_super) {
        __extends(KOneDProperty, _super);
        function KOneDProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KOneDProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.OneD;
        };
        return KOneDProperty;
    }(KProperty));
    KIKAKU.KOneDProperty = KOneDProperty;
    var KColorProperty = (function (_super) {
        __extends(KColorProperty, _super);
        function KColorProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KColorProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.OneD;
        };
        return KColorProperty;
    }(KProperty));
    KIKAKU.KColorProperty = KColorProperty;
    var KCustomValueProperty = (function (_super) {
        __extends(KCustomValueProperty, _super);
        function KCustomValueProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KCustomValueProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.CUSTOM_VALUE;
        };
        return KCustomValueProperty;
    }(KProperty));
    KIKAKU.KCustomValueProperty = KCustomValueProperty;
    var KMarkerProperty = (function (_super) {
        __extends(KMarkerProperty, _super);
        function KMarkerProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KMarkerProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.MARKER;
        };
        return KMarkerProperty;
    }(KProperty));
    KIKAKU.KMarkerProperty = KMarkerProperty;
    var KLayerIndexProperty = (function (_super) {
        __extends(KLayerIndexProperty, _super);
        function KLayerIndexProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerIndexProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.LAYER_INDEX;
        };
        return KLayerIndexProperty;
    }(KProperty));
    KIKAKU.KLayerIndexProperty = KLayerIndexProperty;
    var KMaskIndexProperty = (function (_super) {
        __extends(KMaskIndexProperty, _super);
        function KMaskIndexProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KMaskIndexProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.MASK_INDEX;
        };
        return KMaskIndexProperty;
    }(KProperty));
    KIKAKU.KMaskIndexProperty = KMaskIndexProperty;
    var KShapeProperty = (function (_super) {
        __extends(KShapeProperty, _super);
        function KShapeProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KShapeProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.SHAPE;
        };
        return KShapeProperty;
    }(KProperty));
    KIKAKU.KShapeProperty = KShapeProperty;
    var KTextDocumentProperty = (function (_super) {
        __extends(KTextDocumentProperty, _super);
        function KTextDocumentProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextDocumentProperty.prototype.isValid = function () {
            return _super.prototype.isValid.call(this) && this._prop.propertyValueType === PropertyValueType.TEXT_DOCUMENT;
        };
        return KTextDocumentProperty;
    }(KProperty));
    KIKAKU.KTextDocumentProperty = KTextDocumentProperty;
    /*
    * Mask Property
    */
    var KMaskParade = (function (_super) {
        __extends(KMaskParade, _super);
        function KMaskParade() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //methods
        KMaskParade.prototype.addMaskAtom = function (name) {
            var mask_atom = this._prop.addProperty('ADBE Mask Atom');
            if (name !== void 0)
                mask_atom.name = name;
            return new KMaskPropertyGroup(mask_atom, this);
        };
        return KMaskParade;
    }(KPropertyGroup));
    KIKAKU.KMaskParade = KMaskParade;
    /*
    * Effect Property
    */
    var KEffectParade = (function (_super) {
        __extends(KEffectParade, _super);
        function KEffectParade() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //override
        KEffectParade.prototype.addProperty = function (name_or_matchname) {
            var prop = this._prop.addProperty(name_or_matchname);
            return new KEffect(prop, this);
        };
        KEffectParade.prototype.addPropertyAsPropertyGroup = function (name) {
            return this.addProperty(name);
        };
        return KEffectParade;
    }(KPropertyGroup));
    KIKAKU.KEffectParade = KEffectParade;
    var KEffect = (function (_super) {
        __extends(KEffect, _super);
        function KEffect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //override
        KEffect.prototype.property = function (index_or_name) {
            this.validate();
            return new KProperty(this._prop.property(index_or_name), this);
        };
        return KEffect;
    }(KPropertyGroup));
    KIKAKU.KEffect = KEffect;
    /*
    * Layer Style Property
    */
    var KLayerStyles = (function (_super) {
        __extends(KLayerStyles, _super);
        function KLayerStyles(prop, parent) {
            if (parent === void 0) { parent = null; }
            var _this = _super.call(this, prop, parent) || this;
            var parent_property = prop;
            while (parent_property.parentProperty) {
                parent_property = parent_property.parentProperty;
            }
            _this._layer = parent_property;
            return _this;
        }
        //properties
        KLayerStyles.prototype.blendingOptions = function () {
            return new KLayerStylesBlendingOptions(this._prop.property('ADBE Blend Options Group'), this);
        };
        KLayerStyles.prototype.dropShadow = function () {
            return new KLayerStylesDropShadow(this._prop.property('dropShadow/enabled'), this);
        };
        KLayerStyles.prototype.innerShadow = function () {
            return new KLayerStylesInnerShadow(this._prop.property('innerShadow/enabled'), this);
        };
        KLayerStyles.prototype.outerGlow = function () {
            return new KLayerStylesOuterGlow(this._prop.property('outerGlow/enabled'), this);
        };
        KLayerStyles.prototype.innerGlow = function () {
            return new KLayerStylesInnerGlow(this._prop.property('innerGlow//enabled'), this);
        };
        KLayerStyles.prototype.bevelAndEmboss = function () {
            return new KLayerStylesBevelAndEmboss(this._prop.property('bevelEmboss/enabled'), this);
        };
        KLayerStyles.prototype.satin = function () {
            return new KLayerStylesSatin(this._prop.property('chromeFX/enabled'), this);
        };
        KLayerStyles.prototype.colorOverlay = function () {
            return new KLayerStylesColorOverlay(this._prop.property('solidFill/enabled'), this);
        };
        KLayerStyles.prototype.gradientOverlay = function () {
            return new KLayerStylesGradientOverlay(this._prop.property('gradientFill/enabled'), this);
        };
        KLayerStyles.prototype.stroke = function () {
            return new KLayerStylesStroke(this._prop.property('frameFX/enabled'), this);
        };
        //methods
        KLayerStyles.prototype.addDropShadow = function () {
            this.doCommand(9000);
            return this.dropShadow();
        };
        KLayerStyles.prototype.addInnerShadow = function () {
            this.doCommand(9001);
            return this.innerShadow();
        };
        KLayerStyles.prototype.addOuterGlow = function () {
            this.doCommand(9002);
            return this.outerGlow();
        };
        KLayerStyles.prototype.addInnerGlow = function () {
            this.doCommand(9003);
            return this.innerGlow();
        };
        KLayerStyles.prototype.addBevelAndEmboss = function () {
            this.doCommand(9004);
            return this.bevelAndEmboss();
        };
        KLayerStyles.prototype.addSatin = function () {
            this.doCommand(9005);
            return this.satin();
        };
        KLayerStyles.prototype.addColorOverlay = function () {
            this.doCommand(9006);
            return this.colorOverlay();
        };
        KLayerStyles.prototype.addGradientOverlay = function () {
            this.doCommand(9007);
            return this.gradientOverlay();
        };
        KLayerStyles.prototype.addStroke = function () {
            this.doCommand(9008);
            return this.stroke();
        };
        //utility methods
        KLayerStyles.prototype.doCommand = function (command_id) {
            var active_item = app.project.activeItem;
            var comp = this._layer.containingComp;
            if (comp !== active_item) {
                if (parseFloat(app.version) < 11 /* CS6 */) {
                    throw 'This method requires CS6 or later."';
                }
                comp.openInViewer();
            }
            var selected_layers = new KIKAKU.KArray(comp.selectedLayers.slice());
            try {
                selected_layers.forEach(function (layer) {
                    layer.selected = false;
                });
                this._layer.selected = true;
                app.executeCommand(command_id);
            }
            catch (e) {
                //pass
            }
            finally {
                this._layer.selected = false;
                selected_layers.forEach(function (layer) {
                    layer.selected = true;
                });
            }
        };
        return KLayerStyles;
    }(KPropertyGroup));
    KIKAKU.KLayerStyles = KLayerStyles;
    var KLayerStylesBlendingOptions = (function (_super) {
        __extends(KLayerStylesBlendingOptions, _super);
        function KLayerStylesBlendingOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesBlendingOptions.prototype.globalLightAngle = function () {
            return new KOneDProperty(this._prop.property('ADBE Global Angle2'), this);
        };
        KLayerStylesBlendingOptions.prototype.globalLightAltitude = function () {
            return new KOneDProperty(this._prop.property('ADBE Global Altitude2'), this);
        };
        KLayerStylesBlendingOptions.prototype.advancedBlending = function () {
            return new KLayerStylesAdvancedBlending(this._prop.property('ADBE Adv Blend Group'), this);
        };
        return KLayerStylesBlendingOptions;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesBlendingOptions = KLayerStylesBlendingOptions;
    var KLayerStylesAdvancedBlending = (function (_super) {
        __extends(KLayerStylesAdvancedBlending, _super);
        function KLayerStylesAdvancedBlending() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesAdvancedBlending.prototype.fillOpacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Layer Fill Opacity2'), this);
        };
        KLayerStylesAdvancedBlending.prototype.red = function () {
            return new KOneDProperty(this._prop.property('ADBE R Channel Blend'), this);
        };
        KLayerStylesAdvancedBlending.prototype.green = function () {
            return new KOneDProperty(this._prop.property('ADBE G Channel Blend'), this);
        };
        KLayerStylesAdvancedBlending.prototype.blue = function () {
            return new KOneDProperty(this._prop.property('ADBE B Channel Blend'), this);
        };
        KLayerStylesAdvancedBlending.prototype.blendInteriorStylesAsGroup = function () {
            return new KOneDProperty(this._prop.property('ADBE Blend Interior'), this);
        };
        KLayerStylesAdvancedBlending.prototype.useBlendRangesFromSource = function () {
            return new KOneDProperty(this._prop.property('ADBE Blend Ranges'), this);
        };
        return KLayerStylesAdvancedBlending;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesAdvancedBlending = KLayerStylesAdvancedBlending;
    var KLayerStylesDropShadow = (function (_super) {
        __extends(KLayerStylesDropShadow, _super);
        function KLayerStylesDropShadow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesDropShadow.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('dropShadow/mode2'), this);
        };
        KLayerStylesDropShadow.prototype.color = function () {
            return new KColorProperty(this._prop.property('dropShadow/color'), this);
        };
        KLayerStylesDropShadow.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('dropShadow/opacity'), this);
        };
        KLayerStylesDropShadow.prototype.useGlobalLight = function () {
            return new KOneDProperty(this._prop.property('dropShadow/useGlobalAngle'), this);
        };
        KLayerStylesDropShadow.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('dropShadow/localLightingAngle'), this);
        };
        KLayerStylesDropShadow.prototype.distance = function () {
            return new KOneDProperty(this._prop.property('dropShadow/distance'), this);
        };
        KLayerStylesDropShadow.prototype.spread = function () {
            return new KOneDProperty(this._prop.property('dropShadow/chokeMatte'), this);
        };
        KLayerStylesDropShadow.prototype.size = function () {
            return new KOneDProperty(this._prop.property('dropShadow/blur'), this);
        };
        KLayerStylesDropShadow.prototype.noise = function () {
            return new KOneDProperty(this._prop.property('dropShadow/noise'), this);
        };
        KLayerStylesDropShadow.prototype.layerKnocksOutDropShadow = function () {
            return new KOneDProperty(this._prop.property('dropShadow/layerConceals'), this);
        };
        return KLayerStylesDropShadow;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesDropShadow = KLayerStylesDropShadow;
    var KLayerStylesInnerShadow = (function (_super) {
        __extends(KLayerStylesInnerShadow, _super);
        function KLayerStylesInnerShadow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesInnerShadow.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('innerShadow/mode2'), this);
        };
        KLayerStylesInnerShadow.prototype.color = function () {
            return new KColorProperty(this._prop.property('innerShadow/color'), this);
        };
        KLayerStylesInnerShadow.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('innerShadow/opacity'), this);
        };
        KLayerStylesInnerShadow.prototype.useGlobalLight = function () {
            return new KOneDProperty(this._prop.property('innerShadow/useGlobalAngle'), this);
        };
        KLayerStylesInnerShadow.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('innerShadow/localLightingAngle'), this);
        };
        KLayerStylesInnerShadow.prototype.distance = function () {
            return new KOneDProperty(this._prop.property('innerShadow/distance'), this);
        };
        KLayerStylesInnerShadow.prototype.choke = function () {
            return new KOneDProperty(this._prop.property('innerShadow/chokeMatte'), this);
        };
        KLayerStylesInnerShadow.prototype.size = function () {
            return new KOneDProperty(this._prop.property('innerShadow/blur'), this);
        };
        KLayerStylesInnerShadow.prototype.noise = function () {
            return new KOneDProperty(this._prop.property('innerShadow/noise'), this);
        };
        return KLayerStylesInnerShadow;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesInnerShadow = KLayerStylesInnerShadow;
    var KLayerStylesOuterGlow = (function (_super) {
        __extends(KLayerStylesOuterGlow, _super);
        function KLayerStylesOuterGlow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesOuterGlow.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('outerGlow/mode2'), this);
        };
        KLayerStylesOuterGlow.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('outerGlow/opacity'), this);
        };
        KLayerStylesOuterGlow.prototype.noise = function () {
            return new KOneDProperty(this._prop.property('outerGlow/noise'), this);
        };
        KLayerStylesOuterGlow.prototype.colorType = function () {
            return new KOneDProperty(this._prop.property('outerGlow/AEColorChoice'), this);
        };
        KLayerStylesOuterGlow.prototype.color = function () {
            return new KColorProperty(this._prop.property('outerGlow/color'), this);
        };
        KLayerStylesOuterGlow.prototype.colors = function () {
            return new KCustomValueProperty(this._prop.property('outerGlow/gradient'), this);
        };
        KLayerStylesOuterGlow.prototype.gradientSmoothness = function () {
            return new KOneDProperty(this._prop.property('outerGlow/gradientSmoothness'), this);
        };
        KLayerStylesOuterGlow.prototype.technique = function () {
            return new KOneDProperty(this._prop.property('outerGlow/glowTechnique'), this);
        };
        KLayerStylesOuterGlow.prototype.spread = function () {
            return new KOneDProperty(this._prop.property('outerGlow/chokeMatte'), this);
        };
        KLayerStylesOuterGlow.prototype.size = function () {
            return new KOneDProperty(this._prop.property('outerGlow/blur'), this);
        };
        KLayerStylesOuterGlow.prototype.range = function () {
            return new KOneDProperty(this._prop.property('outerGlow/inputRange'), this);
        };
        KLayerStylesOuterGlow.prototype.jitter = function () {
            return new KOneDProperty(this._prop.property('outerGlow/shadingNoise'), this);
        };
        return KLayerStylesOuterGlow;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesOuterGlow = KLayerStylesOuterGlow;
    var KLayerStylesInnerGlow = (function (_super) {
        __extends(KLayerStylesInnerGlow, _super);
        function KLayerStylesInnerGlow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesInnerGlow.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('innerGlow/mode2'), this);
        };
        KLayerStylesInnerGlow.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('innerGlow/opacity'), this);
        };
        KLayerStylesInnerGlow.prototype.noise = function () {
            return new KOneDProperty(this._prop.property('innerGlow/noise'), this);
        };
        KLayerStylesInnerGlow.prototype.colorType = function () {
            return new KOneDProperty(this._prop.property('innerGlow/AEColorChoice'), this);
        };
        KLayerStylesInnerGlow.prototype.color = function () {
            return new KColorProperty(this._prop.property('innerGlow/color'), this);
        };
        KLayerStylesInnerGlow.prototype.colors = function () {
            return new KCustomValueProperty(this._prop.property('innerGlow/gradient'), this);
        };
        KLayerStylesInnerGlow.prototype.gradientSmoothness = function () {
            return new KOneDProperty(this._prop.property('innerGlow/gradientSmoothness'), this);
        };
        KLayerStylesInnerGlow.prototype.technique = function () {
            return new KOneDProperty(this._prop.property('innerGlow/glowTechnique'), this);
        };
        KLayerStylesInnerGlow.prototype.source = function () {
            return new KOneDProperty(this._prop.property('innerGlow/innerGlowSource'), this);
        };
        KLayerStylesInnerGlow.prototype.choke = function () {
            return new KOneDProperty(this._prop.property('innerGlow/chokeMatte'), this);
        };
        KLayerStylesInnerGlow.prototype.size = function () {
            return new KOneDProperty(this._prop.property('innerGlow/blur'), this);
        };
        KLayerStylesInnerGlow.prototype.range = function () {
            return new KOneDProperty(this._prop.property('innerGlow/inputRange'), this);
        };
        KLayerStylesInnerGlow.prototype.jitter = function () {
            return new KOneDProperty(this._prop.property('innerGlow/shadingNoise'), this);
        };
        return KLayerStylesInnerGlow;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesInnerGlow = KLayerStylesInnerGlow;
    var KLayerStylesBevelAndEmboss = (function (_super) {
        __extends(KLayerStylesBevelAndEmboss, _super);
        function KLayerStylesBevelAndEmboss() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesBevelAndEmboss.prototype.style = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/bevelStyle'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.technique = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/bevelTechnique'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.depth = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/strengthRatio'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.direction = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/bevelDirection'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.size = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/blur'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.soften = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/softness'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.useGlobalLight = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/useGlobalAngle'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/localLightingAngle'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.altitude = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/localLightingAltitude'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.highlightMode = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/highlightMode'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.highlightColor = function () {
            return new KColorProperty(this._prop.property('bevelEmboss/highlightColor'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.highlightOpacity = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/highlightOpacity'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.shadowMode = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/shadowMode'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.shadowColor = function () {
            return new KColorProperty(this._prop.property('bevelEmboss/shadowColor'), this);
        };
        KLayerStylesBevelAndEmboss.prototype.shadowOpacity = function () {
            return new KOneDProperty(this._prop.property('bevelEmboss/shadowOpacity'), this);
        };
        return KLayerStylesBevelAndEmboss;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesBevelAndEmboss = KLayerStylesBevelAndEmboss;
    var KLayerStylesSatin = (function (_super) {
        __extends(KLayerStylesSatin, _super);
        function KLayerStylesSatin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesSatin.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('chromeFX/mode2'), this);
        };
        KLayerStylesSatin.prototype.color = function () {
            return new KColorProperty(this._prop.property('chromeFX/color'), this);
        };
        KLayerStylesSatin.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('chromeFX/opacity'), this);
        };
        KLayerStylesSatin.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('chromeFX/localLightingAngle'), this);
        };
        KLayerStylesSatin.prototype.distance = function () {
            return new KOneDProperty(this._prop.property('chromeFX/distance'), this);
        };
        KLayerStylesSatin.prototype.size = function () {
            return new KOneDProperty(this._prop.property('chromeFX/blur'), this);
        };
        KLayerStylesSatin.prototype.invert = function () {
            return new KOneDProperty(this._prop.property('chromeFX/invert'), this);
        };
        return KLayerStylesSatin;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesSatin = KLayerStylesSatin;
    var KLayerStylesColorOverlay = (function (_super) {
        __extends(KLayerStylesColorOverlay, _super);
        function KLayerStylesColorOverlay() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesColorOverlay.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('solidFill/mode2'), this);
        };
        KLayerStylesColorOverlay.prototype.color = function () {
            return new KColorProperty(this._prop.property('solidFill/color'), this);
        };
        KLayerStylesColorOverlay.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('solidFill/opacity'), this);
        };
        return KLayerStylesColorOverlay;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesColorOverlay = KLayerStylesColorOverlay;
    var KLayerStylesGradientOverlay = (function (_super) {
        __extends(KLayerStylesGradientOverlay, _super);
        function KLayerStylesGradientOverlay() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesGradientOverlay.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('gradientFill/mode2'), this);
        };
        KLayerStylesGradientOverlay.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('gradientFill/opacity'), this);
        };
        KLayerStylesGradientOverlay.prototype.colors = function () {
            return new KCustomValueProperty(this._prop.property('gradientFill/gradient'), this);
        };
        KLayerStylesGradientOverlay.prototype.gradientSmoothness = function () {
            return new KOneDProperty(this._prop.property('gradientFill/gradientSmoothness'), this);
        };
        KLayerStylesGradientOverlay.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('gradientFill/angle'), this);
        };
        KLayerStylesGradientOverlay.prototype.style = function () {
            return new KOneDProperty(this._prop.property('gradientFill/type'), this);
        };
        KLayerStylesGradientOverlay.prototype.reverse = function () {
            return new KOneDProperty(this._prop.property('gradientFill/reverse'), this);
        };
        KLayerStylesGradientOverlay.prototype.alignWithLayer = function () {
            return new KOneDProperty(this._prop.property('gradientFill/align'), this);
        };
        KLayerStylesGradientOverlay.prototype.scale = function () {
            return new KOneDProperty(this._prop.property('gradientFill/scale'), this);
        };
        KLayerStylesGradientOverlay.prototype.offset = function () {
            return new KOneDProperty(this._prop.property('gradientFill/offset'), this);
        };
        return KLayerStylesGradientOverlay;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesGradientOverlay = KLayerStylesGradientOverlay;
    var KLayerStylesStroke = (function (_super) {
        __extends(KLayerStylesStroke, _super);
        function KLayerStylesStroke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLayerStylesStroke.prototype.blendMode = function () {
            return new KOneDProperty(this._prop.property('frameFX/mode2'), this);
        };
        KLayerStylesStroke.prototype.color = function () {
            return new KColorProperty(this._prop.property('frameFX/color'), this);
        };
        KLayerStylesStroke.prototype.size = function () {
            return new KOneDProperty(this._prop.property('frameFX/size'), this);
        };
        KLayerStylesStroke.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('frameFX/opacity'), this);
        };
        KLayerStylesStroke.prototype.position = function () {
            return new KOneDProperty(this._prop.property('frameFX/style'), this);
        };
        return KLayerStylesStroke;
    }(KPropertyGroup));
    KIKAKU.KLayerStylesStroke = KLayerStylesStroke;
    /*
    * Text Property
    */
    var KTextProperties = (function (_super) {
        __extends(KTextProperties, _super);
        function KTextProperties() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextProperties.prototype.sourceText = function () {
            return new KTextDocumentProperty(this._prop.property('ADBE Text Document'), this);
        };
        KTextProperties.prototype.pathOptions = function () {
            return new KTextPathOptions(this._prop.property('ADBE Text Path Options'), this);
        };
        KTextProperties.prototype.moreOptions = function () {
            return new KTextMoreOptions(this._prop.property('ADBE Text More Options'), this);
        };
        KTextProperties.prototype.animators = function () {
            return new KTextAnimators(this._prop.property('ADBE Text Animators'), this);
        };
        return KTextProperties;
    }(KPropertyGroup));
    KIKAKU.KTextProperties = KTextProperties;
    var KTextPathOptions = (function (_super) {
        __extends(KTextPathOptions, _super);
        function KTextPathOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextPathOptions.prototype.path = function () {
            return new KMaskIndexProperty(this._prop.property('ADBE Text Path'), this);
        };
        return KTextPathOptions;
    }(KPropertyGroup));
    KIKAKU.KTextPathOptions = KTextPathOptions;
    var KTextMoreOptions = (function (_super) {
        __extends(KTextMoreOptions, _super);
        function KTextMoreOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextMoreOptions.prototype.anchorPointGrouping = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Anchor Point Option'), this);
        };
        KTextMoreOptions.prototype.groupingAlignment = function () {
            return new KTwoDProperty(this._prop.property('ADBE Text Anchor Point Align'), this);
        };
        KTextMoreOptions.prototype.fillAndStroke = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Render Order'), this);
        };
        KTextMoreOptions.prototype.interCharacterBlending = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Blend Mode'), this);
        };
        return KTextMoreOptions;
    }(KPropertyGroup));
    KIKAKU.KTextMoreOptions = KTextMoreOptions;
    var KTextAnimators = (function (_super) {
        __extends(KTextAnimators, _super);
        function KTextAnimators() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextAnimators.prototype.addAnimator = function (name) {
            var animator = this._prop.addProperty('ADBE Text Animator');
            if (name !== void 0)
                animator.name = name;
            return new KTextAnimator(animator, this);
        };
        return KTextAnimators;
    }(KPropertyGroup));
    KIKAKU.KTextAnimators = KTextAnimators;
    var KTextAnimator = (function (_super) {
        __extends(KTextAnimator, _super);
        function KTextAnimator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextAnimator.prototype.properties = function () {
            return new KTextAnimatorProperties(this._prop.property('ADBE Text Animator Properties'), this);
        };
        KTextAnimator.prototype.selectors = function () {
            return new KTextSelectors(this._prop.property('ADBE Text Selectors'), this);
        };
        return KTextAnimator;
    }(KPropertyGroup));
    KIKAKU.KTextAnimator = KTextAnimator;
    var KTextAnimatorProperties = (function (_super) {
        __extends(KTextAnimatorProperties, _super);
        function KTextAnimatorProperties() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextAnimatorProperties.prototype.anchorPoint = function () {
            return new KThreeDSpatialProperty(this._prop.property('ADBE Text Anchor Point 3D'), this);
        };
        KTextAnimatorProperties.prototype.position = function () {
            return new KThreeDSpatialProperty(this._prop.property('ADBE Text Position 3D'), this);
        };
        KTextAnimatorProperties.prototype.scale = function () {
            return new KThreeDProperty(this._prop.property('ADBE Text Scale 3D'), this);
        };
        KTextAnimatorProperties.prototype.skew = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Skew'), this);
        };
        KTextAnimatorProperties.prototype.skewAxis = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Skew Axis'), this);
        };
        KTextAnimatorProperties.prototype.rotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Rotation'), this);
        };
        KTextAnimatorProperties.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Opacity'), this);
        };
        KTextAnimatorProperties.prototype.fillOpacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Fill Opacity'), this);
        };
        KTextAnimatorProperties.prototype.fillColor = function () {
            return new KColorProperty(this._prop.property('ADBE Text Fill Color'), this);
        };
        KTextAnimatorProperties.prototype.fillHue = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Fill Hue'), this);
        };
        KTextAnimatorProperties.prototype.fillSaturation = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Fill Saturation'), this);
        };
        KTextAnimatorProperties.prototype.fillBrightness = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Fill Brightness'), this);
        };
        KTextAnimatorProperties.prototype.strokeOpacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Stroke Opacity'), this);
        };
        KTextAnimatorProperties.prototype.strokeColor = function () {
            return new KColorProperty(this._prop.property('ADBE Text Stroke Color'), this);
        };
        KTextAnimatorProperties.prototype.strokeHue = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Stroke Hue'), this);
        };
        KTextAnimatorProperties.prototype.strokeSaturation = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Stroke Saturation'), this);
        };
        KTextAnimatorProperties.prototype.strokeBrightness = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Stroke Brightness'), this);
        };
        KTextAnimatorProperties.prototype.strokeWidth = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Stroke Width'), this);
        };
        KTextAnimatorProperties.prototype.lineAnchor = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Line Anchor'), this);
        };
        KTextAnimatorProperties.prototype.trackingType = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Track Type'), this);
        };
        KTextAnimatorProperties.prototype.trackingAmount = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Tracking Amount'), this);
        };
        KTextAnimatorProperties.prototype.characterAlignment = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Change Type'), this);
        };
        KTextAnimatorProperties.prototype.characterRange = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Range'), this);
        };
        KTextAnimatorProperties.prototype.characterValue = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Replace'), this);
        };
        KTextAnimatorProperties.prototype.characterOffset = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Offset'), this);
        };
        KTextAnimatorProperties.prototype.lineSpacing = function () {
            return new KTwoDProperty(this._prop.property('ADBE Text Line Spacing'), this);
        };
        KTextAnimatorProperties.prototype.blur = function () {
            return new KTwoDProperty(this._prop.property('ADBE Text Blur'), this);
        };
        KTextAnimatorProperties.prototype.addAnchorPoint = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Anchor Point 3D'), this);
        };
        KTextAnimatorProperties.prototype.addPosition = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Position 3D'), this);
        };
        KTextAnimatorProperties.prototype.addScale = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Scale 3D'), this);
        };
        KTextAnimatorProperties.prototype.addSkew = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Skew'), this);
        };
        KTextAnimatorProperties.prototype.addSkewAxis = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Skew Axis'), this);
        };
        KTextAnimatorProperties.prototype.addRotation = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Rotation'), this);
        };
        KTextAnimatorProperties.prototype.addOpacity = function () {
            return new KThreeDSpatialProperty(this._prop.addProperty('ADBE Text Opacity'), this);
        };
        KTextAnimatorProperties.prototype.addFillOpacity = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Fill Opacity'), this);
        };
        KTextAnimatorProperties.prototype.addFillColor = function () {
            return new KColorProperty(this._prop.addProperty('ADBE Text Fill Color'), this);
        };
        KTextAnimatorProperties.prototype.addFillHue = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Fill Hue'), this);
        };
        KTextAnimatorProperties.prototype.addFillSaturation = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Fill Saturation'), this);
        };
        KTextAnimatorProperties.prototype.addFillBrightness = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Fill Brightness'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeOpacity = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Stroke Opacity'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeColor = function () {
            return new KColorProperty(this._prop.addProperty('ADBE Text Stroke Color'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeHue = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Stroke Hue'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeSaturation = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Stroke Saturation'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeBrightness = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Stroke Brightness'), this);
        };
        KTextAnimatorProperties.prototype.addStrokeWidth = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Stroke Width'), this);
        };
        KTextAnimatorProperties.prototype.addLineAnchor = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Line Anchor'), this);
        };
        KTextAnimatorProperties.prototype.addTrackingType = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Track Type'), this);
        };
        KTextAnimatorProperties.prototype.addTrackingAmount = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Tracking Amount'), this);
        };
        KTextAnimatorProperties.prototype.addCharacterAlignment = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Character Change Type'), this);
        };
        KTextAnimatorProperties.prototype.addCharacterRange = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Character Range'), this);
        };
        KTextAnimatorProperties.prototype.addCharacterValue = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Character Replace'), this);
        };
        KTextAnimatorProperties.prototype.addCharacterOffset = function () {
            return new KOneDProperty(this._prop.addProperty('ADBE Text Character Offset'), this);
        };
        KTextAnimatorProperties.prototype.addLineSpacing = function () {
            return new KTwoDProperty(this._prop.addProperty('ADBE Text Line Spacing'), this);
        };
        KTextAnimatorProperties.prototype.addBlur = function () {
            return new KTwoDProperty(this._prop.addProperty('ADBE Text Blur'), this);
        };
        return KTextAnimatorProperties;
    }(KPropertyGroup));
    KIKAKU.KTextAnimatorProperties = KTextAnimatorProperties;
    var KTextSelectors = (function (_super) {
        __extends(KTextSelectors, _super);
        function KTextSelectors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextSelectors.prototype.addRangeSelector = function (name) {
            var selector = this._prop.addProperty('ADBE Text Selector');
            if (name !== void 0)
                selector.name = name;
            return new KTextRangeSelector(selector, this);
        };
        KTextSelectors.prototype.addWigglySelector = function (name) {
            var selector = this._prop.addProperty('ADBE Text Wiggly Selector');
            if (name !== void 0)
                selector.name = name;
            return new KWigglySelector(selector, this);
        };
        KTextSelectors.prototype.addExpressionSelector = function (name) {
            var selector = this._prop.addProperty('ADBE Text Expressible Selector');
            if (name !== void 0)
                selector.name = name;
            return new KTextExpressionSelector(selector, this);
        };
        return KTextSelectors;
    }(KPropertyGroup));
    KIKAKU.KTextSelectors = KTextSelectors;
    var KTextRangeSelector = (function (_super) {
        __extends(KTextRangeSelector, _super);
        function KTextRangeSelector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextRangeSelector.prototype.start = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Percent Start'), this);
        };
        KTextRangeSelector.prototype.end = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Percent End'), this);
        };
        KTextRangeSelector.prototype.offset = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Percent Offset'), this);
        };
        KTextRangeSelector.prototype.advanced = function () {
            return new KTextRangeAdvanced(this._prop.property('ADBE Text Range Advanced'), this);
        };
        return KTextRangeSelector;
    }(KPropertyGroup));
    KIKAKU.KTextRangeSelector = KTextRangeSelector;
    var KTextRangeAdvanced = (function (_super) {
        __extends(KTextRangeAdvanced, _super);
        function KTextRangeAdvanced() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextRangeAdvanced.prototype.units = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Range Units'), this);
        };
        KTextRangeAdvanced.prototype.basedOn = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Range Type2'), this);
        };
        KTextRangeAdvanced.prototype.mode = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Selector Mode'), this);
        };
        KTextRangeAdvanced.prototype.amount = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Selector Max Amount'), this);
        };
        KTextRangeAdvanced.prototype.shape = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Range Shape'), this);
        };
        KTextRangeAdvanced.prototype.smoothness = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Selector Smoothness'), this);
        };
        KTextRangeAdvanced.prototype.easeHigh = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Levels Max Ease'), this);
        };
        KTextRangeAdvanced.prototype.easeLow = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Levels Min Ease'), this);
        };
        KTextRangeAdvanced.prototype.randomizeOrder = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Randomize Order'), this);
        };
        return KTextRangeAdvanced;
    }(KPropertyGroup));
    KIKAKU.KTextRangeAdvanced = KTextRangeAdvanced;
    var KWigglySelector = (function (_super) {
        __extends(KWigglySelector, _super);
        function KWigglySelector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KWigglySelector.prototype.mode = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Selector Mode'), this);
        };
        KWigglySelector.prototype.maxAmount = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Wiggly Max Amount'), this);
        };
        KWigglySelector.prototype.minAmount = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Wiggly Min Amount'), this);
        };
        KWigglySelector.prototype.basedOn = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Wiggly Min Amount'), this);
        };
        KWigglySelector.prototype.wigglesPerSecond = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Temporal Freq'), this);
        };
        KWigglySelector.prototype.correlation = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Character Correlation'), this);
        };
        KWigglySelector.prototype.temporalPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Temporal Phase'), this);
        };
        KWigglySelector.prototype.spatialPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Spatial Phase'), this);
        };
        KWigglySelector.prototype.lockDimensions = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Wiggly Lock Dim'), this);
        };
        KWigglySelector.prototype.randomSeed = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Wiggly Random Seed'), this);
        };
        return KWigglySelector;
    }(KPropertyGroup));
    KIKAKU.KWigglySelector = KWigglySelector;
    var KTextExpressionSelector = (function (_super) {
        __extends(KTextExpressionSelector, _super);
        function KTextExpressionSelector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KTextExpressionSelector.prototype.basedOn = function () {
            return new KOneDProperty(this._prop.property('ADBE Text Range Type2'), this);
        };
        KTextExpressionSelector.prototype.amount = function () {
            return new KThreeDProperty(this._prop.property('ADBE Text Expressible Amount'), this);
        };
        return KTextExpressionSelector;
    }(KPropertyGroup));
    KIKAKU.KTextExpressionSelector = KTextExpressionSelector;
    /*
    * Shape Property
    */
    var KVectorsGroup = (function (_super) {
        __extends(KVectorsGroup, _super);
        function KVectorsGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //group
        KVectorsGroup.prototype.addGroup = function (name) {
            var group = this._prop.addProperty('ADBE Vector Group');
            if (name !== void 0)
                group.name = name;
            return new KVectorGroup(group, this);
        };
        //shape
        KVectorsGroup.prototype.addRectangle = function (name) {
            var group = this._prop.addProperty('ADBE Vector Shape - Rect');
            if (name !== void 0)
                group.name = name;
            return new KVectorRect(group, this);
        };
        KVectorsGroup.prototype.addEllipse = function (name) {
            var group = this._prop.addProperty('ADBE Vector Shape - Ellipse');
            if (name !== void 0)
                group.name = name;
            return new KVectorEllipse(group, this);
        };
        KVectorsGroup.prototype.addPolystar = function (name) {
            var group = this._prop.addProperty('ADBE Vector Shape - Star');
            if (name !== void 0)
                group.name = name;
            return new KVectorPolystar(group, this);
        };
        KVectorsGroup.prototype.addPath = function (name) {
            var group = this._prop.addProperty('ADBE Vector Shape - Group');
            if (name !== void 0)
                group.name = name;
            return new KVectorPath(group, this);
        };
        //graphic
        KVectorsGroup.prototype.addFill = function (name) {
            var group = this._prop.addProperty('ADBE Vector Graphic - Fill');
            if (name !== void 0)
                group.name = name;
            return new KVectorFill(group, this);
        };
        KVectorsGroup.prototype.addStroke = function (name) {
            var group = this._prop.addProperty('ADBE Vector Graphic - Stroke');
            if (name !== void 0)
                group.name = name;
            return new KVectorStroke(group, this);
        };
        KVectorsGroup.prototype.addGradientFill = function (name) {
            var group = this._prop.addProperty('ADBE Vector Graphic - G-Fill');
            if (name !== void 0)
                group.name = name;
            return new KVectorGradientFill(group, this);
        };
        KVectorsGroup.prototype.addGradientStroke = function (name) {
            var group = this._prop.addProperty('ADBE Vector Graphic - G-Stroke');
            if (name !== void 0)
                group.name = name;
            return new KVectorGradientStroke(group, this);
        };
        //filter
        KVectorsGroup.prototype.addMergePaths = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Merge');
            if (name !== void 0)
                group.name = name;
            return new KVectorMergePaths(group, this);
        };
        KVectorsGroup.prototype.addOffsetPaths = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Offset');
            if (name !== void 0)
                group.name = name;
            return new KVectorOffsetPaths(group, this);
        };
        KVectorsGroup.prototype.addPuckerAndBloat = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - PB');
            if (name !== void 0)
                group.name = name;
            return new KVectorPuckerAndBloat(group, this);
        };
        KVectorsGroup.prototype.addRepeater = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Repeater');
            if (name !== void 0)
                group.name = name;
            return new KVectorRepeater(group, this);
        };
        KVectorsGroup.prototype.addRoundCorners = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - RC');
            if (name !== void 0)
                group.name = name;
            return new KVectorRoundCorners(group, this);
        };
        KVectorsGroup.prototype.addTrimPaths = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Trim');
            if (name !== void 0)
                group.name = name;
            return new KVectorTrimPaths(group, this);
        };
        KVectorsGroup.prototype.addTwist = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Twist');
            if (name !== void 0)
                group.name = name;
            return new KVectorTwist(group, this);
        };
        KVectorsGroup.prototype.addWigglePaths = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Roughen');
            if (name !== void 0)
                group.name = name;
            return new KVectorWigglePaths(group, this);
        };
        KVectorsGroup.prototype.addWiggleTransform = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Wiggler');
            if (name !== void 0)
                group.name = name;
            return new KVectorWiggler(group, this);
        };
        KVectorsGroup.prototype.addZigzag = function (name) {
            var group = this._prop.addProperty('ADBE Vector Filter - Zigzag');
            if (name !== void 0)
                group.name = name;
            return new KVectorZigzag(group, this);
        };
        return KVectorsGroup;
    }(KPropertyGroup));
    KIKAKU.KVectorsGroup = KVectorsGroup;
    var KRootVectors = (function (_super) {
        __extends(KRootVectors, _super);
        function KRootVectors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return KRootVectors;
    }(KVectorsGroup));
    KIKAKU.KRootVectors = KRootVectors;
    var KVectorGroup = (function (_super) {
        __extends(KVectorGroup, _super);
        function KVectorGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorGroup.prototype.vectors = function () {
            return new KVectorsGroup(this._prop.property('ADBE Vectors Group'), this);
        };
        KVectorGroup.prototype.transform = function () {
            return new KVectorTransform(this._prop.property('ADBE Vector Transform Group'), this);
        };
        return KVectorGroup;
    }(KPropertyGroup));
    KIKAKU.KVectorGroup = KVectorGroup;
    var KVectorTransform = (function (_super) {
        __extends(KVectorTransform, _super);
        function KVectorTransform() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorTransform.prototype.anchorPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Anchor'), this);
        };
        KVectorTransform.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Position'), this);
        };
        KVectorTransform.prototype.scale = function () {
            return new KTwoDProperty(this._prop.property('ADBE Vector Scale'), this);
        };
        KVectorTransform.prototype.skew = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Skew'), this);
        };
        KVectorTransform.prototype.skewAxis = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Skew Axis'), this);
        };
        KVectorTransform.prototype.rotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Rotation'), this);
        };
        KVectorTransform.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Group Opacity'), this);
        };
        return KVectorTransform;
    }(KPropertyGroup));
    KIKAKU.KVectorTransform = KVectorTransform;
    //shape
    var KVectorRect = (function (_super) {
        __extends(KVectorRect, _super);
        function KVectorRect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorRect.prototype.size = function () {
            return new KTwoDProperty(this._prop.property('ADBE Vector Rect Size'), this);
        };
        KVectorRect.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Rect Position'), this);
        };
        KVectorRect.prototype.roundness = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Rect Roundness'), this);
        };
        return KVectorRect;
    }(KPropertyGroup));
    KIKAKU.KVectorRect = KVectorRect;
    var KVectorEllipse = (function (_super) {
        __extends(KVectorEllipse, _super);
        function KVectorEllipse() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorEllipse.prototype.size = function () {
            return new KTwoDProperty(this._prop.property('ADBE Vector Ellipse Size'), this);
        };
        KVectorEllipse.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Ellipse Position'), this);
        };
        return KVectorEllipse;
    }(KPropertyGroup));
    KIKAKU.KVectorEllipse = KVectorEllipse;
    var KVectorPolystar = (function (_super) {
        __extends(KVectorPolystar, _super);
        function KVectorPolystar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorPolystar.prototype.type = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Type'), this);
        };
        KVectorPolystar.prototype.points = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Points'), this);
        };
        KVectorPolystar.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Star Position'), this);
        };
        KVectorPolystar.prototype.rotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Rotation'), this);
        };
        KVectorPolystar.prototype.innerRadius = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Inner Radius'), this);
        };
        KVectorPolystar.prototype.outerRadius = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Outer Radius'), this);
        };
        KVectorPolystar.prototype.innerRoundness = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Inner Roundess'), this);
        };
        KVectorPolystar.prototype.outerRoundness = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Star Outer Roundess'), this);
        };
        return KVectorPolystar;
    }(KPropertyGroup));
    KIKAKU.KVectorPolystar = KVectorPolystar;
    var KVectorPath = (function (_super) {
        __extends(KVectorPath, _super);
        function KVectorPath() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorPath.prototype.path = function () {
            return new KShapeProperty(this._prop.property('ADBE Vector Shape'), this);
        };
        return KVectorPath;
    }(KPropertyGroup));
    KIKAKU.KVectorPath = KVectorPath;
    //graphic
    var KVectorFill = (function (_super) {
        __extends(KVectorFill, _super);
        function KVectorFill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorFill.prototype.composite = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Composite Order'), this);
        };
        KVectorFill.prototype.fillRule = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Fill Rule'), this);
        };
        KVectorFill.prototype.color = function () {
            return new KColorProperty(this._prop.property('ADBE Vector Fill Color'), this);
        };
        KVectorFill.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Fill Opacity'), this);
        };
        return KVectorFill;
    }(KPropertyGroup));
    KIKAKU.KVectorFill = KVectorFill;
    var KVectorStroke = (function (_super) {
        __extends(KVectorStroke, _super);
        function KVectorStroke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorStroke.prototype.composite = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Composite Order'), this);
        };
        KVectorStroke.prototype.color = function () {
            return new KColorProperty(this._prop.property('ADBE Vector Stroke Color'), this);
        };
        KVectorStroke.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Opacity'), this);
        };
        KVectorStroke.prototype.strokeWidth = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Width'), this);
        };
        KVectorStroke.prototype.lineCap = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Line Cap'), this);
        };
        KVectorStroke.prototype.lineJoin = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Line Join'), this);
        };
        KVectorStroke.prototype.miterLimit = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Miter Limit'), this);
        };
        return KVectorStroke;
    }(KPropertyGroup));
    KIKAKU.KVectorStroke = KVectorStroke;
    var KVectorGradientFill = (function (_super) {
        __extends(KVectorGradientFill, _super);
        function KVectorGradientFill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorGradientFill.prototype.composite = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Composite Order'), this);
        };
        KVectorGradientFill.prototype.fillRule = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Fill Rule'), this);
        };
        KVectorGradientFill.prototype.type = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Grad Type'), this);
        };
        KVectorGradientFill.prototype.startPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Grad Start Pt'), this);
        };
        KVectorGradientFill.prototype.endPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Grad End Pt'), this);
        };
        KVectorGradientFill.prototype.colors = function () {
            return new KCustomValueProperty(this._prop.property('ADBE Vector Grad Colors'), this);
        };
        KVectorGradientFill.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Fill Opacity'), this);
        };
        return KVectorGradientFill;
    }(KPropertyGroup));
    KIKAKU.KVectorGradientFill = KVectorGradientFill;
    var KVectorGradientStroke = (function (_super) {
        __extends(KVectorGradientStroke, _super);
        function KVectorGradientStroke() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorGradientStroke.prototype.composite = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Composite Order'), this);
        };
        KVectorGradientStroke.prototype.type = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Grad Type'), this);
        };
        KVectorGradientStroke.prototype.startPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Grad Start Pt'), this);
        };
        KVectorGradientStroke.prototype.endPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Grad End Pt'), this);
        };
        KVectorGradientStroke.prototype.colors = function () {
            return new KCustomValueProperty(this._prop.property('ADBE Vector Grad Colors'), this);
        };
        KVectorGradientStroke.prototype.opacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Opacity'), this);
        };
        KVectorGradientStroke.prototype.strokeWidth = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Width'), this);
        };
        KVectorGradientStroke.prototype.lineCap = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Line Cap'), this);
        };
        KVectorGradientStroke.prototype.lineJoin = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Line Join'), this);
        };
        KVectorGradientStroke.prototype.miterLimit = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Stroke Miter Limit'), this);
        };
        return KVectorGradientStroke;
    }(KPropertyGroup));
    KIKAKU.KVectorGradientStroke = KVectorGradientStroke;
    //filter
    var KVectorMergePaths = (function (_super) {
        __extends(KVectorMergePaths, _super);
        function KVectorMergePaths() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorMergePaths.prototype.mode = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Merge Type'), this);
        };
        return KVectorMergePaths;
    }(KPropertyGroup));
    KIKAKU.KVectorMergePaths = KVectorMergePaths;
    var KVectorOffsetPaths = (function (_super) {
        __extends(KVectorOffsetPaths, _super);
        function KVectorOffsetPaths() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorOffsetPaths.prototype.amount = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Offset Amount'), this);
        };
        KVectorOffsetPaths.prototype.lineJoin = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Offset Line Join'), this);
        };
        KVectorOffsetPaths.prototype.miterLimit = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Offset Miter Limit'), this);
        };
        return KVectorOffsetPaths;
    }(KPropertyGroup));
    KIKAKU.KVectorOffsetPaths = KVectorOffsetPaths;
    var KVectorPuckerAndBloat = (function (_super) {
        __extends(KVectorPuckerAndBloat, _super);
        function KVectorPuckerAndBloat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorPuckerAndBloat.prototype.amount = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector PuckerBloat Amount'), this);
        };
        return KVectorPuckerAndBloat;
    }(KPropertyGroup));
    KIKAKU.KVectorPuckerAndBloat = KVectorPuckerAndBloat;
    var KVectorRepeater = (function (_super) {
        __extends(KVectorRepeater, _super);
        function KVectorRepeater() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorRepeater.prototype.copies = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Repeater Copies'), this);
        };
        KVectorRepeater.prototype.offset = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Repeater Offset'), this);
        };
        KVectorRepeater.prototype.transform = function () {
            return new KVectorRepeaterTransform(this._prop.property('ADBE Vector Repeater Transform'), this);
        };
        return KVectorRepeater;
    }(KPropertyGroup));
    KIKAKU.KVectorRepeater = KVectorRepeater;
    var KVectorRepeaterTransform = (function (_super) {
        __extends(KVectorRepeaterTransform, _super);
        function KVectorRepeaterTransform() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorRepeaterTransform.prototype.anchorPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Repeater Anchor'), this);
        };
        KVectorRepeaterTransform.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Repeater Position'), this);
        };
        KVectorRepeaterTransform.prototype.scale = function () {
            return new KTwoDProperty(this._prop.property('ADBE Vector Repeater Scale'), this);
        };
        KVectorRepeaterTransform.prototype.rotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Repeater Rotation'), this);
        };
        KVectorRepeaterTransform.prototype.startOpacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Repeater Opacity 1'), this);
        };
        KVectorRepeaterTransform.prototype.endOpacity = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Repeater Opacity 2'), this);
        };
        return KVectorRepeaterTransform;
    }(KPropertyGroup));
    KIKAKU.KVectorRepeaterTransform = KVectorRepeaterTransform;
    var KVectorRoundCorners = (function (_super) {
        __extends(KVectorRoundCorners, _super);
        function KVectorRoundCorners() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorRoundCorners.prototype.radius = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector RoundCorner Radius'), this);
        };
        return KVectorRoundCorners;
    }(KPropertyGroup));
    KIKAKU.KVectorRoundCorners = KVectorRoundCorners;
    var KVectorTrimPaths = (function (_super) {
        __extends(KVectorTrimPaths, _super);
        function KVectorTrimPaths() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorTrimPaths.prototype.start = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Trim Start'), this);
        };
        KVectorTrimPaths.prototype.end = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Trim End'), this);
        };
        KVectorTrimPaths.prototype.offset = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Trim Offset'), this);
        };
        KVectorTrimPaths.prototype.trimMultipleShapes = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Trim Type'), this);
        };
        return KVectorTrimPaths;
    }(KPropertyGroup));
    KIKAKU.KVectorTrimPaths = KVectorTrimPaths;
    var KVectorTwist = (function (_super) {
        __extends(KVectorTwist, _super);
        function KVectorTwist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorTwist.prototype.angle = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Twist Angle'), this);
        };
        KVectorTwist.prototype.center = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Twist Center'), this);
        };
        return KVectorTwist;
    }(KPropertyGroup));
    KIKAKU.KVectorTwist = KVectorTwist;
    var KVectorWigglePaths = (function (_super) {
        __extends(KVectorWigglePaths, _super);
        function KVectorWigglePaths() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorWigglePaths.prototype.size = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Roughen Size'), this);
        };
        KVectorWigglePaths.prototype.detail = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Roughen Detail'), this);
        };
        KVectorWigglePaths.prototype.points = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Roughen Points'), this);
        };
        KVectorWigglePaths.prototype.wigglesPerSecond = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Temporal Freq'), this);
        };
        KVectorWigglePaths.prototype.correlation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Correlation'), this);
        };
        KVectorWigglePaths.prototype.temporalPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Temporal Phase'), this);
        };
        KVectorWigglePaths.prototype.spatialPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Spatial Phase'), this);
        };
        KVectorWigglePaths.prototype.randomSeed = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Random Seed'), this);
        };
        return KVectorWigglePaths;
    }(KPropertyGroup));
    KIKAKU.KVectorWigglePaths = KVectorWigglePaths;
    var KVectorWiggler = (function (_super) {
        __extends(KVectorWiggler, _super);
        function KVectorWiggler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorWiggler.prototype.wigglesPerSecond = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Xform Temporal Freq'), this);
        };
        KVectorWiggler.prototype.correlation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Correlation'), this);
        };
        KVectorWiggler.prototype.temporalPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Temporal Phase'), this);
        };
        KVectorWiggler.prototype.spatialPhase = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Spatial Phase'), this);
        };
        KVectorWiggler.prototype.randomSeed = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Random Seed'), this);
        };
        KVectorWiggler.prototype.transform = function () {
            return new KVectorWigglerTransform(this._prop.property('ADBE Vector Wiggler Transform'), this);
        };
        return KVectorWiggler;
    }(KPropertyGroup));
    KIKAKU.KVectorWiggler = KVectorWiggler;
    var KVectorWigglerTransform = (function (_super) {
        __extends(KVectorWigglerTransform, _super);
        function KVectorWigglerTransform() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorWigglerTransform.prototype.anchorPoint = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Wiggler Anchor'), this);
        };
        KVectorWigglerTransform.prototype.position = function () {
            return new KTwoDSpatialProperty(this._prop.property('ADBE Vector Wiggler Position'), this);
        };
        KVectorWigglerTransform.prototype.scale = function () {
            return new KTwoDProperty(this._prop.property('ADBE Vector Wiggler Scale'), this);
        };
        KVectorWigglerTransform.prototype.rotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Wiggler Rotation'), this);
        };
        return KVectorWigglerTransform;
    }(KPropertyGroup));
    KIKAKU.KVectorWigglerTransform = KVectorWigglerTransform;
    var KVectorZigzag = (function (_super) {
        __extends(KVectorZigzag, _super);
        function KVectorZigzag() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KVectorZigzag.prototype.size = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Zigzag Size'), this);
        };
        KVectorZigzag.prototype.ridgesPerSegment = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Zigzag Detail'), this);
        };
        KVectorZigzag.prototype.points = function () {
            return new KOneDProperty(this._prop.property('ADBE Vector Zigzag Points'), this);
        };
        return KVectorZigzag;
    }(KPropertyGroup));
    KIKAKU.KVectorZigzag = KVectorZigzag;
    /*
    * Material Property
    */
    var KMaterialOptions = (function (_super) {
        __extends(KMaterialOptions, _super);
        function KMaterialOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KMaterialOptions.prototype.castsShadows = function () {
            return new KOneDProperty(this._prop.property('ADBE Casts Shadows'), this);
        };
        KMaterialOptions.prototype.lightTransmission = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Transmission'), this);
        };
        KMaterialOptions.prototype.acceptsShadows = function () {
            return new KOneDProperty(this._prop.property('ADBE Accepts Shadows'), this);
        };
        KMaterialOptions.prototype.acceptsLights = function () {
            return new KOneDProperty(this._prop.property('ADBE Accepts Lights'), this);
        };
        KMaterialOptions.prototype.ambient = function () {
            return new KOneDProperty(this._prop.property('ADBE Ambient Coefficient'), this);
        };
        KMaterialOptions.prototype.diffuse = function () {
            return new KOneDProperty(this._prop.property('ADBE Diffuse Coefficient'), this);
        };
        KMaterialOptions.prototype.specularIntensity = function () {
            return new KOneDProperty(this._prop.property('ADBE Specular Coefficient'), this);
        };
        KMaterialOptions.prototype.specularShininess = function () {
            return new KOneDProperty(this._prop.property('ADBE Shininess Coefficient'), this);
        };
        KMaterialOptions.prototype.metal = function () {
            return new KOneDProperty(this._prop.property('ADBE Metal Coefficient'), this);
        };
        return KMaterialOptions;
    }(KPropertyGroup));
    KIKAKU.KMaterialOptions = KMaterialOptions;
    /*
    * Camera Property
    */
    var KCameraOptions = (function (_super) {
        __extends(KCameraOptions, _super);
        function KCameraOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KCameraOptions.prototype.zoom = function () {
            return new KOneDProperty(this._prop.property('ADBE Camera Zoom'), this);
        };
        KCameraOptions.prototype.depthOfField = function () {
            return new KOneDProperty(this._prop.property('ADBE Camera Depth of Field'), this);
        };
        KCameraOptions.prototype.focusDistance = function () {
            return new KOneDProperty(this._prop.property('ADBE Camera Focus Distance'), this);
        };
        KCameraOptions.prototype.aperture = function () {
            return new KOneDProperty(this._prop.property('ADBE Camera Aperture'), this);
        };
        KCameraOptions.prototype.blurLevel = function () {
            return new KOneDProperty(this._prop.property('ADBE Camera Blur Level'), this);
        };
        KCameraOptions.prototype.irisShape = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Shape'), this);
        };
        KCameraOptions.prototype.irisRotation = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Rotation'), this);
        };
        KCameraOptions.prototype.irisRoundness = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Roundness'), this);
        };
        KCameraOptions.prototype.irisAspectRatio = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Aspect Ratio'), this);
        };
        KCameraOptions.prototype.irisDiffractionFringe = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Diffraction Fringe'), this);
        };
        KCameraOptions.prototype.highlightGain = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Highlight Gain'), this);
        };
        KCameraOptions.prototype.highlightThreshold = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Highlight Threshold'), this);
        };
        KCameraOptions.prototype.highlightSaturation = function () {
            return new KOneDProperty(this._prop.property('ADBE Iris Hightlight Saturation'), this);
        };
        return KCameraOptions;
    }(KPropertyGroup));
    KIKAKU.KCameraOptions = KCameraOptions;
    /*
    * Light Property
    */
    var KLightOptions = (function (_super) {
        __extends(KLightOptions, _super);
        function KLightOptions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KLightOptions.prototype.intensity = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Intensity'), this);
        };
        KLightOptions.prototype.color = function () {
            return new KColorProperty(this._prop.property('ADBE Light Color'), this);
        };
        KLightOptions.prototype.coneAngle = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Cone Angle'), this);
        };
        KLightOptions.prototype.coneFeather = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Cone Feather 2'), this);
        };
        KLightOptions.prototype.falloff = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Falloff Type'), this);
        };
        KLightOptions.prototype.radius = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Falloff Start'), this);
        };
        KLightOptions.prototype.falloffDistance = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Falloff Distance'), this);
        };
        KLightOptions.prototype.castsShadows = function () {
            return new KOneDProperty(this._prop.property('ADBE Casts Shadows'), this);
        };
        KLightOptions.prototype.shadowDarkness = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Shadow Darkness'), this);
        };
        KLightOptions.prototype.shadowDiffusion = function () {
            return new KOneDProperty(this._prop.property('ADBE Light Shadow Diffusion'), this);
        };
        return KLightOptions;
    }(KPropertyGroup));
    KIKAKU.KLightOptions = KLightOptions;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="wrapper/array.ts" />
/// <reference path="wrapper/file.ts" />
/// <reference path="wrapper/project.ts" />
/// <reference path="wrapper/source.ts" />
/// <reference path="wrapper/item.ts" />
/// <reference path="wrapper/layer.ts" />
/// <reference path="wrapper/property.ts" /> 
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
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var listeners = this._listners[type];
            if (!listeners) {
                return;
            }
            for (var _a = 0, listeners_1 = listeners; _a < listeners_1.length; _a++) {
                var listener = listeners_1[_a];
                listener.fn.apply(listener.ctx, args);
            }
        };
        return EventDispatcher;
    }());
    KIKAKU.EventDispatcher = EventDispatcher;
})(KIKAKU || (KIKAKU = {}));
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
        FileManager.prototype["delete"] = function (file_name) {
            var file = this.getFile(file_name);
            if (file.exists) {
                return file.remove();
            }
            return true;
        };
        return FileManager;
    }());
    FileManager.TYPE = {
        CUSTOM: 'custom',
        APP_DATA: 'appData',
        COMMON_FILES: 'commonFiles',
        DESKTOP: 'desktop',
        MY_DOCUMENTS: 'myDocuments',
        USER_DATA: 'userData'
    };
    KIKAKU.FileManager = FileManager;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Request;
    (function (Request) {
        var URL_REGEX = /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i;
        function parseURL(url) {
            var m = URL_REGEX.exec(url);
            if (!m) {
                throw new Error('Invalid url');
            }
            return {
                scheme: m[1],
                host: m[2],
                port: m[3],
                path: m[4] + (m[5] ? "?" + m[5] : ''),
                query: m[5],
                fragment: m[6]
            };
        }
        function supportScheme(scheme) {
            switch (scheme) {
                case 'http':
                    return true;
            }
            return false;
        }
        function getPortFromShceme(scheme) {
            switch (scheme) {
                case 'http':
                    return 80;
            }
            throw new Error('Invalid scheme');
        }
        function fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
        function createContent(options) {
            var type = options.type, data = options.data;
            switch (type) {
                case Request.ContentType.FORM:
                    var strs = [];
                    for (var key in data) {
                        strs.push(fixedEncodeURIComponent(key) + '=' + fixedEncodeURIComponent(data[key]));
                    }
                    return strs.join('&');
                case Request.ContentType.JSON:
                    return KIKAKU.JSON.stringify(data);
            }
            throw new Error("Invalid content type: " + type);
        }
        function createRequest(method, path, host, options) {
            var request = method + " " + path + " HTTP/1.0";
            var headers = { 'HOST': host };
            var content = '';
            if (options) {
                content = createContent(options);
                if (content.length) {
                    headers['Content-Type'] = options.type;
                    headers['Content-Length'] = content.length;
                }
            }
            for (var name in headers) {
                request += "\r\n" + name + ": " + headers[name];
            }
            request += '\r\n\r\n';
            if (content.length) {
                request += content;
            }
            return request;
        }
        function generateTemporaryPath(ext) {
            if (ext === void 0) { ext = '.txt'; }
            var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var temp_folder_path = Folder.temp.absoluteURI;
            var filename = '';
            while (true) {
                for (var i = 0; i < 16; ++i) {
                    filename += characters[~~(Math.random() * characters.length)];
                }
                var file = new File(temp_folder_path + "/" + filename + ext);
                if (!file.exists) {
                    break;
                }
                filename = '';
            }
            return temp_folder_path + "/" + filename + ext;
        }
        function createResponse(http_response) {
            var header_length = http_response.indexOf('\r\n\r\n');
            var header = http_response.substring(0, header_length);
            var body = http_response.substring(header_length + 4);
            var headers = header.split('\r\n');
            var response = { statusCode: 0, reasonPhrase: '', headers: {}, body: '' };
            //status line
            {
                var status_line = headers.shift();
                var m = /^HTTP\/([\d\.]+)\s(\d+)\s(.*)$/.exec(status_line);
                response.statusCode = +m[2];
                response.reasonPhrase = m[3] || '';
            }
            //header
            {
                KIKAKU.Utils.forEach(headers, function (line) {
                    var m = /^(.*):\s(.*)$/.exec(line);
                    if (m) {
                        var name = m[1];
                        var value = m[2];
                        response.headers[name] = value;
                    }
                });
            }
            //body
            {
                var temp_file = new File(generateTemporaryPath());
                temp_file.encoding = 'BINARY';
                if (!temp_file.open('w')) {
                    throw new Error('File access denied');
                }
                temp_file.write(body);
                temp_file.close();
                temp_file.encoding = 'UTF-8';
                if (!temp_file.open('r')) {
                    throw new Error('File access denied');
                }
                response.body = temp_file.read();
                temp_file.close();
                temp_file.remove();
            }
            return response;
        }
        Request.ContentType = {
            JSON: 'application/json',
            FORM: 'application/x-www-form-urlencoded'
        };
        function request(method, url, options, fn) {
            var parsed_url = parseURL(url);
            var scheme = parsed_url.scheme, host = parsed_url.host, path = parsed_url.path, query = parsed_url.query, fragment = parsed_url.fragment;
            if (!supportScheme(scheme)) {
                throw new Error("'" + scheme + "' isn't supported");
            }
            var port = parsed_url.port || getPortFromShceme(scheme);
            var socket = new Socket;
            if (!socket.open(host + ":" + port, 'BINARY')) {
                throw new Error('Unable to open socket');
            }
            var response;
            try {
                var request_1 = createRequest(method, path, host, options);
                socket.write(request_1);
                var http_response = '';
                while (!socket.eof) {
                    http_response += socket.read();
                }
                response = createResponse(http_response);
            }
            catch (e) {
                throw e;
            }
            finally {
                socket.close();
            }
            fn(response);
        }
        function get(url, fn) {
            request('GET', url, null, fn);
        }
        Request.get = get;
        function post(url, options, fn) {
            request('POST', url, options, fn);
        }
        Request.post = post;
    })(Request = KIKAKU.Request || (KIKAKU.Request = {}));
})(KIKAKU || (KIKAKU = {}));
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
        SettingManager.prototype["delete"] = function (key) {
            if (!this.have(key)) {
                return;
            }
            app.preferences.deletePref('Settings_' + this._section, key);
        };
        return SettingManager;
    }());
    KIKAKU.SettingManager = SettingManager;
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Timer;
    (function (Timer) {
        var rand = (function () {
            if (parseFloat(app.version) > 13.5 /* CC2015 */) {
                return generateRandomNumber;
            }
            return Math.random;
        })();
        function generateTimeoutID() {
            var s4 = function () {
                return Math.floor((1 + rand()) * 0x10000).toString(16).substring(1);
            };
            return "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }
        var TimerStore = (function () {
            function TimerStore() {
                this._store = {};
            }
            TimerStore.prototype.register = function (fn, delay, ctx) {
                var timeout_id = generateTimeoutID();
                var actual_id = app.scheduleTask("KIKAKU.Timer.execute(\"" + timeout_id + "\")", delay, false);
                this._store[timeout_id] = {
                    fn: fn,
                    ctx: ctx,
                    time: Date.now(),
                    delay: delay,
                    id: actual_id
                };
                return timeout_id;
            };
            TimerStore.prototype.unregister = function (id) {
                if (this._store[id]) {
                    app.cancelTask(this._store[id].id);
                    delete this._store[id];
                }
            };
            TimerStore.prototype.clean = function () {
                var now = Date.now();
                for (var id in this._store) {
                    var _a = this._store[id], time = _a.time, delay = _a.delay;
                    if (time + delay > now) {
                        delete this._store[id];
                    }
                }
            };
            TimerStore.prototype.execute = function (id) {
                if (this._store[id]) {
                    var _a = this._store[id], fn = _a.fn, ctx = _a.ctx;
                    try {
                        fn.call(ctx);
                    }
                    catch (e) {
                        alert(e);
                    }
                    finally {
                        this.unregister(id);
                    }
                }
                this.clean();
            };
            return TimerStore;
        }());
        var store = new TimerStore;
        function setTimeout(fn, delay, ctx) {
            return store.register(fn, delay, ctx);
        }
        Timer.setTimeout = setTimeout;
        function clearTimeout(id) {
            return store.unregister(id);
        }
        Timer.clearTimeout = clearTimeout;
        function execute(id) {
            return store.execute(id);
        }
        Timer.execute = execute;
        function debounce(fn, interval, ctx) {
            var timeout_id = '';
            return function () {
                clearTimeout(timeout_id);
                timeout_id = setTimeout(fn, interval, ctx);
            };
        }
        Timer.debounce = debounce;
    })(Timer = KIKAKU.Timer || (KIKAKU.Timer = {}));
})(KIKAKU || (KIKAKU = {}));
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
                    //pass
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
            this._name = name;
            this._value = value;
            if (KIKAKU.Utils.isFunction(options)) {
                this._options = KIKAKU.Utils.assign({}, ParameterBase.DEFAULT_OPTIONS, {
                    callback: options
                });
            }
            else {
                this._options = KIKAKU.Utils.assign({}, ParameterBase.DEFAULT_OPTIONS, options);
            }
        }
        ParameterBase.prototype.getHeight = function () { return Parameter.DEFAULT_HEIGHT; };
        ParameterBase.prototype.doAutoSave = function () { return KIKAKU.Utils.isUndefined(this._options.autoSave) ? true : this._options.autoSave; };
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
        return ParameterBase;
    }());
    ParameterBase.DEFAULT_HEIGHT = 24;
    ParameterBase.DEFAULT_OPTIONS = {
        title: true,
        helpTip: null,
        height: null,
        filter: null,
        stack: false,
        autoSave: true,
        callback: noop,
        onDoubleClick: noop,
        onChanging: noop,
        onEnterKey: noop,
        onActivate: noop,
        onDeactivate: noop
    };
    var Parameter = (function (_super) {
        __extends(Parameter, _super);
        function Parameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._initialized = function () { return false; };
            return _this;
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
    }(ParameterBase));
    var SingleParameter = (function (_super) {
        __extends(SingleParameter, _super);
        function SingleParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(Parameter));
    var MultipleParameter = (function (_super) {
        __extends(MultipleParameter, _super);
        function MultipleParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._uis = [];
            return _this;
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
    }(Parameter));
    var HeadingParameter = (function (_super) {
        __extends(HeadingParameter, _super);
        function HeadingParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(Parameter));
    var SeparatorParameter = (function (_super) {
        __extends(SeparatorParameter, _super);
        function SeparatorParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return SeparatorParameter;
    }(Parameter));
    SeparatorParameter.DEFAULT_HEIGHT = 12;
    var SpaceParameter = (function (_super) {
        __extends(SpaceParameter, _super);
        function SpaceParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(Parameter));
    var PanelParameter = (function (_super) {
        __extends(PanelParameter, _super);
        function PanelParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._stack = false;
            return _this;
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
    }(Parameter));
    var PanelEndParameter = (function (_super) {
        __extends(PanelEndParameter, _super);
        function PanelEndParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PanelEndParameter;
    }(ParameterBase));
    var GroupParameter = (function (_super) {
        __extends(GroupParameter, _super);
        function GroupParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GroupParameter.prototype.buildUI = function () { };
        return GroupParameter;
    }(Parameter));
    var GroupEndParameter = (function (_super) {
        __extends(GroupEndParameter, _super);
        function GroupEndParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GroupEndParameter;
    }(ParameterBase));
    //text parameter
    var TextBaseParameter = (function (_super) {
        __extends(TextBaseParameter, _super);
        function TextBaseParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBaseParameter.prototype.getCreationProperties = function () {
            return {};
        };
        TextBaseParameter.prototype.get = function () {
            return this._ui.text;
        };
        TextBaseParameter.prototype.set = function (value) {
            var text = String(value);
            if (text !== this.get()) {
                this._ui.text = text;
                this.onChange();
            }
        };
        return TextBaseParameter;
    }(SingleParameter));
    var TextsBaseParameter = (function (_super) {
        __extends(TextsBaseParameter, _super);
        function TextsBaseParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextsBaseParameter.prototype.getCreationProperties = function () {
            return {};
        };
        TextsBaseParameter.prototype.init = function (obj) {
            this.set(this._value);
            _super.prototype.init.call(this, obj);
        };
        TextsBaseParameter.prototype.get = function (index) {
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
        TextsBaseParameter.prototype.set = function (value_or_index, value2) {
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
        return TextsBaseParameter;
    }(MultipleParameter));
    var TextParameter = (function (_super) {
        __extends(TextParameter, _super);
        function TextParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
        return TextParameter;
    }(TextBaseParameter));
    var TextsParameter = (function (_super) {
        __extends(TextsParameter, _super);
        function TextsParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
        return TextsParameter;
    }(TextsBaseParameter));
    var TextAreaParameter = (function (_super) {
        __extends(TextAreaParameter, _super);
        function TextAreaParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return TextAreaParameter;
    }(TextParameter));
    TextAreaParameter.DEFAULT_HEIGHT = 80;
    var TextAreasParameter = (function (_super) {
        __extends(TextAreasParameter, _super);
        function TextAreasParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return TextAreasParameter;
    }(TextsParameter));
    TextAreasParameter.DEFAULT_HEIGHT = 80;
    var StaticTextParameter = (function (_super) {
        __extends(StaticTextParameter, _super);
        function StaticTextParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StaticTextParameter.prototype.buildParameter = function (width) {
            var group = this._group;
            var value = this._value || '';
            var text_ui = this._ui = group.add('statictext', undefined, value, this.getCreationProperties());
            if (this._options.helpTip) {
                text_ui.helpTip = this._options.helpTip;
            }
        };
        return StaticTextParameter;
    }(TextBaseParameter));
    var StaticTextsParameter = (function (_super) {
        __extends(StaticTextsParameter, _super);
        function StaticTextsParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StaticTextsParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            var help_tip = this._options.helpTip;
            KIKAKU.Utils.forEach(this._value, function (value, i) {
                var ui = group.add('statictext', undefined, '', _this.getCreationProperties());
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
    }(TextsBaseParameter));
    var StaticTextAreaParameter = (function (_super) {
        __extends(StaticTextAreaParameter, _super);
        function StaticTextAreaParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StaticTextAreaParameter.prototype.getCreationProperties = function () {
            return {
                multiline: true,
                truncate: 'end'
            };
        };
        StaticTextAreaParameter.prototype.getHeight = function () {
            var height = TextAreaParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = this._options.height;
            }
            return height;
        };
        return StaticTextAreaParameter;
    }(StaticTextParameter));
    StaticTextAreaParameter.DEFAULT_HEIGHT = 80;
    var StaticTextAreasParameter = (function (_super) {
        __extends(StaticTextAreasParameter, _super);
        function StaticTextAreasParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StaticTextAreasParameter.prototype.getCreationProperties = function () {
            return {
                multiline: true,
                truncate: 'end'
            };
        };
        StaticTextAreasParameter.prototype.getHeight = function () {
            var height = TextAreasParameter.DEFAULT_HEIGHT;
            if (KIKAKU.Utils.isNumber(this._options.height)) {
                height = this._options.height;
            }
            return height;
        };
        return StaticTextAreasParameter;
    }(StaticTextsParameter));
    StaticTextAreasParameter.DEFAULT_HEIGHT = 80;
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumberParameter.prototype.buildParameter = function (width) {
            var _this = this;
            var group = this._group;
            var minmax = extractNumberValue(this._value);
            this._minvalue = minmax.minvalue;
            this._maxvalue = minmax.maxvalue;
            var number_ui = this._ui = group.add('edittext', undefined, String(minmax.value));
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
    }(SingleParameter));
    var NumbersParameter = (function (_super) {
        __extends(NumbersParameter, _super);
        function NumbersParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._default_values = [];
            _this._minvalues = [];
            _this._maxvalues = [];
            return _this;
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
    }(MultipleParameter));
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
            return _super !== null && _super.apply(this, arguments) || this;
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
            var number_ui = this._number_ui = group.add('edittext', undefined, String(value.value));
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
    }(SingleParameter));
    //point parameter
    var PointParameterBase = (function (_super) {
        __extends(PointParameterBase, _super);
        function PointParameterBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._uis = [];
            return _this;
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
    }(SingleParameter));
    var PointParameter = (function (_super) {
        __extends(PointParameter, _super);
        function PointParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PointParameter;
    }(PointParameterBase));
    var Point3DParameter = (function (_super) {
        __extends(Point3DParameter, _super);
        function Point3DParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Point3DParameter.prototype.getDimensions = function () {
            return 3;
        };
        return Point3DParameter;
    }(PointParameterBase));
    //file parameter
    var FileParameter = (function (_super) {
        __extends(FileParameter, _super);
        function FileParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
            var filter = KIKAKU.Utils.isString(this._options.filter) ? this._options.filter : undefined;
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
    }(TextParameter));
    var FolderParameter = (function (_super) {
        __extends(FolderParameter, _super);
        function FolderParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
                if (folder && folder instanceof Folder) {
                    if (path_ui.text !== folder.absoluteURI) {
                        path_ui.text = folder.absoluteURI;
                        _this.onChange();
                    }
                }
            };
        };
        return FolderParameter;
    }(TextParameter));
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
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(SingleParameter));
    var CheckboxesParameter = (function (_super) {
        __extends(CheckboxesParameter, _super);
        function CheckboxesParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._texts = [];
            return _this;
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
    }(MultipleParameter));
    //radiobutton parameter
    var RadiobuttonParameter = (function (_super) {
        __extends(RadiobuttonParameter, _super);
        function RadiobuttonParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._uis = [];
            return _this;
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
    }(SingleParameter));
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorParameter.prototype.buildParameter = function () {
            var _this = this;
            var group = this._group;
            this._color = parseColor(this._value);
            var color_ui = this._ui = group.add('button', undefined);
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
    }(SingleParameter));
    var ColorsParameter = (function (_super) {
        __extends(ColorsParameter, _super);
        function ColorsParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._colors = [];
            return _this;
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
    }(MultipleParameter));
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
            //pass
        }
        finally {
            lock.lock = false;
            builder.update();
        }
    }
    var ItemParameter = (function (_super) {
        __extends(ItemParameter, _super);
        function ItemParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._lock = { lock: false };
            return _this;
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
    }(SingleParameter));
    var ItemsParameter = (function (_super) {
        __extends(ItemsParameter, _super);
        function ItemsParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._default_values = [];
            _this._locks = [];
            return _this;
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
                var items_3 = items2;
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    ui.removeAll();
                    for (var _i = 0, items_4 = items_3; _i < items_4.length; _i++) {
                        var item = items_4[_i];
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
                var items_5 = KIKAKU.Utils.isArray(items2) ? items2 : [items2];
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    for (var _i = 0, items_6 = items_5; _i < items_6.length; _i++) {
                        var item = items_6[_i];
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
                var item_1 = item2;
                processItemUI(this._uis[index], this._locks[index], this._builder, function (ui) {
                    ui.remove(item_1);
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
    }(MultipleParameter));
    var PopupParameter = (function (_super) {
        __extends(PopupParameter, _super);
        function PopupParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(ItemParameter));
    var PopupsParameter = (function (_super) {
        __extends(PopupsParameter, _super);
        function PopupsParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(ItemsParameter));
    var ListboxParameter = (function (_super) {
        __extends(ListboxParameter, _super);
        function ListboxParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return ListboxParameter;
    }(ItemParameter));
    ListboxParameter.DEFAULT_HEIGHT = 80;
    var ListboxesParameter = (function (_super) {
        __extends(ListboxesParameter, _super);
        function ListboxesParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
        return ListboxesParameter;
    }(ItemsParameter));
    ListboxesParameter.DEFAULT_HEIGHT = 80;
    //script
    var ScriptParameter = (function (_super) {
        __extends(ScriptParameter, _super);
        function ScriptParameter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._undo = true;
            return _this;
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
    }(Parameter));
    //help parameter
    var HelpParameter = (function (_super) {
        __extends(HelpParameter, _super);
        function HelpParameter() {
            return _super !== null && _super.apply(this, arguments) || this;
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
    }(ParameterBase));
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
                        //pass
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
            this._setting_manager["delete"](this._name);
        };
        UISettingManger.prototype["delete"] = function (key) {
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
    }());
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
                    //pass
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
        UIFileManager.prototype["delete"] = function (filename) {
            filename += '.' + this._file_type;
            return this._file_manager["delete"](filename);
        };
        return UIFileManager;
    }());
    UIFileManager.FILE_TYPE = {
        TEXT: 'txt',
        JSON: 'json'
    };
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
            this._events = {};
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
                case UIBuilder.PARAMETER_TYPE.STATICTEXTAREA:
                    this._parameters[name] = new StaticTextAreaParameter(name, value, options);
                    break;
                case UIBuilder.PARAMETER_TYPE.STATICTEXTAREAS:
                    this._parameters[name] = new StaticTextAreasParameter(name, value, options);
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
        UIBuilder.prototype.addHeading = function (name, title, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.HEADING, name, title, options);
        };
        UIBuilder.prototype.addSeparator = function (name) {
            return this.add(UIBuilder.PARAMETER_TYPE.SEPARATOR, name);
        };
        UIBuilder.prototype.addSpace = function (name, height) {
            return this.add(UIBuilder.PARAMETER_TYPE.SPACE, name, height);
        };
        UIBuilder.prototype.addPanel = function (name, title, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.PANEL, name, title, options);
        };
        UIBuilder.prototype.addPanelEnd = function (name) {
            return this.add(UIBuilder.PARAMETER_TYPE.PANEL_END, name);
        };
        UIBuilder.prototype.addGroup = function (name) {
            return this.add(UIBuilder.PARAMETER_TYPE.GROUP, name);
        };
        UIBuilder.prototype.addGroupEnd = function (name) {
            return this.add(UIBuilder.PARAMETER_TYPE.GROUP_END, name);
        };
        UIBuilder.prototype.addText = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.TEXT, name, initial_value, options);
        };
        UIBuilder.prototype.addTexts = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.TEXTS, name, initial_values, options);
        };
        UIBuilder.prototype.addTextarea = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.TEXTAREA, name, initial_value, options);
        };
        UIBuilder.prototype.addTextareas = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.TEXTAREAS, name, initial_values, options);
        };
        UIBuilder.prototype.addStatictext = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXT, name, initial_value, options);
        };
        UIBuilder.prototype.addStatictexts = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTS, name, initial_values, options);
        };
        UIBuilder.prototype.addStatictextArea = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTAREA, name, initial_value, options);
        };
        UIBuilder.prototype.addStatictextAreas = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.STATICTEXTAREAS, name, initial_values, options);
        };
        UIBuilder.prototype.addNumber = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.NUMBER, name, initial_value, options);
        };
        UIBuilder.prototype.addNumbers = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.NUMBERS, name, initial_values, options);
        };
        UIBuilder.prototype.addSlider = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.SLIDER, name, initial_value, options);
        };
        UIBuilder.prototype.addPoint = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.POINT, name, initial_value, options);
        };
        UIBuilder.prototype.addPoint3d = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.POINT3D, name, initial_value, options);
        };
        UIBuilder.prototype.addFile = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.FILE, name, initial_value, options);
        };
        UIBuilder.prototype.addFolder = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.FOLDER, name, initial_value, options);
        };
        UIBuilder.prototype.addCheckbox = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.CHECKBOX, name, initial_value, options);
        };
        UIBuilder.prototype.addCheckboxes = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.CHECKBOXES, name, initial_values, options);
        };
        UIBuilder.prototype.addRadiobutton = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.RADIOBUTTON, name, initial_values, options);
        };
        UIBuilder.prototype.addColor = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.COLOR, name, initial_value, options);
        };
        UIBuilder.prototype.addColors = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.COLORS, name, initial_values, options);
        };
        UIBuilder.prototype.addPopup = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.POPUP, name, initial_value, options);
        };
        UIBuilder.prototype.addPopups = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.POPUPS, name, initial_values, options);
        };
        UIBuilder.prototype.addListbox = function (name, initial_value, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.LISTBOX, name, initial_value, options);
        };
        UIBuilder.prototype.addListboxes = function (name, initial_values, options) {
            return this.add(UIBuilder.PARAMETER_TYPE.LISTBOXES, name, initial_values, options);
        };
        UIBuilder.prototype.addScript = function (name, value) {
            return this.add(UIBuilder.PARAMETER_TYPE.SCRIPT, name, value);
        };
        UIBuilder.prototype.addHelp = function (name, value) {
            return this.add(UIBuilder.PARAMETER_TYPE.HELP, name, value);
        };
        UIBuilder.prototype.api = function (name, fn) {
            UIBuilder.API.add(this.getName(), name, fn, this);
            return this;
        };
        UIBuilder.prototype.on = function (type, fn) {
            this._events[type] = true;
            this._event_dispatcher.addEventListener(type, fn, this);
            return this;
        };
        UIBuilder.prototype.off = function (type, fn) {
            this._event_dispatcher.removeEventListener(type, fn, this);
            return this;
        };
        UIBuilder.prototype.trigger = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._event_dispatcher.dispatchEvent.apply(this._event_dispatcher, [type].concat(args));
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
        UIBuilder.prototype.set = function (name, value_or_index, value2) {
            this.validateParameter(name);
            this._parameters[name].set(value_or_index, value2);
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
            this._setting_manager["delete"](key);
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
            return this._file_manager["delete"](filename);
        };
        UIBuilder.prototype.update = function () {
            if (!this._built()) {
                throw new Error('Not built yet');
            }
            var auto_save = this._options.autoSave;
            if (auto_save) {
                var parameters = {};
                for (var name in this._parameters) {
                    var parameter = this._parameters[name];
                    if (parameter.doAutoSave()) {
                        parameters[name] = parameter;
                    }
                }
                this._setting_manager.save(UIBuilder.PARAMETERS_KEY, parameters);
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
            //events
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
                _this.trigger(UIBuilder.EVENT_TYPE.INIT);
            };
            var _loop_1 = function (event_key) {
                var event_type = UIBuilder.EVENT_TYPE[event_key];
                if (event_type !== UIBuilder.EVENT_TYPE.INIT && event_type !== UIBuilder.EVENT_TYPE.CLOSE && this_1._events[event_type]) {
                    w.addEventListener(event_type, function (ev) {
                        if (!(w instanceof Panel) || ev.target === w) {
                            _this.trigger(event_type, ev);
                        }
                    });
                }
            };
            var this_1 = this;
            for (var event_key in UIBuilder.EVENT_TYPE) {
                _loop_1(event_key);
            }
            if (w instanceof Window) {
                w.onShow = function () { init(); };
                w.onClose = function () {
                    UIBuilder.API.remove(_this.getName());
                    _this.trigger(UIBuilder.EVENT_TYPE.CLOSE);
                };
                w.center();
                w.show();
            }
            else {
                w.layout.layout(true);
                init();
            }
        };
        return UIBuilder;
    }());
    UIBuilder.LIBRARY_NAME = 'KikakuUIBuilder';
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
        STATICTEXTAREA: 'statictextarea',
        STATICTEXTAREAS: 'statictextareas',
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
        HELP: 'help'
    };
    UIBuilder.EVENT_TYPE = {
        INIT: 'init',
        MOUSEDOWN: 'mousedown',
        MOUSEUP: 'mouseup',
        MOUSEMOVE: 'mousemove',
        MOUSEOVER: 'mouseover',
        MOUSEOUT: 'mouseout',
        CLOSE: 'close'
    };
    UIBuilder.PARAMETERS_KEY = '__parameters__';
    UIBuilder.SPACING_SIZE = 2;
    UIBuilder.MARGINS_SIZE = 5;
    UIBuilder.API = API;
    KIKAKU.UIBuilder = UIBuilder;
})(KIKAKU || (KIKAKU = {}));
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
        }());
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
        }());
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
                        //pass
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
                        var folder_item = void 0;
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
                        //pass
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
        }());
        Unit.Utility = Utility;
    })(Unit = KIKAKU.Unit || (KIKAKU.Unit = {}));
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Decorator;
    (function (Decorator) {
        function wrap(fn, ctx) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result, err = null;
            try {
                result = fn.call.apply(fn, [ctx].concat(args));
            }
            catch (e) {
                err = e;
            }
            return { result: result, err: err };
        }
        function debug(shouldDebug) {
            if (shouldDebug === void 0) { shouldDebug = true; }
            return function (proto, name) {
                if (shouldDebug) {
                    var fn_1 = proto[name];
                    proto[name] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        $.writeln(name + " in: " + args.join());
                        $.hiresTimer;
                        var _a = wrap.apply(void 0, [fn_1, this].concat(args)), result = _a.result, err = _a.err;
                        $.writeln(name + " out: " + result);
                        $.writeln("Elapsed Time: " + $.hiresTimer / 1000 + "ms");
                        if (err) {
                            throw err;
                        }
                        return result;
                    };
                }
            };
        }
        Decorator.debug = debug;
        function undo(text) {
            return function (proto, name) {
                var fn = proto[name];
                proto[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    app.beginUndoGroup("" + text);
                    var _a = wrap.apply(void 0, [fn, this].concat(args)), result = _a.result, err = _a.err;
                    app.endUndoGroup();
                    if (err) {
                        throw err;
                    }
                    return result;
                };
            };
        }
        Decorator.undo = undo;
    })(Decorator = KIKAKU.Decorator || (KIKAKU.Decorator = {}));
})(KIKAKU || (KIKAKU = {}));
var KIKAKU;
(function (KIKAKU) {
    var Xorshift = (function () {
        function Xorshift(seed) {
            this._x = 123456789;
            this._y = 362436069;
            this._z = 521288629;
            this._w = 88675123;
            if (typeof seed !== 'undefined') {
                this._w = Math.max(0, ~~seed);
            }
        }
        Xorshift.prototype.random = function (mn, mx) {
            if (mn === void 0) { mn = 0; }
            if (mx === void 0) { mx = 1; }
            var _a = [this._x ^ (this._x << 11), this._w], t = _a[0], w = _a[1];
            _b = [this._y, this._z, this._w, (w ^ (w >> 19)) ^ (t ^ (t >> 8))], this._x = _b[0], this._y = _b[1], this._z = _b[2], this._w = _b[3];
            return mn + this._w / Xorshift.MAX * (mx - mn);
            var _b;
        };
        return Xorshift;
    }());
    Xorshift.MAX = Math.pow(2, 31);
    KIKAKU.Xorshift = Xorshift;
})(KIKAKU || (KIKAKU = {}));
/// <reference path="KikakuConfig.ts" />
/// <reference path="KikakuJSON.ts" />
/// <reference path="KikakuUtils.ts" />
/// <reference path="KikakuWrapper.ts" />
/// <reference path="KikakuEventDispatcher.ts" />
/// <reference path="KikakuFileManager.ts" />
/// <reference path="KikakuRequest.ts" />
/// <reference path="KikakuSettingManager.ts" />
/// <reference path="KikakuTimer.ts" />
/// <reference path="KikakuUIBuilder.ts" />
/// <reference path="KikakuUnit.ts" />
/// <reference path="KikakuDecorator.ts" />
/// <reference path="KikakuXorshift.ts" /> 
