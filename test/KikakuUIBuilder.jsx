(function (global) {
  
  //Lib
  var UIBuilder = KIKAKU.UIBuilder,
    Unit = KIKAKU.Unit;

  var builder = new UIBuilder(global, 'UIBuilder Test', { version: '1.0.0', author: 'Atarabi', url: 'http://atarabi.com/', width: 300 });

  builder
    .add('heading', 'Heading', 'UI Buildet Test')
    .add('separator', 'Separator')
    .add('space', 'Space', 10)
    .add('panel', 'Panel')
    .add('panelend', 'Panelend')
    .add('text', 'Text', 'text')
    .add('texts', 'Texts', ['text1', 'text2'])
    .add('textarea', 'Textarea', 'textarea')
    .add('textareas', 'Textareas', ['textarea1', 'textarea2'])
    .add('statictext', 'Statictext', 'statictext')
    .add('statictexts', 'Statictexts', ['statictext1', 'statictext2'])
    .add('number', 'Number', 0)
    .add('number', 'Number with MinMax', { value: 0, minvalue: 0, maxvalue: 100 })
    .add('numbers', 'Numbers', [0, { value: 0, minvalue: -100, maxvalue: 100 }])
    .add('slider', 'Slider', { value: 0, minvalue: -500, maxvalue: 500 })
    .add('point', 'Point', [0, 0])
    .add('point3d', 'Point3d', [640, 360, 0])
    .add('file', 'File', '~/')
    .add('folder', 'Folder', '~/')
    .add('checkbox', 'Checkbox', true)
    .add('checkboxes', 'Checkboxes', [{ text: 'A', value: false }, { text: 'B', value: true }])
    .add('radiobutton', 'Radiobutton', ['Radio 1', 'Radio 2', 'Radio 3'])
    .add('color', 'Color', [1, 0, 0])
    .add('colors', 'Colors', [[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    .add('popup', 'Popup', ['Popup 1', 'Popup 2', 'Popup 3'])
    .add('popups', 'Popups', [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']])
    .add('listbox', 'Listbox', ['Listbox 1', 'Listbox 2', 'Listbox 3'])
    .add('listboxes', 'Listboxes', [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']])
    .add('script', 'Test', function () {
      var builder = this;

      Unit.test('Text test', {
        beforeEach: function () {
          builder.set('Text', '');
        }
      }, {
          'get and set': function (assert) {
            var expected = 'This is\n test';
            builder.set('Text', expected);
            assert.equal(builder.get('Text'), expected);
          },
        });

      Unit.test('Texts test', {
        beforeEach: function () {
          builder.set('Texts', ['', '']);
        }
      }, {
          'index': function (assert) {
            var expected = 'This is test';
            builder.set('Texts', 0, expected);
            assert.equal(builder.get('Texts', 0), expected);

            expected = 'This is\n test2';
            builder.set('Texts', 1, expected);
            assert.equal(builder.get('Texts', 1), expected);
          },
          'array': function (assert) {
            var expected = ['This is test', 'This is test2'];
            builder.set('Texts', expected);
            assert.equal(builder.get('Texts'), expected);
          },
        });

      Unit.test('Textarea test', {
        beforeEach: function () {
          builder.set('Textarea', '');
        }
      }, {
          'get and set': function (assert) {
            var expected = 'This is\n test';
            builder.set('Textarea', expected);
            assert.equal(builder.get('Textarea'), expected);
          },
        });

      Unit.test('Textareas test', {
        beforeEach: function () {
          builder.set('Textareas', ['', '']);
        }
      }, {
          'index': function (assert) {
            var expected = 'This is test';
            builder.set('Textareas', 0, expected);
            assert.equal(builder.get('Textareas', 0), expected);

            expected = 'This is\n test2';
            builder.set('Textareas', 1, expected);
            assert.equal(builder.get('Textareas', 1), expected);
          },
          'array': function (assert) {
            var expected = ['This is test', 'This is test2'];
            builder.set('Textareas', expected);
            assert.equal(builder.get('Textareas'), expected);
          },
        });

      Unit.test('Statictext test', {
        beforeEach: function () {
          builder.set('Statictext', '');
        }
      }, {
          'get and set': function (assert) {
            var expected = 'This is\n test';
            builder.set('Statictext', expected);
            assert.equal(builder.get('Statictext'), expected);
          },
        });

      Unit.test('Statictexts test', {
        beforeEach: function () {
          builder.set('Statictexts', ['', '']);
        }
      }, {
          'index': function (assert) {
            var expected = 'This is test';
            builder.set('Statictexts', 0, expected);
            assert.equal(builder.get('Statictexts', 0), expected);

            expected = 'This is\n test2';
            builder.set('Statictexts', 1, expected);
            assert.equal(builder.get('Statictexts', 1), expected);
          },
          'array': function (assert) {
            var expected = ['This is test', 'This is test2'];
            builder.set('Statictexts', expected);
            assert.equal(builder.get('Statictexts'), expected);
          },
        });

      Unit.test('Number test', {
        beforeEach: function () {
          builder.set('Number', 0);
          builder.set('Number with MinMax', 0);
        }
      }, {
          'normal': function (assert) {
            var expected = 50000;
            builder.set('Number', expected);
            assert.equal(builder.get('Number'), expected);

            expected = -5000;
            builder.set('Number', expected);
            assert.equal(builder.get('Number'), expected);
          },
          'expression': function (assert) {
            var expected = 'Math.PI * Math.sin(1.732)';
            builder.set('Number', expected);
            assert.equal(eval(expected), builder.get('Number'));
          },
          'min max': function (assert) {
            var expected = -1000;
            builder.set('Number with MinMax', expected);
            assert.notEqual(builder.get('Number with MinMax'), expected);
            assert.equal(0, builder.get('Number with MinMax'));

            expected = 10000;
            builder.set('Number with MinMax', expected);
            assert.notEqual(builder.get('Number with MinMax'), expected);
            assert.equal(100, builder.get('Number with MinMax'));
          },
        });

      Unit.test('Numbers test', {
        beforeEach: function () {
          builder.set('Numbers', [0, 0]);
        }
      }, {
          'index': function (assert) {
            var expected = 50000;
            builder.set('Numbers', 0, expected);
            assert.equal(builder.get('Numbers', 0), expected);

            expected = -50;
            builder.set('Numbers', 1, expected);
            assert.equal(builder.get('Numbers', 1), expected);
          },
          'array': function (assert) {
            var expected = [400, 50];
            builder.set('Numbers', expected);
            assert.equal(builder.get('Numbers'), expected);
          },
          'expression': function (assert) {
            var expected = 'Math.PI * Math.sin(1.732)';
            builder.set('Numbers', 0, expected);
            assert.equal(eval(expected), builder.get('Numbers', 0));
          },
          'min max': function (assert) {
            var expected = -1000;
            builder.set('Numbers', 1, expected);
            assert.notEqual(builder.get('Numbers', 1), expected);
            assert.equal(-100, builder.get('Numbers', 1));

            expected = 10000;
            builder.set('Numbers', 1, expected);
            assert.notEqual(builder.get('Numbers', 1), expected);
            assert.equal(100, builder.get('Numbers', 1));
          },
        });

      Unit.test('Slider test', {
        beforeEach: function () {
          builder.set('Slider', 0);
        }
      }, {
          'normal': function (assert) {
            var expected = 50;
            builder.set('Slider', expected);
            assert.equal(builder.get('Slider'), expected);
          },
          'expression': function (assert) {
            var expected = '30 * 4 / 2';
            builder.set('Slider', expected);
            assert.equal(eval(expected), builder.get('Slider'));
          },
          'min max': function (assert) {
            var expected = -1000;
            builder.set('Slider', expected);
            assert.notEqual(builder.get('Slider'), expected);
            assert.equal(-500, builder.get('Slider'));

            expected = 10000;
            builder.set('Slider', expected);
            assert.notEqual(builder.get('Slider'), expected);
            assert.equal(500, builder.get('Slider'));
          },
        });

      Unit.test('Point test', {
        beforeEach: function () {
          builder.set('Point', [0, 0]);
        }
      }, {
          'set and get': function (assert) {
            var expected = [-100, 100];
            builder.set('Point', expected);
            assert.equal(builder.get('Point'), expected);

            expected = [10000, 10000];
            builder.set('Point', expected);
            assert.equal(builder.get('Point'), expected);
          },
        });

      Unit.test('Point3d test', {
        beforeEach: function () {
          builder.set('Point3d', [0, 0, 0]);
        }
      }, {
          'set and get': function (assert) {
            var expected = [-100, 100, 0];
            builder.set('Point3d', expected);
            assert.equal(builder.get('Point3d'), expected);

            expected = [10000, 10000, 10000];
            builder.set('Point3d', expected);
            assert.equal(builder.get('Point3d'), expected);
          },
        });

      Unit.test('File test', {
        beforeEach: function () {
          builder.set('File', '~/test.png');
        }
      }, {
          'set and get': function (assert) {
            var expected = '~/test/test.png';
            builder.set('File', expected);
            assert.equal(builder.get('File'), expected);
          },
        });

      Unit.test('Folder test', {
        beforeEach: function () {
          builder.set('Folder', '~/');
        }
      }, {
          'set and get': function (assert) {
            var expected = '~/test/';
            builder.set('Folder', expected);
            assert.equal(builder.get('Folder'), expected);
          },
        });

      Unit.test('Checkbox test', {
        beforeEach: function () {
          builder.set('Checkbox', false);
        }
      }, {
          'set and get': function (assert) {
            var expected = false;
            builder.set('Checkbox', expected);
            assert.equal(builder.get('Checkbox'), expected);

            expected = true;
            builder.set('Checkbox', expected);
            assert.equal(builder.get('Checkbox'), expected);
          },
        });

      Unit.test('Checkboxes test', {
        beforeEach: function () {
          builder.set('Checkboxes', [false, true]);
        }
      }, {
          'index': function (assert) {
            var expected = true;
            builder.set('Checkboxes', 0, expected);
            assert.equal(builder.get('Checkboxes', 0), expected);

            expected = false;
            builder.set('Checkboxes', 1, expected);
            assert.equal(builder.get('Checkboxes', 1), expected);
          },
          'array': function (assert) {
            var expected = [true, false];
            builder.set('Checkboxes', expected);
            assert.equal(builder.get('Checkboxes'), expected);

            expected = [false, true];
            builder.set('Checkboxes', expected);
            assert.equal(builder.get('Checkboxes'), expected);
          },
        });

      Unit.test('Radiobutton test', {
        beforeEach: function () {
          builder.set('Radiobutton', 'Radio 1');
        }
      }, {
          'set and get': function (assert) {
            var expected = 'Radio 2';
            builder.set('Radiobutton', expected);
            assert.equal(builder.get('Radiobutton'), expected);

            expected = 'Radio 3';
            builder.set('Radiobutton', expected);
            assert.equal(builder.get('Radiobutton'), expected);

            expected = 'Radio 1';
            builder.set('Radiobutton', expected);
            assert.equal(builder.get('Radiobutton'), expected);
          },
          'not found': function (assert) {
            var expected = 'Radio 100';
            builder.set('Radiobutton', expected);
            assert.notEqual(builder.get('Radiobutton'), expected);
          },
        });

      Unit.test('Color test', {
        beforeEach: function () {
          builder.set('Color', [1, 0, 0, 1]);
        }
      }, {
          'set and get': function (assert) {
            var expected = [0.1, 0.2, 0.3, 1];
            builder.set('Color', expected);
            assert.equal(builder.get('Color'), expected);

            expected = [0.5, 0.2, 1, 1];
            builder.set('Color', expected);
            assert.equal(builder.get('Color'), expected);

            expected = [0.122, 0.43, 0.32, 1];
            builder.set('Color', expected);
            assert.equal(builder.get('Color'), expected);
          },
          'clamp': function (assert) {
            var expected = [-1, -1, -1, 1];
            builder.set('Color', expected);
            assert.notEqual(builder.get('Color'), expected);
            assert.equal([0, 0, 0, 1], builder.get('Color'));

            expected = [2, 2, 2, 1];
            builder.set('Color', expected);
            assert.notEqual(builder.get('Color'), expected);
            assert.equal([1, 1, 1, 1], builder.get('Color'));
          },
        });

      Unit.test('Colors test', {
        beforeEach: function () {
          builder.set('Colors', [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]]);
        }
      }, {
          'index': function (assert) {
            var expected = [0.83, 0.24, 0.1, 1];
            builder.set('Colors', 0, expected);
            assert.equal(builder.get('Colors', 0), expected);

            expected = [0.13, 0.74, 0.9, 1];
            builder.set('Colors', 1, expected);
            assert.equal(builder.get('Colors', 1), expected);
          },
          'array': function (assert) {
            var expected = [[0.42, 0.252, 0.9, 1], [0.2, 0.6, 0, 1], [0.2, 0.8, 1, 1]];
            builder.set('Colors', expected);
            assert.equal(builder.get('Colors'), expected);
          },
        });

      Unit.test('Popup test', {
        beforeEach: function () {
          builder.replaceItems('Popup', ['Popup 1', 'Popup 2', 'Popup 3']);
          builder.set('Popup', 'Popup 1');
        }
      }, {
          'set and get': function (assert) {
            var expected = 'Popup 2';
            builder.set('Popup', expected);
            assert.equal(builder.get('Popup'), expected);

            expected = 'Popup 3';
            builder.set('Popup', expected);
            assert.equal(builder.get('Popup'), expected);

            expected = 'Popup 1';
            builder.set('Popup', expected);
            assert.equal(builder.get('Popup'), expected);
          },
          'not found': function (assert) {
            var expected = 'Popup 100';
            builder.set('Popup', expected);
            assert.notEqual(builder.get('Popup'), expected);
          },
          'getItems': function (assert) {
            var expected = ['Popup 1', 'Popup 2', 'Popup 3'];
            assert.equal(builder.getItems('Popup'), expected);
          },
          'replaceItems': function (assert) {
            var expected = ['Replace 1', 'Replace 2', 'Replace 3', 'Replace 4'];
            builder.replaceItems('Popup', expected);
            assert.equal(builder.getItems('Popup'), expected);
          },
          'addItems': function (assert) {
            var expected = ['Popup 1', 'Popup 2', 'Popup 3'];

            var item = 'Popup 4';
            expected.push(item);
            builder.addItems('Popup', item);
            assert.equal(builder.getItems('Popup'), expected);

            var items = ['Popup 5', 'Popup 6'];
            expected = expected.concat(items);
            builder.addItems('Popup', items);
            assert.equal(builder.getItems('Popup'), expected);
          },
          'removeItem': function (assert) {
            var expected = ['Popup 1', 'Popup 3'];
            builder.removeItem('Popup', 'Popup 2');
            assert.equal(builder.getItems('Popup'), expected);

            expected = ['Popup 3'];
            builder.removeItem('Popup', 'Popup 1');
            assert.equal(builder.getItems('Popup'), expected);
          },
        });

      Unit.test('Popups test', {
        beforeEach: function () {
          builder.replaceItems('Popups', [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']]);
          builder.set('Popups', ['Left 1', 'Right 1']);
        }
      }, {
          'index': function (assert) {
            var expected = 'Left 2';
            builder.set('Popups', 0, expected);
            assert.equal(builder.get('Popups', 0), expected);

            expected = 'Left 3';
            builder.set('Popups', 0, expected);
            assert.equal(builder.get('Popups', 0), expected);

            expected = 'Right 3';
            builder.set('Popups', 1, expected);
            assert.equal(builder.get('Popups', 1), expected);
          },
          'array': function (assert) {
            var expected = ['Left 2', 'Right 4'];
            builder.set('Popups', expected);
            assert.equal(builder.get('Popups'), expected);

            expected = ['Left 3', 'Right 2'];
            builder.set('Popups', expected);
            assert.equal(builder.get('Popups'), expected);
          },
          'getItems': function (assert) {
            var expected = ['Left 1', 'Left 2', 'Left 3'];
            assert.equal(builder.getItems('Popups', 0), expected);

            expected = [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']];
            assert.equal(builder.getItems('Popups'), expected);
          },
          'replaceItems': function (assert) {
            var expected = ['Left Replace 1', 'Left Replace 2', 'Left Replace 3', 'Left Replace 4'];
            builder.replaceItems('Popups', 0, expected);
            assert.equal(builder.getItems('Popups', 0), expected);

            expected = [['Left Replace 1', 'Left Replace 2', 'Left Replace 3', 'Left Replace 4'], ['RIght Replace 1', 'Right Replace 2']];
            builder.replaceItems('Popups', expected);
            assert.equal(builder.getItems('Popups'), expected);
          },
          'addItems': function (assert) {
            var expected = [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']];

            var item = 'Left 4';
            expected[0].push(item);
            builder.addItems('Popups', 0, item);
            assert.equal(builder.getItems('Popups', 0), expected[0]);

            var items = [['Left 5', 'Left 6'], ['Right 5']];
            expected[0] = expected[0].concat(items[0]);
            expected[1] = expected[1].concat(items[1]);
            builder.addItems('Popups', items);
            assert.equal(builder.getItems('Popups'), expected);
          },
          'removeItem': function (assert) {
            var expected = ['Left 1', 'Left 3'];
            builder.removeItem('Popups', 0, 'Left 2');
            assert.equal(builder.getItems('Popups', 0), expected);

            expected = [['Left 3'], ['Right 1', 'Right 3', 'Right 4']];
            builder.removeItem('Popups', ['Left 1', 'Right 2']);
            assert.equal(builder.getItems('Popups'), expected);
          },
        });

      Unit.test('Listbox test', {
        beforeEach: function () {
          builder.replaceItems('Listbox', ['Listbox 1', 'Listbox 2', 'Listbox 3']);
          builder.set('Listbox', 'Listbox 1');
        }
      }, {
          'set and get': function (assert) {
            var expected = 'Listbox 2';
            builder.set('Listbox', expected);
            assert.equal(builder.get('Listbox'), expected);

            expected = 'Listbox 3';
            builder.set('Listbox', expected);
            assert.equal(builder.get('Listbox'), expected);

            expected = 'Listbox 1';
            builder.set('Listbox', expected);
            assert.equal(builder.get('Listbox'), expected);
          },
          'not found': function (assert) {
            var expected = 'Listbox 100';
            builder.set('Listbox', expected);
            assert.notEqual(builder.get('Listbox'), expected);
          },
          'getItems': function (assert) {
            var expected = ['Listbox 1', 'Listbox 2', 'Listbox 3'];
            assert.equal(builder.getItems('Listbox'), expected);
          },
          'replaceItems': function (assert) {
            var expected = ['Replace 1', 'Replace 2', 'Replace 3', 'Replace 4'];
            builder.replaceItems('Listbox', expected);
            assert.equal(builder.getItems('Listbox'), expected);
          },
          'addItems': function (assert) {
            var expected = ['Listbox 1', 'Listbox 2', 'Listbox 3'];

            var item = 'Listbox 4';
            expected.push(item);
            builder.addItems('Listbox', item);
            assert.equal(builder.getItems('Listbox'), expected);

            var items = ['Listbox 5', 'Listbox 6'];
            expected = expected.concat(items);
            builder.addItems('Listbox', items);
            assert.equal(builder.getItems('Listbox'), expected);
          },
          'removeItem': function (assert) {
            var expected = ['Listbox 1', 'Listbox 3'];
            builder.removeItem('Listbox', 'Listbox 2');
            assert.equal(builder.getItems('Listbox'), expected);

            expected = ['Listbox 3'];
            builder.removeItem('Listbox', 'Listbox 1');
            assert.equal(builder.getItems('Listbox'), expected);
          },
        });

      Unit.test('Listboxes test', {
        beforeEach: function () {
          builder.replaceItems('Listboxes', [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']]);
          builder.set('Listboxes', ['Left 1', 'Right 1']);
        }
      }, {
          'index': function (assert) {
            var expected = 'Left 2';
            builder.set('Listboxes', 0, expected);
            assert.equal(builder.get('Listboxes', 0), expected);

            expected = 'Left 3';
            builder.set('Listboxes', 0, expected);
            assert.equal(builder.get('Listboxes', 0), expected);

            expected = 'Right 3';
            builder.set('Listboxes', 1, expected);
            assert.equal(builder.get('Listboxes', 1), expected);
          },
          'array': function (assert) {
            var expected = ['Left 2', 'Right 4'];
            builder.set('Listboxes', expected);
            assert.equal(builder.get('Listboxes'), expected);

            expected = ['Left 3', 'Right 2'];
            builder.set('Listboxes', expected);
            assert.equal(builder.get('Listboxes'), expected);
          },
          'getItems': function (assert) {
            var expected = ['Left 1', 'Left 2', 'Left 3'];
            assert.equal(builder.getItems('Listboxes', 0), expected);

            expected = [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']];
            assert.equal(builder.getItems('Listboxes'), expected);
          },
          'replaceItems': function (assert) {
            var expected = ['Left Replace 1', 'Left Replace 2', 'Left Replace 3', 'Left Replace 4'];
            builder.replaceItems('Listboxes', 0, expected);
            assert.equal(builder.getItems('Listboxes', 0), expected);

            expected = [['Left Replace 1', 'Left Replace 2', 'Left Replace 3', 'Left Replace 4'], ['RIght Replace 1', 'Right Replace 2']];
            builder.replaceItems('Listboxes', expected);
            assert.equal(builder.getItems('Listboxes'), expected);
          },
          'addItems': function (assert) {
            var expected = [['Left 1', 'Left 2', 'Left 3'], ['Right 1', 'Right 2', 'Right 3', 'Right 4']];

            var item = 'Left 4';
            expected[0].push(item);
            builder.addItems('Listboxes', 0, item);
            assert.equal(builder.getItems('Listboxes', 0), expected[0]);

            var items = [['Left 5', 'Left 6'], ['Right 5']];
            expected[0] = expected[0].concat(items[0]);
            expected[1] = expected[1].concat(items[1]);
            builder.addItems('Listboxes', items);
            assert.equal(builder.getItems('Listboxes'), expected);
          },
          'removeItem': function (assert) {
            var expected = ['Left 1', 'Left 3'];
            builder.removeItem('Listboxes', 0, 'Left 2');
            assert.equal(builder.getItems('Listboxes', 0), expected);

            expected = [['Left 3'], ['Right 1', 'Right 3', 'Right 4']];
            builder.removeItem('Listboxes', ['Left 1', 'Right 2']);
            assert.equal(builder.getItems('Listboxes'), expected);
          },
        });

    })
    .build();

})(this);
