import type { ContestType } from '@prisma/client';

/**
 * Gets initials from name
 *
 * Usage:
 * ```ts
 * initials("Anvay Mathur") = "AM";
 * initials("Donald John Banana Lol Trump") = "DT";
 * ```
 */
export function initials(name: string): string {
	const nameArr = name.split(' ');
	if (nameArr.length == 0) return '?';
	if (nameArr.length == 1) return nameArr[0][0];
	else return nameArr[0][0] + nameArr[nameArr.length - 1][0];
}

/**
 * Random number in interval [min, max]
 *
 * Usage:
 * ```ts
 * randomBetween(0, 2) = any number between 0 and 2, including 0 and 2
 * ```
 */
export function randomBetween(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const contestMetadata: Record<
	ContestType,
	{
		name: string;
		formattedName: string;
		time: number;
		correct: number;
		incorrect: number;
		blank: number;
	}
> = {
	AMC8: {
		name: 'AMC8',
		formattedName: 'AMC 8',
		time: 1000 * 60 * 40,
		correct: 1,
		incorrect: 0,
		blank: 0
	},
	AMC10: {
		name: 'AMC10',
		formattedName: 'AMC 10',
		time: 1000 * 60 * 75,
		correct: 6,
		incorrect: 0,
		blank: 1.5
	},
	AMC12: {
		name: 'AMC12',
		formattedName: 'AMC 12',
		time: 1000 * 60 * 75,
		correct: 6,
		incorrect: 0,
		blank: 1.5
	},
	AHSME: {
		name: 'AHSME',
		formattedName: 'AHSME',
		time: 1000 * 60 * 90,
		correct: 5,
		incorrect: 0,
		blank: 2
	},
	ANY: {
		name: 'ANY',
		formattedName: 'Unknown',
		time: 1000 * 60 * 40,
		correct: 1,
		incorrect: 0,
		blank: 0
	}
};
