namespace KIKAKU {
	
	export class EventDispatcher {
		private _listners: {[type: string]: {fn: Function; ctx: any;}[]} = {};
		addEventListener(type: string, fn: Function, ctx?: any) {
			if (!this._listners[type]) {
				this._listners[type] = [];
			}
			
			this._listners[type].push({
				fn: fn,
				ctx: ctx || this
			});
		}
		removeEventListener(type: string, fn: Function|string, ctx?: any) {
			const listeners = this._listners[type];
			if (!listeners) {
				return;
			}
			
			ctx = ctx || this;
			
			for (let i = 0, l = listeners.length; i < l; i++) {
				const listener = listeners[i];
				if (listener.fn === fn && listener.ctx === ctx) {
					listeners.splice(i, 1);
					break;
				}
			}
		}
		dispatchEvent(type: string, ...args: any[]) {
			const listeners = this._listners[type];
			if (!listeners) {
				return;
			}
			
			for (let listener of listeners) {
				listener.fn.apply(listener.ctx, args);
			}
		}
	}
	
}