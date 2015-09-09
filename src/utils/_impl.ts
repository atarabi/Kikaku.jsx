namespace KIKAKU.Utils._Impl {
	
	export function not(fn, ctx?) {
		return function () {
			return !fn.apply(ctx, arguments);
		};
	}
	
	export function and(fns?, ...other) {
		if (!isArray(fns)) {
			fns = Array.prototype.slice.call(arguments);
		}
		
		let l = fns.length;
		return function () {
			for(let i = 0; i < l; i++) {
				if (!fns[i].apply(null, arguments)) {
					return false;
				}
			}
			return true;
		};
	}
	
	export function or(fns?, ...other) {
		if (!isArray(fns)) {
			fns = Array.prototype.slice.call(arguments);
		}
		
		let l = fns.length;
		return function () {
			for(let i = 0; i < l; i++) {
				if (fns[i].apply(null, arguments)) {
					return true;
				}
			}
			return false;
		};
	}

	export function operate(lhs, op, rhs) {
		switch (op) {
			case '==':
				return lhs == rhs;
			case '!=':
				return lhs != rhs;
			case '<':
				return lhs < rhs;
			case '<=':
				return lhs <= rhs;
			case '>':
				return lhs > rhs;
			case '>=':
				return lhs >= rhs;
			default:
				throw new Error('Bad operator');
		}
	}

	export function createOperatorFilter(fn, op, rhs) {
		return function(obj) {
			return operate(fn(obj), op, rhs);
		};
	}
}