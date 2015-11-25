/// <reference path="../../typings/aftereffects/ae.d.ts" />

namespace KIKAKU.Utils {

  export function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]';
  }

  export function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }

  export function isFunction(arg) {
    return Object.prototype.toString.call(arg) === '[object Function]';
  }

  export function isString(arg) {
    return Object.prototype.toString.call(arg) === '[object String]';
  }

  export function isNumber(arg) {
    return Object.prototype.toString.call(arg) === '[object Number]';
  }

  export function isBoolean(arg) {
    return Object.prototype.toString.call(arg) === '[object Boolean]';
  }

  export function isUndefined(arg) {
    return typeof arg === 'undefined';
  }

  export function keys(obj: Object) {
    const arr = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }

  export function values(obj: Object) {
    const arr = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
      }
    }
    return arr;
  }

  export function forEach(obj, fn: ((value, index?: number) => any) | ((value, key?: string) => any), ctx?) {
    if (isArray(obj) || isString(obj)) {
      for (let i = 0, l = (<any[] | string>obj).length; i < l; i++) {
        fn.call(ctx, obj[i], i);
      }
    } else if (isObject(obj)) {
      for (let key in obj) {
        fn.call(ctx, obj[key], key);
      }
    }
  }

  export function inherits(child, parent) {
    let F = function() { };
    F.prototype = parent.prototype;
    child.prototype = new F;
    child.super = parent;
    child.uber = parent.prototype;
    child.prototype.constructor = child;
  }

  export function assign(obj, ...args) {
    obj = Object(obj);

    for (let arg of args) {
      if (!isObject(arg)) {
        continue;
      }

      for (let key in arg) {
        if ((<Object>arg).hasOwnProperty(key)) {
          obj[key] = arg[key];
        }
      }
    }

    return obj;
  }

  export function map<T, U>(arr: T[], fn: (T, index?: number) => U, ctx?) {
    let result: U[] = [];
    forEach(arr, (v: T, i: number) => {
      result.push(fn.call(ctx, v, i));
    });

    return result;
  }

  export function reduce<T, U>(arr: T[], fn: (prev: U, cur: T, index?: number, arr?: T[]) => U, initial_value?: U) {
    const l = arr.length;
    if (!l) {
      if (isUndefined(initial_value)) {
        throw new Error('Reduce of empty array with no initial value');
      }
      return initial_value;
    }

    let i = 0;
    let value;
    if (isUndefined(initial_value)) {
      value = arr[0];
      ++i;
    } else {
      value = initial_value;
    }

    while (i < l) {
      value = fn(value, arr[i], i, arr);
      ++i;
    }

    return value;
  }

  export function filter<T>(arr: T[], fn: (value: T, index?: number) => boolean, ctx?) {
    let result: T[] = [];
    forEach(arr, (v, i: number) => {
      if (fn.call(ctx, v, i)) {
        result.push(v);
      }
    });
    return result;
  }

  export function some<T>(arr: T[], fn: (value: T) => boolean, ctx?) {
    for (let i = 0, l = arr.length; i < l; i++) {
      if (fn.call(ctx, arr[i])) {
        return true;
      }
    }
    return false;
  }

  export function every<T>(arr: T[], fn: (value: T) => boolean, ctx?) {
    for (let i = 0, l = arr.length; i < l; i++) {
      if (!fn.call(ctx, arr[i])) {
        return false;
      }
    }
    return true;
  }

  export function inArray<T>(arr: T[], fn: (T) | ((v: T) => boolean), ctx?) {
    let _fn: (v: T) => boolean = isFunction(fn) ? <(v: T) => boolean>fn : (v: T) => { return v === fn; };
    for (let i = 0, l = arr.length; i < l; i++) {
      if (_fn.call(ctx, arr[i])) {
        return i;
      }
    }

    return -1;
  }

  export function find<T>(arr: T[], fn: (v: T) => boolean, ctx?) {
    let index = inArray(arr, fn, ctx);
    if (index >= 0) {
      return arr[index];
    }
    return null;
  }

  export function unique<T>(arr: T[]): T[] {
    let result: T[] = [];
    forEach(arr, (v: T, i: number) => {
      if (inArray(result, v) === -1) {
        result.push(v);
      }
    });
    return result;
  }

  export function clamp(value: number, mn = 0, mx = 1) {
    if (value < mn) {
      return mn;
    } else if (value > mx) {
      return mx;
    }
    return value;
  }

  export function trim(str: string) {
    return str.replace(/(^\s+)|(\s+$)/g, '');
  }

  export function startsWith(str: string, search: string, position = 0) {
    return str.lastIndexOf(search, position) === position;
  }
  
  export function endsWith(str: string, search: string, position = str.length) {
    position = position - search.length;
    return str.lastIndexOf(search) === position;
  }

}