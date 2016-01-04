namespace KIKAKU {
	
	const JSON = KIKAKU.JSON;
	
	export class SettingManager {
		static VERSION = '0.0.0';
		static AUTHOR = 'Kareobana';
		private _section: string;
		constructor(section: string) {
			this._section = section;
		}
		have(key: string) {
			return app.settings.haveSetting(this._section, key);
		}
		get(key: string, default_value) {
			if (!this.have(key)) {
				return default_value;
			}
			
			let value = app.settings.getSetting(this._section, key);
			return JSON.parse(value);
		}
		save(key: string, value) {
			app.settings.saveSetting(this._section, key, JSON.stringify(value));
		}
		delete(key: string) {
			if (!this.have(key)) {
				return;
			}
			
			(<any>app).preferences.deletePref('Settings_' + this._section, key);
		}
	}
	
}