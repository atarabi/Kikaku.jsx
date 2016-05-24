namespace KIKAKU.Timer {

  export type TimeoutID = string;
  
  function generateTimeoutID(): TimeoutID {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  class TimerStore {
    private _store: {
      [id: string]: {
        fn: Function;
        ctx: any;
        time: number;
        delay: number;
        id: number;
      };
    } = {};
    register(fn: Function, delay: number, ctx?: any): TimeoutID {
      const timeout_id = generateTimeoutID();
      const actual_id = app.scheduleTask(`KIKAKU.Timer.execute("${timeout_id}")`, delay, false);
      this._store[timeout_id] = {
        fn,
        ctx,
        time: Date.now(),
        delay,
        id: actual_id,
      };
      return timeout_id;
    }
    unregister(id: TimeoutID) {
      if (this._store[id]) {
        app.cancelTask(this._store[id].id);
        delete this._store[id];
      }
    }
    private clean() {
      const now = Date.now();
      for (let id in this._store) {
        const {time, delay} = this._store[id];
        if (time + delay > now) {
          delete this._store[id];
        }
      }
    }
    execute(id: TimeoutID) {
      if (this._store[id]) {
        const {fn, ctx} = this._store[id];
        try {
          fn.call(ctx);
        } catch (e) {
          alert(e);
        } finally {
          this.unregister(id);
        }
      }
      this.clean();
    }
  }

  const store = new TimerStore;

  export function setTimeout(fn: Function, delay: number, ctx?: any): TimeoutID {
    return store.register(fn, delay, ctx);
  }

  export function clearTimeout(id: TimeoutID) {
    return store.unregister(id);
  }

  export function execute(id: string) {
    return store.execute(id);
  }

}