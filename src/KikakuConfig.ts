namespace KIKAKU {

  export var MAJOR_VERSION = 0;
  export var MINOR_VERSION = 7;
  export var PATCH_VERSION = 1;
  export var VERSION = `${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}`;
  export var AUTHOR = 'Kareobana';
  export var LICENSE = 'MIT';

  export function checkVersion(version: string) {
    const versions = version.split('.');
    const [major, minor, patch] = [~~versions[0], ~~versions[1], ~~versions[2]];
    if (major > MAJOR_VERSION) {
      return true;
    } else if (major == MAJOR_VERSION) {
      if (minor > MINOR_VERSION) {
        return true;
      } else if (minor == MINOR_VERSION) {
        if (patch >= PATCH_VERSION) {
          return true;
        }
      }
    }
    return false;
  }

}