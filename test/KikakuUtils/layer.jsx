/// <reference path="../../dest/Kikaku.d.ts" />

(function () {

	var Unit = KIKAKU.Unit;
	var Utils = KIKAKU.Utils;

	var FOLDER_PATH = new File($.fileName).parent.absoluteURI;
	var STILL_IMAGE_PATH = FOLDER_PATH + '/resources/av_item.png';

	Unit.test('Utils/layer/isLayer', {
		before: function (utility) {
			//comp
			utility.addCompItem('Comp');
			utility.addCompItem('Comp Item');
			utility.addFootageItem('Footage Item', STILL_IMAGE_PATH);
			
			//layer
			utility.addTextLayer('Comp', 'Text Layer');
			utility.addShapeLayer('Comp', 'Shape Layer');
			utility.addAVLayer('Comp', 'Footage Layer', 'Footage Item');
			utility.addCameraLayer('Comp', 'Camera Layer');
			utility.addLightLayer('Comp', 'Light Layer');
			utility.addNullLayer('Comp', 'Null Layer');
			utility.addSolidLayer('Comp', 'Solid Layer');
			utility.addAVLayer('Comp', 'Comp Layer', 'Comp Item');
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
      'isLayer': function (assert, utility) {
				var fn = Utils.isLayer;
				assert.ok(fn(utility.getLayer('Text Layer')));
				assert.ok(fn(utility.getLayer('Shape Layer')));
				assert.ok(fn(utility.getLayer('Footage Layer')));
				assert.ok(fn(utility.getLayer('Camera Layer')));
				assert.ok(fn(utility.getLayer('Light Layer')));
				assert.ok(fn(utility.getLayer('Null Layer')));
				assert.ok(fn(utility.getLayer('Solid Layer')));
				assert.ok(fn(utility.getLayer('Comp Layer')));
			},
			'isTextLayer': function (assert, utility) {
				var fn = Utils.isTextLayer;
				assert.ok(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.notOk(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isShapeLayer': function (assert, utility) {
				var fn = Utils.isShapeLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.ok(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.notOk(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isAVLayer': function (assert, utility) {
				var fn = Utils.isAVLayer;
				assert.ok(fn(utility.getLayer('Text Layer')));
				assert.ok(fn(utility.getLayer('Shape Layer')));
				assert.ok(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.ok(fn(utility.getLayer('Null Layer')));
				assert.ok(fn(utility.getLayer('Solid Layer')));
				assert.ok(fn(utility.getLayer('Comp Layer')));
			},
			'isCameraLayer': function (assert, utility) {
				var fn = Utils.isCameraLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.ok(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.notOk(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isNullLayer': function (assert, utility) {
				var fn = Utils.isNullLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.ok(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isSolidLayer': function (assert, utility) {
				var fn = Utils.isSolidLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.ok(fn(utility.getLayer('Null Layer')));
				assert.ok(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isFileLayer': function (assert, utility) {
				var fn = Utils.isFileLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.ok(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.notOk(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isStillLayer': function (assert, utility) {
				var fn = Utils.isStillLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.ok(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.ok(fn(utility.getLayer('Null Layer')));
				assert.ok(fn(utility.getLayer('Solid Layer')));
				assert.notOk(fn(utility.getLayer('Comp Layer')));
			},
			'isCompLayer': function (assert, utility) {
				var fn = Utils.isCompLayer;
				assert.notOk(fn(utility.getLayer('Text Layer')));
				assert.notOk(fn(utility.getLayer('Shape Layer')));
				assert.notOk(fn(utility.getLayer('Footage Layer')));
				assert.notOk(fn(utility.getLayer('Camera Layer')));
				assert.notOk(fn(utility.getLayer('Light Layer')));
				assert.notOk(fn(utility.getLayer('Null Layer')));
				assert.notOk(fn(utility.getLayer('Solid Layer')));
				assert.ok(fn(utility.getLayer('Comp Layer')));
			}
		}
		);
		
	Unit.test('Utils/layer/forEach', {
		before: function (utility) {
			//comp
			utility.addCompItem('Comp');
			
			//layer
			utility.addTextLayer('Comp', 'Layer 1');
			utility.addShapeLayer('Comp', 'Layer 2');
			utility.addCameraLayer('Comp', 'Layer 3');
			utility.addLightLayer('Comp', 'Layer 4');
			utility.addNullLayer('Comp', 'Layer 5');
			var layer = utility.addSolidLayer('Comp', 'Layer 6');
			layer.Effects.addProperty('CC Composite');
			layer.Effects.addProperty('CC Force Motion Blur');
			
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
			'forEachLayer': function (assert, utility) {
				var names = [];
				var indices = [];
				Utils.forEachLayer(utility.getItem('Comp'), function(layer, i) {
					names.push(layer.name);
					indices.push(i);
				});
				
				assert.equal(names, ['Layer 6', 'Layer 5', 'Layer 4', 'Layer 3', 'Layer 2', 'Layer 1']);
				assert.equal(indices, [1, 2, 3, 4, 5, 6]);
			},
			'forEachPropertyGroup': function (assert, utility) {
				var layer = utility.getLayer('Layer 6');
				var names = [];
				var indices = [];
				Utils.forEachPropertyGroup(layer, function(property, i) {
					names.push(property.matchName);
					indices.push(i);
				});
				
				assert.equal(names, ['ADBE Marker', 'ADBE Time Remapping', 'ADBE MTrackers', 'ADBE Mask Parade', 'ADBE Effect Parade', 'ADBE Transform Group', 'ADBE Layer Styles', 'ADBE Plane Options Group', 'ADBE Extrsn Options Group', 'ADBE Material Options Group', 'ADBE Audio Group']);
				assert.equal(indices, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
				
				names = [];
				indices = [];
				Utils.forEachPropertyGroup(layer.Transform, function(property, i) {
					names.push(property.matchName);
					indices.push(i);
				});
				
				assert.equal(names, ['ADBE Anchor Point', 'ADBE Position', 'ADBE Position_0', 'ADBE Position_1', 'ADBE Position_2', 'ADBE Scale', 'ADBE Orientation', 'ADBE Rotate X', 'ADBE Rotate Y', 'ADBE Rotate Z', 'ADBE Opacity', 'ADBE Envir Appear in Reflect']);
				assert.equal(indices, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
			},
			'forEachEffect': function (assert, utility) {
				var layer = utility.getLayer('Layer 6');
				var names = [];
				var indices = [];
				Utils.forEachEffect(layer, function(effect, i) {
					names.push(effect.matchName);
					indices.push(i);
				});
				
				assert.equal(names, ['CC Composite', 'CC Force Motion Blur']);
				assert.equal(indices, [1, 2]);
			},
		}
		);

})(this);