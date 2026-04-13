import type { Target } from "./target.js";

export interface TargetRepository {
	findAll(): Promise<Target[]>;
}
