/// <reference path="_impl.ts" />

namespace KIKAKU.Utils {

	export function isProperty(property: PropertyBase): property is Property {
		return property instanceof Property;
	}

	export function isPropertyGroup(property: PropertyBase): property is PropertyGroup {
		return property instanceof PropertyGroup || property instanceof MaskPropertyGroup;
	}

	export function isHiddenProperty(property: PropertyBase) {
		let hidden = false;
		try {
			let selected = property.selected;
			property.selected = selected;
		} catch (e) {
			hidden = true;
		}
		return hidden;
	}

	export function getPropertyDimensions(property: Property) {
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

	export const PROPERTY_FILTER = {
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

	function getPropertyFilter(filter: string, ...args) {
		let invert = false;
		let fn: (property: PropertyBase) => boolean;

		if (filter[0] === '!') {
			invert = true;
			filter = filter.slice(1);
		}

		switch (filter) {
			case PROPERTY_FILTER.NONE:
				fn = function() { return false; }
				break;
			case PROPERTY_FILTER.ALL:
				fn = function() { return true; }
				break;
			case PROPERTY_FILTER.PROPERTY:
				fn = isProperty;
				break;
			case PROPERTY_FILTER.PROPERTY_GROUP:
				fn = isPropertyGroup;
				break;
			case PROPERTY_FILTER.NAME:
			case PROPERTY_FILTER.MATCH_NAME:
				fn = (function(key: string, name: string) {
					return function(property: PropertyBase) {
						return property[key] === name;
					};
				})(filter, args[0]);
				break;
			case PROPERTY_FILTER.PROPERTY_INDEX:
			case PROPERTY_FILTER.PROPERTY_DEPTH:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(property: PropertyBase) {
						return property[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				break;
			case PROPERTY_FILTER.IS_MODIFIED:
			case PROPERTY_FILTER.CAN_SET_ENABLED:
			case PROPERTY_FILTER.ENABLED:
			case PROPERTY_FILTER.ACTIVE:
			case PROPERTY_FILTER.ELIDED:
			case PROPERTY_FILTER.IS_EFFECT:
			case PROPERTY_FILTER.IS_MASK:
			case PROPERTY_FILTER.SELECTED:
				fn = (function(key: string) {
					return function(property: PropertyBase) {
						return property[key];
					};
				})(filter);
				break;
			//for property
			case PROPERTY_FILTER.NO_VALUE:
			case PROPERTY_FILTER.THREED_SPATIAL:
			case PROPERTY_FILTER.THREED:
			case PROPERTY_FILTER.TWOD_SPATIAL:
			case PROPERTY_FILTER.TWOD:
			case PROPERTY_FILTER.ONED:
			case PROPERTY_FILTER.COLOR:
			case PROPERTY_FILTER.CUSTOM_VALUE:
			case PROPERTY_FILTER.MARKER:
			case PROPERTY_FILTER.LAYER_INDEX:
			case PROPERTY_FILTER.MASK_INDEX:
			case PROPERTY_FILTER.SHAPE:
			case PROPERTY_FILTER.TEXT_DOCUMENT:
				fn = (function(key: string) {
					return function(property: PropertyBase) {
						return (<Property>property).propertyValueType === PropertyValueType[key];
					};
				})(filter);
				fn = _Impl.and(isProperty, fn);
				break;
			case PROPERTY_FILTER.DIMENSIONS:
				fn = (function(dimensions: number) {
					return function(property: PropertyBase) {
						const property_dimensions = getPropertyDimensions(<Property>property);
						return property_dimensions > 0 && property_dimensions === dimensions;
					};
				})(~~args[0]);
				fn = _Impl.and(isProperty, fn);
				break;
			case PROPERTY_FILTER.HAS_MIN:
			case PROPERTY_FILTER.HAS_MAX:
			case PROPERTY_FILTER.IS_SPATIAL:
			case PROPERTY_FILTER.CAN_VARY_OVER_TIME:
			case PROPERTY_FILTER.IS_TIME_VARYING:
			case PROPERTY_FILTER.CAN_SET_EXPRESSION:
			case PROPERTY_FILTER.EXPRESSION_ENABLED:
			case PROPERTY_FILTER.DIMENSION_SEPARATED:
			case PROPERTY_FILTER.IS_SEPRATION_FOLLOWER:
				fn = (function(key: string) {
					return function(property: PropertyBase) {
						return property[key];
					};
				})(filter);
				fn = _Impl.and(isProperty, fn);
				break;
			case PROPERTY_FILTER.NUM_KEYS:
				fn = (function(key: string, op, rhs) {
					return _Impl.createOperatorFilter(function(property: PropertyBase) {
						return property[key];
					}, op, rhs);
				})(filter, args[0], args[1]);
				fn = _Impl.and(isProperty, fn);
				break;
			default:
				throw new Error('Bad filter type');
		}

		if (invert) {
			fn = _Impl.not(fn);
		}

		return fn;
	}

	export function createPropertyFilter(...filters): (property: PropertyBase) => boolean {
		let fns = [];
		forEach(filters, (filter) => {
			if (isArray(filter)) {
				fns.push(getPropertyFilter.apply(null, filter));
			} else if (isFunction(filter)) {
				fns.push(filter);
			} else {
				fns.push(getPropertyFilter(filter));
			}
		});
		return fns.length > 0 ? _Impl.and(fns) : getPropertyFilter(PROPERTY_FILTER.ALL);
	}

	export function getSelectedProperties(options?: { multiple?: boolean; propertyGroup?: boolean; filter?: (property: PropertyBase) => boolean; }): PropertyBase[] {
		let options_: { multiple: boolean; propertyGroup: boolean; filter: (property: PropertyBase) => boolean; } = assign({
			multiple: true,
			propertyGroup: false,
			filter: function() { return true; }
		}, options);

		let layers = getSelectedLayers();
		if (!options_.multiple && layers.length) {
			layers = [layers[0]];
		}

		let properties: PropertyBase[] = [];
		forEach(layers, (layer: Layer) => {
			let selected_properties = layer.selectedProperties.slice();
			forEach(selected_properties, (property: PropertyBase) => {
				if ((options_.propertyGroup || isProperty(property)) && options_.filter(property)) {
					properties.push(property);
				}
			});
		});

		return properties;
	}

	export function getSelectedPropertiesWithLayer(options?: { multiple?: boolean; propertyGroup?: boolean; filter?: (property: PropertyBase) => boolean; }): { layer: Layer; properties: PropertyBase[]; }[] {
		let options_: { multiple: boolean; propertyGroup: boolean; filter: (property: PropertyBase) => boolean; } = assign({
			multiple: true,
			propertyGroup: false,
			filter: function() { return true; }
		}, options);

		let layers = getSelectedLayers();
		if (!options_.multiple && layers.length) {
			layers = [layers[0]];
		}

		let result: { layer: Layer; properties: PropertyBase[]; }[] = [];
		forEach(layers, (layer: Layer) => {
			let selected_properties = layer.selectedProperties.slice();
			let properties: PropertyBase[] = [];
			forEach(selected_properties, (property: PropertyBase) => {
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

	export function getSelectedProperty(): Property {
		let layer = getSelectedLayer();
		if (!layer) {
			return null;
		}

		let properties = layer.selectedProperties.slice();

		return <Property>find(properties, isProperty);
	}

	export function getSelectedPropertyWithLayer(): { layer: Layer; property: Property; } {
		let layer = getSelectedLayer();
		if (!layer) {
			return null;
		}

		let properties = layer.selectedProperties.slice();
		let property: Property = <Property>find(properties, isProperty);
		if (!property) {
			return null;
		}

		return {
			layer: layer,
			property: property
		};
	}

	export function getPathOfProperty(property: PropertyBase, match_name = false): string[] {
		let paths: string[] = [];
		while (property) {
			paths.push(match_name ? property.matchName : property.name);
			property = property.parentProperty;
		}
		paths.pop();
		paths.reverse();
		return paths;
	}

	export function getPathOfSelectedProperty(match_name = false): string[] {
		let property = getSelectedProperty();
		if (!property) {
			return null;
		}

		return getPathOfProperty(property, match_name);
	}

	export function getPropertyFromPath(layer: Layer, path: string[]): PropertyBase {
		let property: PropertyBase = <PropertyGroup>(<any>layer);

		for (let i = 0, l = path.length; i < l; i++) {
			let name = path[i];
			if (isString(name) && /^\d+$/.test(<string>name)) {
				let index = parseInt(<string>name);
				property = (<PropertyGroup>property).property(index);
			} else {
				property = (<PropertyGroup>property).property(name);
			}

			if (!property) {
				return null;
			}
		}

		return property;
	}

	export function getLayerOfProperty(property: PropertyBase): Layer {
		let parent: PropertyBase;
		while (parent = property.parentProperty) {
			property = parent;
		}
		return <Layer>(<any>property);
	}

	export function removeAllKeys(property: Property) {
		let num_keys = property.numKeys;
		if (!num_keys) {
			return;
		}
		for (let i = num_keys; i >= 1; i--) {
			property.removeKey(i);
		}
	}

	export function scaleOneDProperty(property: Property, scale: number) {
		type ValueType = number;
		function scaleValue(value: ValueType): ValueType {
			return clamp(value * scale, minvalue, maxvalue);
		}

		if (property.propertyValueType !== PropertyValueType.OneD) {
			throw new Error('PropertyValueType is not matched');
		}

		var minvalue = property.hasMin ? property.minValue : -Infinity;
		var maxvalue = property.hasMax ? property.maxValue : Infinity;

		if (property.numKeys === 0) {
			property.setValue(scaleValue(<ValueType>property.value));
		} else {
			for (let i = 1, l = property.numKeys; i <= l; i++) {
				const value = <ValueType>property.keyValue(i);
				property.setValueAtKey(i, scaleValue(value));
			}
		}
	}

	export function scaleTwoDProperty(property: Property, scale: [number, number], tangent: boolean = true) {
		type ValueType = [number, number];
		function scaleValue(value: ValueType): ValueType {
			return [value[0] * scale[0], value[1] * scale[1]];
		}

		if (!(property.propertyValueType === PropertyValueType.TwoD || property.propertyValueType === PropertyValueType.TwoD_SPATIAL)) {
			throw new Error('PropertyValueType is not matched');
		}

		if (property.numKeys === 0) {
			property.setValue(scaleValue(<ValueType>property.value));
		} else {
			const do_tangent = property.propertyValueType === PropertyValueType.TwoD_SPATIAL && tangent;
			for (let i = 1, l = property.numKeys; i <= l; i++) {
				const value = <ValueType>property.keyValue(i);
				property.setValueAtKey(i, scaleValue(value));
				if (do_tangent) {
					property.setSpatialTangentsAtKey(i,
						scaleValue(<ValueType>property.keyInSpatialTangent(i)),
						scaleValue(<ValueType>property.keyOutSpatialTangent(i))
					);
				}
			}
		}
	}

	export function scaleThreeDProperty(property: Property, scale: [number, number, number], tangent: boolean = true) {
		type ValueType = [number, number, number];
		function scaleValue(value: ValueType): ValueType {
			return [value[0] * scale[0], value[1] * scale[1], value[2] * scale[2]];
		}

		if (!(property.propertyValueType === PropertyValueType.ThreeD || property.propertyValueType === PropertyValueType.ThreeD_SPATIAL)) {
			throw new Error('PropertyValueType is not matched');
		}

		if (property.numKeys === 0) {
			property.setValue(scaleValue(<ValueType>property.value));
		} else {
			const do_tangent = property.propertyValueType === PropertyValueType.ThreeD_SPATIAL && tangent;
			for (let i = 1, l = property.numKeys; i <= l; i++) {
				const value = <ValueType>property.keyValue(i);
				property.setValueAtKey(i, scaleValue(value));
				if (do_tangent) {
					property.setSpatialTangentsAtKey(i,
						scaleValue(<ValueType>property.keyInSpatialTangent(i)),
						scaleValue(<ValueType>property.keyOutSpatialTangent(i))
					);
				}
			}
		}
	}

	export function scaleShapeProperty(property: Property, scale: [number, number], src_origin: [number, number] = [0, 0], dst_origin: [number, number] = src_origin) {
		type ValueType = Shape;
		type VectorType = [number, number];
		function scaleVector(vector: VectorType, use_origin: boolean = true): VectorType {
			if (use_origin) {
				return [(vector[0] - src_origin[0]) * scale[0] + dst_origin[0], (vector[1] - src_origin[1]) * scale[1] + dst_origin[1]]
			}
			return [vector[0] * scale[0], vector[1] * scale[1]];
		}

		function scaleValue(value: ValueType): ValueType {
			value.vertices = map(value.vertices, (vertex: VectorType) => scaleVector(vertex));
			value.inTangents = map(value.inTangents, (vertex: VectorType) => scaleVector(vertex, false));
			value.outTangents = map(value.outTangents, (vertex: VectorType) => scaleVector(vertex, false));
			return value;
		}

		if (property.propertyValueType !== PropertyValueType.SHAPE) {
			throw new Error('PropertyValueType is not matched');
		}

		if (property.numKeys === 0) {
			property.setValue(scaleValue(<ValueType>property.value));
		} else {
			for (let i = 1, l = property.numKeys; i <= l; i++) {
				const value = <ValueType>property.keyValue(i);
				property.setValueAtKey(i, scaleValue(value));
			}
		}
	}

}