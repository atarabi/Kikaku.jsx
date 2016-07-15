namespace KIKAKU {

  export class Xorshift {
    static MAX = Math.pow(2, 31); 
    private _x = 123456789;
    private _y = 362436069;
    private _z = 521288629;
    private _w = 88675123;
    constructor(seed?: number) {
      if (typeof seed !== 'undefined') {
        this._w = Math.max(0, ~~seed);
      }
    }
    random(mn = 0, mx = 1) {
      const [t, w] = [this._x ^ (this._x << 11), this._w];
      [this._x, this._y, this._z, this._w] = [this._y, this._z, this._w, (w ^ (w >> 19)) ^ (t ^ (t >> 8))];
      return mn + this._w / Xorshift.MAX * (mx - mn);
    }
  }

}