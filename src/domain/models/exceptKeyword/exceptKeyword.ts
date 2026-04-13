import type { Character } from "./character/character.js";

export class ExceptKeyword {
	private constructor(public readonly character: Character) {}

	public static create(character: Character): ExceptKeyword {
		return new ExceptKeyword(character);
	}
}
