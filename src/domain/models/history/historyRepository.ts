import type { History } from "./history.js";

export interface HistoryRepository {
	deleteExpired(): Promise<void>;
	findAll(): Promise<History[]>;
	saveHistories(histories: History[]): Promise<void>;
}
