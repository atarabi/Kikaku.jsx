namespace KIKAKU.Unit {

	const noop = () => { };

	export type Hooks = {
		before?: (utility?: Utility) => any;
		beforeEach?: (utility?: Utility) => any;
		afterEach?: (utility?: Utility) => any;
		after?: (utility?: Utility) => any;
	};

	export type Tests = {
		[name: string]: (assert: Assert, utility?: Utility) => any;
	};

	export function test(name: string, hooks_or_tests: Hooks|Tests, tests2?: Tests) {
		let hooks: Hooks = {
			before: noop,
			beforeEach: noop,
			afterEach: noop,
			after: noop
		};
		let tests: Tests;
		if (Utils.isUndefined(tests2)) {
			tests = <Tests>hooks_or_tests;
		} else {
			hooks = Utils.assign(hooks, hooks_or_tests);
			tests = tests2;
		}
		let test = new Test(name, hooks, tests);
		return test.run();
	}

	class Test {
		private _name: string;
		private _hooks: Hooks;
		private _tests: Tests;
		constructor(name: string, hooks: Hooks, tests: Tests) {
			this._name = name;
			this._hooks = hooks;
			this._tests = tests;
		}
		run(): boolean {
			let name = this._name;
			let hooks = this._hooks;
			let tests = this._tests;

			let utility = new Utility;
			let ctx: any = {};
			let passed = 0;
			let exception = 0;
			let total = 0;

			$.writeln('\n------- ' + name + ' started -------');

			hooks.before.call(ctx, utility);

			for (var key in tests) {
				let test = tests[key];
				let assert = new Assert(key);

				$.writeln('*** ' + key + ' started ***');

				hooks.beforeEach.call(ctx, utility);

				try {
					test.call(ctx, assert, utility);
					if (assert.isPassed()) {
						passed++;
					}
				} catch (e) {
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
		}
	}

	export class Assert {
		private _name: string;
		private _passed = 0;
		private _total = 0;
		constructor(name: string) {
			this._name = name;
		}
		getTotal() { return this._total; }
		getPassed() { return this._passed; }
		isPassed() { return this._passed === this._total; }
		private createMessage(message?: string): string {
			return message || this._name + '#' + (this._total + 1);
		}
		private check(result: boolean, suffix: string, message?: string) {
			if (result) {
				this._passed++;
			} else {
				$.writeln(this.createMessage(message) + suffix);
			}
			this._total++;
		}
		ok(result: boolean, message?: string) {
			this.check(result, ': bad', message);
		}
		notOk(result: boolean, message?: string) {
			this.check(!result, ': bad', message);
		}
		private toSource(obj) {
			if (obj === null) {
				return 'null';
			} else if (obj === void 0) {
				return 'undefined';
			}
			return obj.toSource();
		}
		equal(actual, expected, message?: string) {
			let result = this.toSource(actual) === this.toSource(expected);
			this.check(result, ': ' + String(actual) + ' is different from ' + String(expected), message);
		}
		notEqual(actual, expected, message?: string) {
			let result = this.toSource(actual) === this.toSource(expected);
			this.check(!result, ': ' + String(actual) + ' is same as ' + String(expected), message);
		}
	}

	export class Utility {
		private _width = 640;
		private _height = 320;
		private _items: { [name: string]: Item; } = {};
		private _layers: { [name: string]: Layer; } = {};
		setSize(width: number, height: number) {
			this._width = width;
			this._height = height;
		}
		private checkItem(name: string) {
			if (this._items[name]) {
				throw new Error(name + ' already exists');
			}
		}
		addCompItem(name: string, pixelAsplect = 1, duration = 10, frameRate = 30) {
			this.checkItem(name);
			let comp = this._items[name] = app.project.items.addComp(name, this._width, this._height, pixelAsplect, duration, frameRate);
			return comp;
		}
		addFolderItem(name: string) {
			this.checkItem(name);
			let folder = this._items[name] = app.project.items.addFolder(name);
			return folder;
		}
		addFootageItem(name: string, path: string) {
			this.checkItem(name);
			let file = new File(path);
			if (!file.exists) {
				throw new Error(path + ' doesn\'t exists');
			}
			let import_options = new ImportOptions(file);
			if (!import_options.canImportAs(ImportAsType.FOOTAGE)) {
				throw new Error('Unable to import ' + path);
			}
			let footage = this._items[name] = app.project.importFile(import_options);
			footage.name = name;
			return footage;
		}
		getItem(name: string) {
			if (!this._items[name]) {
				throw new Error(name + ' doesn\'t exists');
			}
			return this._items[name];
		}
		removeItem(name: string) {
			if (this._items[name]) {
				try {
					this._items[name].remove();
				} catch (e) {
					//pass
				}
				delete this._items[name];
			}
		}
		removeItems() {
			for (let name in this._items) {
				this.removeItem(name);
			}
		}
		private checkLayer(comp_name: string, name: string) {
			if (!this._items[comp_name]) {
				throw new Error(comp_name + ' doesn\'t exists');
			} else if (!Utils.isCompItem(this._items[comp_name])) {
				throw new Error(comp_name + ' isn\'t CompItem');
			} else if (this._layers[name]) {
				throw new Error(name + ' already exists');
			}
		}
		addAVLayer(comp_name: string, name: string, av_item_name: string, duration?: number) {
			this.checkLayer(comp_name, name);
			if (!this._items[av_item_name]) {
				throw new Error(av_item_name + ' doesn\'t exists');
			} else if (!Utils.isAVItem(this._items[av_item_name])) {
				throw new Error(av_item_name + ' isn\'t AVItem');
			}
			let comp = <CompItem>this._items[comp_name];
			let av_item = <AVItem>this._items[av_item_name];
			let layer = this._layers[name] = Utils.isUndefined(duration) ? comp.layers.add(av_item) : comp.layers.add(av_item, duration);
			layer.name = name;
			return layer;
		}
		addNullLayer(comp_name: string, name: string, duration?: number) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = Utils.isUndefined(duration) ? comp.layers.addNull() : comp.layers.addNull(duration);
			layer.name = name;
			return layer;
		}
		addSolidLayer(comp_name: string, name: string, color: [number, number, number] = [1, 1, 1], duration?: number) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = Utils.isUndefined(duration) ? comp.layers.addSolid(color, name, this._width, this._height, comp.pixelAspect) : comp.layers.addSolid(color, name, this._width, this._height, comp.pixelAspect, duration);
			return layer;
		}
		addTextLayer(comp_name: string, name: string, source_text?: string|TextDocument) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = Utils.isUndefined(source_text) ? comp.layers.addText() : comp.layers.addText(source_text);
			layer.name = name;
			return layer;
		}
		addBoxTextLayer(comp_name: string, name: string, size: [number, number], source_text?: string|TextDocument) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = Utils.isUndefined(source_text) ? comp.layers.addBoxText(size) : comp.layers.addBoxText(size, source_text);
			layer.name = name;
			return layer;
		}
		addCameraLayer(comp_name: string, name: string, center_point: [number, number] = [0.5 * this._width, 0.5 * this._height]) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = comp.layers.addCamera(name, center_point);
			return layer;
		}
		addLightLayer(comp_name: string, name: string, center_point: [number, number] = [0.5 * this._width, 0.5 * this._height]) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = comp.layers.addLight(name, center_point);
			return layer;
		}
		addShapeLayer(comp_name: string, name: string) {
			this.checkLayer(comp_name, name);
			let comp = <CompItem>this._items[comp_name];
			let layer = this._layers[name] = comp.layers.addShape();
			layer.name = name;
			return layer;
		}
		getLayer(name: string) {
			if (!this._layers[name]) {
				throw new Error(name + ' doesn\'t exists');
			}
			return this._layers[name];
		}
		removeLayer(name: string) {
			if (this._layers[name]) {
				try {
					let folder_item: FolderItem;
					let layer = this._layers[name];
					if (Utils.isSolidLayer(layer)) {
						let source = (<AVLayer>layer).source;
						let folder_item = source.parentFolder;
						source.remove();
						if (!folder_item.numItems) {
							folder_item.remove();
						}
					} else {
						this._layers[name].remove();
					}
				} catch (e) {
					//pass
				}
				delete this._layers[name];
			}
		}
		removeLayers() {
			for (let name in this._layers) {
				this.removeLayer(name);
			}
		}
		removeAll() {
			this.removeLayers();
			this.removeItems();
		}
	}

}