/// <reference path="../../dest/Kikaku.d.ts" />

(function () {

	var Unit = KIKAKU.Unit;
	var Utils = KIKAKU.Utils;

	Unit.test('Utils/property/isProperty', {
		before: function (utility) {
			//comp
			utility.addCompItem('Comp');
			
			//layer
			var layer = utility.addSolidLayer('Comp', 'Layer');
			var mask_parade = layer.property('ADBE Mask Parade');
			mask_parade.addProperty('ADBE Mask Atom');
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
			'isProperty': function (assert, utility) {
				var fn = Utils.isProperty;
				
				var layer = utility.getLayer('Layer');
				var transform = layer.property('ADBE Transform Group');
				var position = transform.property('ADBE Position');
				var mask_parade = layer.property('ADBE Mask Parade');
				var mask_atom = mask_parade.property('ADBE Mask Atom');
				assert.notOk(fn(transform));
				assert.ok(fn(position));
				assert.notOk(fn(mask_parade));
				assert.notOk(fn(mask_atom));
			},
			'isPropertyGroup': function (assert, utility) {
				var fn = Utils.isPropertyGroup;

				var layer = utility.getLayer('Layer');
				var transform = layer.property('ADBE Transform Group');
				var position = transform.property('ADBE Position');
				var mask_parade = layer.property('ADBE Mask Parade');
				var mask_atom = mask_parade.property('ADBE Mask Atom');
				assert.ok(fn(transform));
				assert.notOk(fn(position));
				assert.ok(fn(mask_parade));
				assert.ok(fn(mask_atom));
			},
			'isHiddenProperty': function (assert, utility) {
				var layer = utility.getLayer('Layer');
				var transform = layer.property('ADBE Transform Group');
				var position = transform.property('ADBE Position');
				var remap = layer.property('ADBE Time Remapping');
				assert.notOk(Utils.isHiddenProperty(transform));
				assert.ok(Utils.isHiddenProperty(remap));
			}
		}
		);

})(this);