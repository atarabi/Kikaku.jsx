namespace KIKAKU.Utils.Comment {

	const JSON = KIKAKU.JSON;

	const COMMENT_KEY = 'comment';

	function parseComment(layer_or_item: Layer | Item) {
		const comment = layer_or_item.comment;
		let parsed_comment;
		try {
			parsed_comment = JSON.parse(comment);
		} catch (e) {
			parsed_comment = comment ? { [COMMENT_KEY]: comment } : {};
		}
		return parsed_comment;
	}

	function stringifyComment(layer_or_item: Layer | Item, parsed_comment) {
		let has_comment_key = false;
		let has_not_comment_key = false;
		for (let key in parsed_comment) {
			if (key === COMMENT_KEY) {
				has_comment_key = true;
			}
			else {
				has_not_comment_key = true;
			}
			if (has_comment_key && has_not_comment_key) {
				break;
			}
		}

		if (!has_not_comment_key) {
			layer_or_item.comment = has_comment_key ? parsed_comment[COMMENT_KEY] : '';
		} else {
			layer_or_item.comment = JSON.stringify(parsed_comment);
		}
	}

	export function get(layer_or_item: Layer | Item, key: string) {
		const parsed_comment = parseComment(layer_or_item);
		return Utils.isUndefined(parsed_comment[key]) ? null : parsed_comment[key];
	}

	export function set(layer_or_item: Layer | Item, key: string, value) {
		const parsed_comment = parseComment(layer_or_item);
		parsed_comment[key] = value;
		stringifyComment(layer_or_item, parsed_comment);
	}

	export function remove(layer_or_item: Layer | Item, key: string) {
		const parsed_comment = parseComment(layer_or_item);
		delete parsed_comment[key];
		stringifyComment(layer_or_item, parsed_comment);
	}

}