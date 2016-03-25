namespace KIKAKU.Decorator {


  function wrap(fn: Function, ctx, ...args) {
    let result, err: Error = null;
    try {
      result = fn.call(ctx, ...args);
    } catch (e) {
      err = e;
    }
    return { result, err };
  }


  export function debug(shouldDebug: boolean = true) {
    return function(proto: any, name: string) {
      if (shouldDebug) {
        const fn: Function = proto[name];
        proto[name] = function(...args) {
          $.writeln(`${name} in: ${args.join()}`);
          $.hiresTimer;
          const {result, err} = wrap(fn, this, ...args);
          $.writeln(`${name} out: ${result}`);
          $.writeln(`Elapsed Time: ${$.hiresTimer / 1000}ms`)
          if (err) {
            throw err;
          }
          return result;
        };
      }
    }
  }


  export function undo(text: string) {
    return function(proto: any, name: string) {
      const fn: Function = proto[name];
      proto[name] = function(...args) {
        app.beginUndoGroup(`${text}`);
        const {result, err} = wrap(fn, this, ...args);
        app.endUndoGroup();
        if (err) {
          throw err;
        }
        return result;
      };
    }
  }


}