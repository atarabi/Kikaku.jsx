/// <reference path="../../typings/aftereffects/ae.d.ts" />
/// <reference path="utility.ts" />

namespace KIKAKU.Utils {

	export type Color = [number, number, number, number];

	export function rgbToHsl(rgba: Color): Color {
		let r = clamp(rgba[0]);
		let g = clamp(rgba[1]);
		let b = clamp(rgba[2]);
		let mx = Math.max(r, g, b);
		let mn = Math.min(r, g, b);
		let h: number;
		let s: number;
		let l: number = (mx + mn) / 2;

		if (mx === mn) {
			h = s = 0;
		} else {
			let d = mx - mn;
			s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
			switch (mx) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return [h, s, l, rgba[3]];
	}

	export function hslToRgb(hsla: Color): Color {
		function clampH(h: number) {
			return (((h % 1) + 1) % 1);
		}

		function hue2rgb(p: number, q: number, t: number) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		let h = clampH(hsla[0]);
		let s = clamp(hsla[1]);
		let l = clamp(hsla[2]);
		let r: number;
		let g: number;
		let b: number;

		if (s === 0) {
			r = g = b = l;
		} else {
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		return [r, g, b, hsla[3]];
	}

	export function rgbToYuv(rgba: Color): Color {
		let r = clamp(rgba[0]);
		let g = clamp(rgba[1]);
		let b = clamp(rgba[2]);
		let y = 0.299 * r + 0.587 * g + 0.114 * b;
		let u = -0.169 * r - 0.331 * g + 0.5 * b;
		let v = 0.5 * r - 0.419 * g - 0.081 * b;
		return [y, u + 0.5, v + 0.5, rgba[3]];
	}

	export function yuvToRgb(yuva: Color): Color {
		let y = clamp(yuva[0], 0, 1);
		let	u = clamp(yuva[1], 0, 1) - 0.5;
		let	v = clamp(yuva[2], 0, 1) - 0.5;
		let	r = 1 * y + 1.402 * v;
		let	g = 1 * y - 0.344 * u - 0.714 * v;
		let	b = 1 * y + 1.772 * u;
		return [r, g, b, yuva[3]];
	}

}