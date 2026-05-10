import type { History } from "./history.js";

export interface HistoryRepository {
	/** 有効期限が切れた履歴を削除する */
	deleteExpired(): Promise<void>;
	/** すべての履歴を取得する */
	findAll(): Promise<History[]>;
	/** 新しい履歴を保存する */
	saveNewHistories(newHistories: History[]): Promise<void>;
}
