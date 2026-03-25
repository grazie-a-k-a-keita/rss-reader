import { Feed } from "../model/feed.js";
import { History } from "../model/history.js";
import { Target } from "../model/target.js";

export function feedBuilder({
	title = "書籍のタイトル",
	url = "http://sample.com",
	target = targetBuilder(),
}: {
	title?: string;
	url?: string;
	target?: Target;
} = {}) {
	return new Feed(title, url, target);
}

export function targetBuilder({
	emoji = "📚",
	title = "新刊情報",
	url = "https://sample.com/catalog/soon.xml",
	retention = 60,
}: {
	emoji?: string;
	title?: string;
	url?: string;
	retention?: number;
} = {}) {
	return Target.create(emoji, title, url, retention);
}

export function historyBuilder({
	targetTitle = "新刊情報",
	title = "書籍のタイトル",
	expireDate = new Date(),
}: {
	targetTitle?: string;
	title?: string;
	expireDate?: Date;
} = {}) {
	return new History(targetTitle, title, expireDate);
}
