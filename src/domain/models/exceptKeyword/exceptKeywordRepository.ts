import type { ExceptKeyword } from "./exceptKeyword.js";

export interface ExceptKeywordRepository {
	findAll(): Promise<ExceptKeyword[]>;
}
