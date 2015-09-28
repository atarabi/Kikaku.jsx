/// <reference path="../../dest/Kikaku.d.ts" />

(function () {

	var Unit = KIKAKU.Unit;
	var Utils = KIKAKU.Utils;
	
	Unit.test('Utils/utility', {
		'isObject': function (assert) {
			var fn = Utils.isObject;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.ok(fn({}));
			assert.notOk(fn([]));
			assert.notOk(fn(function () { }));
			assert.notOk(fn(1));
			assert.notOk(fn(true));
			assert.notOk(fn('text'));
		},
		'isArray': function (assert) {
			var fn = Utils.isArray;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.ok(fn([]));
			assert.notOk(fn(function () { }));
			assert.notOk(fn(1));
			assert.notOk(fn(true));
			assert.notOk(fn('text'));
		},
		'isFunction': function (assert) {
			var fn = Utils.isFunction;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.notOk(fn([]));
			assert.ok(fn(function () { }));
			assert.notOk(fn(1));
			assert.notOk(fn(true));
			assert.notOk(fn('text'));
		},
		'isString': function (assert) {
			var fn = Utils.isString;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.notOk(fn([]));
			assert.notOk(fn(function () { }));
			assert.notOk(fn(1));
			assert.notOk(fn(true));
			assert.ok(fn('text'));
		},
		'isNumber': function (assert) {
			var fn = Utils.isNumber;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.notOk(fn([]));
			assert.notOk(fn(function () { }));
			assert.ok(fn(1));
			assert.notOk(fn(true));
			assert.notOk(fn('text'));
		},
		'isBoolean': function (assert) {
			var fn = Utils.isBoolean;
			assert.notOk(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.notOk(fn([]));
			assert.notOk(fn(function () { }));
			assert.notOk(fn(1));
			assert.ok(fn(true));
			assert.notOk(fn('text'));
		},
		'isUndefined': function (assert) {
			var fn = Utils.isUndefined;
			assert.ok(fn(void 0));
			assert.notOk(fn(null));
			assert.notOk(fn({}));
			assert.notOk(fn([]));
			assert.notOk(fn(function () { }));
			assert.notOk(fn(1));
			assert.notOk(fn(true));
			assert.notOk(fn('text'));
		},
		'keys': function (assert) {
			var obj = {
				hoge: null,
				3: 0,
				test: 'hoge'
			};
			assert.equal(Utils.keys(obj), ['hoge', '3', 'test']);
		},
		'values': function (assert) {
			var obj = {
				a: null,
				b: undefined,
				c: 100,
				d: 'hoge',
				e: function () {}
			};
			assert.equal(Utils.values(obj), [null, undefined, 100, 'hoge', function () {}]);
		},
		'forEach': function (assert) {
			var arr = [1, 2, 3, 4];
			var result = [];
			var result2 = [];
			Utils.forEach(arr, function (v, i) {
				result.push(v * 2);
				result2.push(i);
			});
			assert.equal(result, [2, 4, 6, 8]);
			assert.equal(result2, [0, 1, 2, 3]);
		},
		'inherits': function (assert) {
			function Parent() { }
			Parent.prototype.method1 = function () { return true; };

			function Child() { }
			Utils.inherits(Child, Parent);

			var child = new Child;
			assert.ok(child.method1 === Parent.prototype.method1);
		},
		'assign': function (assert) {
			assert.equal(Utils.assign({}, {1: 0, a: 3}), {1: 0, a: 3});
			assert.equal(Utils.assign({1: 0, a: 3}, {b: 4, 3: 2}), {1: 0, a: 3, b: 4, 3: 2});
		},
		'map': function (assert) {
			var arr = [1, 2, 3, 4];
			var result = Utils.map(arr, function (v) {
				return v * v;
			});
			assert.equal(result, [1, 4, 9, 16]);
			result = Utils.map(arr, function (v, i) {
				return i;
			});
			assert.equal(result, [0, 1, 2, 3]);
		},
		'reduce': function (assert) {
			var arr = [1, 2, 3, 4];
			var result = Utils.reduce(arr, function (prev, cur) {
				return prev + cur;
			});
			assert.equal(result, 10);
			
			result = Utils.reduce(arr, function (prev, cur) {
				return prev + cur;
			}, 100);
			assert.equal(result, 110);
		},
		'filter': function (assert) {
			var arr = [-5, 0, 10, 20];
			var result = Utils.filter(arr, function (v) {
				return v > 0;
			});
			assert.equal(result, [10, 20]);
		},
		'some': function (assert) {
			var arr = [-10, 0, 100];
			var result = Utils.some(arr, function (v) {
				return v > 0;
			});
			assert.ok(result);
			result = Utils.some(arr, function (v) {
				return v < -100;
			});
			assert.notOk(result);
		},
		'every': function (assert) {
			var arr = [0, 10, 100];
			var result = Utils.every(arr, function (v) {
				return v >= 0;
			});
			assert.ok(result);
			result = Utils.every(arr, function (v) {
				return v > 0;
			});
			assert.notOk(result);
		},
		'inArray': function (assert) {
			var arr = [0, 10, 100, 400, -2, 10];
			var result = Utils.inArray(arr, function (v) {
				return v < 0;
			});
			assert.equal(result, 4);
			result = Utils.inArray(arr, function (v) {
				return v < -100;
			});
			assert.equal(result, -1);
		},
		'find': function (assert) {
			var arr = [0, 10, 100, 400, -2, 10];
			var result = Utils.find(arr, function (v) {
				return v < 0;
			});
			assert.equal(result, -2);
			result = Utils.find(arr, function (v) {
				return v < -100;
			});
			assert.equal(result, null);
		},
		'unique': function (assert) {
			var arr = [1, 2, 3, 4, 3, 5, 4];
			var result = Utils.unique(arr, function (v) {
				return v * v;
			});
			assert.equal(result, [1, 2, 3, 4, 5]);
		},
		'clamp': function (assert) {
			assert.equal(Utils.clamp(-10), 0);
			assert.equal(Utils.clamp(100), 1);
			assert.equal(Utils.clamp(100, 0, 20), 20);
			assert.equal(Utils.clamp(-1000, -10, 20), -10);
			assert.equal(Utils.clamp(30, -10, 50), 30);
		},
		'trim': function (assert) {
			var text = ' asad  asda ';
			assert.equal(Utils.trim(text), 'asad  asda');
		}
	});

})(this);