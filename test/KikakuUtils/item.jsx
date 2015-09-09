/// <reference path="../../dest/Kikaku.d.ts" />

(function () {

	var Unit = KIKAKU.Unit;
	var Utils = KIKAKU.Utils;

	var FOLDER_PATH = new File($.fileName).parent.absoluteURI;
	var STILL_IMAGE_PATH = FOLDER_PATH + '/resources/av_item.png';

	Unit.test('Utils/item/isItem', {
		before: function (utility) {
			utility.addFootageItem('Footage Item', STILL_IMAGE_PATH);
			utility.addCompItem('Comp Item');
			utility.addFolderItem('Folder Item');
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
			'isFootageItem': function (assert, utility) {
				var fn = Utils.isFootageItem;
				assert.ok(fn(utility.getItem('Footage Item')));
				assert.notOk(fn(utility.getItem('Comp Item')));
				assert.notOk(fn(utility.getItem('Folder Item')));
			},
			'isCompItem': function (assert, utility) {
				var fn = Utils.isCompItem;
				assert.notOk(fn(utility.getItem('Footage Item')));
				assert.ok(fn(utility.getItem('Comp Item')));
				assert.notOk(fn(utility.getItem('Folder Item')));
			},
			'isAVItem': function (assert, utility) {
				var fn = Utils.isAVItem;
				assert.ok(fn(utility.getItem('Footage Item')));
				assert.ok(fn(utility.getItem('Comp Item')));
				assert.notOk(fn(utility.getItem('Folder Item')));
			},
			'isFolderItem': function (assert, utility) {
				var fn = Utils.isFolderItem;
				assert.notOk(fn(utility.getItem('Footage Item')));
				assert.notOk(fn(utility.getItem('Comp Item')));
				assert.ok(fn(utility.getItem('Folder Item')));
			}
		}
		);

	Unit.test('Utils/item/forEachItem', {
		before: function (utility) {
			utility.addFootageItem('Footage Item', STILL_IMAGE_PATH);
			utility.addCompItem('Comp Item');
			utility.addFolderItem('Folder Item');
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
			'forEachItem': function (assert, utility) {
				var expected = ['Comp Item 1', 'Folder Item 2', 'Footage Item 3'];
				var result = [];
				Utils.forEachItem(function (item, i) {
					item.name += ' ' + i;
					result.push(item.name);
				});
				assert.equal(result, expected);
			}
		}
		);

	Unit.test('Utils/item/forEachItemInFolderItem', {
		before: function (utility) {
			var folder = utility.addFolderItem('Folder Item');
			var footage = utility.addFootageItem('Footage Item', STILL_IMAGE_PATH);
			footage.parentFolder = folder;
			var comp = utility.addCompItem('Comp Item');
			comp.parentFolder = folder;
		},
		after: function (utility) {
			utility.removeAll();
		}
	}, {
			'forEachItemInFolderItem': function (assert, utility) {
				var expected = ['Comp Item 1', 'Footage Item 2'];
				var result = [];
				Utils.forEachItemInFolderItem(utility.getItem('Folder Item'), function (item, i) {
					item.name += ' ' + i;
					result.push(item.name);
				});
				assert.equal(result, expected);
			}
		}
		);
		
})(this);