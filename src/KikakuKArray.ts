namespace KIKAKU {

  export class KArray<T> {
    static from<U>(arr: U[]) {
      return new KArray(arr);
    }
    static of<U>(...items: U[]) {
      return new KArray(items);
    }
    constructor(protected _arr: T[]) { }
    get() {
      return this._arr;
    }
    at(index :number) {
      return this._arr[index];
    }
    length() {
      return this._arr.length;
    }
    //Mutator
    copyWithin(target: number, start: number, end: number = this._arr.length) {
      const len = this._arr.length;
      let to = target < 0 ? Math.max(len + target, 0) : Math.min(target, len);
      let from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
      let last = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
      let count = Math.min(last - from, len - to);
      let direction = 1;
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
    }
    fill(value: T, start = 0, end = this._arr.length) {
      const len = this._arr.length;
      let k = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
      let last = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
      for (; k < last; ++k) {
        this._arr[k] = value;
      }
      return this;
    }
    pop() {
      return this._arr.pop();
    }
    push(...items: T[]) {
      return this._arr.push(...items);
    }
    reverse() {
      this._arr.reverse();
      return this;
    }
    shift() {
      return this._arr.shift();
    }
    sort(cmp?: (lhs: T, rhs: T) => number) {
      this._arr.sort(cmp);
      return this;
    }
    splice(start?: number, deleteCount?: number, ...items: T[]) {
      this._arr.splice(start, deleteCount, ...items);
      return this;
    }
    unshift(...items: T[]) {
      return this._arr.unshift(...items);
    }
    //Accessor
    concat(...items: T[]) {
      return new KArray(this._arr.concat(...items));
    }
    includes(searchElement: T, fromIndex = 0) {
      const len = this._arr.length;
      let k = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);
      for (; k < len; ++k) {
        if (searchElement === this._arr[k]) {
          return true;
        }
      }
      return false;
    }
    join(sepqrator?: string) {
      return this._arr.join(sepqrator);
    }
    slice(start?: number, end?: number) {
      return new KArray(this._arr.slice(start, end));
    }
    toSource(): string {
      return (<any>this._arr).toSource();
    }
    toString() {
      return this._arr.toString();
    }
    toLocaleString() {
      return this._arr.toLocaleString();
    }
    indexOf(searchElement: T, fromIndex?: number): number {
      const len = this._arr.length;
      if (len === 0) {
        return -1;
      }

      let n = fromIndex !== void 0 ? fromIndex : 0;
      if (n >= len) {
        return -1;
      }

      let k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; ++k) {
        if (this._arr[k] === searchElement) {
          return k;
        }
      }

      return -1;
    }
    lastIndexOf(searchElement: T, fromIndex?: number): number {
      const len = this._arr.length;
      if (len === 0) {
        return -1;
      }

      let n = fromIndex !== void 0 ? fromIndex : len;

      let k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
      for (; k >= 0; --k) {
        if (this._arr[k] === searchElement) {
          return k;
        }
      }

      return -1;
    }
    //iteration
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) {
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        callbackfn.call(thisArg, this._arr[k], k, this._arr);
      }
    }
    entries() {
      let arr: [number, T][] = [];
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        arr.push([k, this._arr[k]]);
      }
      return new KArray(arr);
    }
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        if (!callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
          return false;
        }
      }
      return true;
    }
    keys() {
      let arr: number[] = [];
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        arr.push(k);
      }
      return new KArray(arr);
    }
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
      let arr: U[] = [];
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        arr.push(callbackfn.call(thisArg, this._arr[k], k, this._arr));
      }
      return new KArray(arr);
    }
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
          return true;
        }
      }
      return false;
    }
    filter<U extends T>(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
      let arr: U[] = [];
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
          arr.push(<U>this._arr[k]);
        }
      }
      return new KArray(arr);
    }
    find(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
          return this._arr[k];
        }
      }
      return void 0;
    }
    findIndex(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any) {
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        if (callbackfn.call(thisArg, this._arr[k], k, this._arr)) {
          return k;
        }
      }
      return -1;
    }
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U {
      const len = this._arr.length;
      let k = 0;
      let value: U;
      if (initialValue === void 0) {
        if (len === 0) {
          throw new TypeError();
        }
        value = <U>(<any>this._arr[k++]);
      }
      for (; k < len; ++k) {
        value = callbackfn.call(undefined, value, this._arr[k], k, this._arr);
      }
      return value;
    }
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U {
      const len = this._arr.length;
      let k = len - 1;
      let value: U;
      if (initialValue === void 0) {
        if (len === 0) {
          throw new TypeError();
        }
        value = <U>(<any>this._arr[k--]);
      }
      for (; k >= 0; --k) {
        value = callbackfn.call(undefined, value, this._arr[k], k, this._arr);
      }
      return value;
    }
    values() {
      let arr: T[] = [];
      for (let k = 0, len = this._arr.length; k < len; ++k) {
        arr.push(this._arr[k]);
      }
      return new KArray(arr);
    }
  }
  
}