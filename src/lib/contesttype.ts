// Import original type
import type { ContestType as ContestTypeOrigin } from '@prisma/client';

// Re-export enum for runtime
export const ContestType = {
	ANY: 'ANY',
	AMC8: 'AMC8',
	AMC10: 'AMC10',
	AMC12: 'AMC12',
	AHSME: 'AHSME'
} satisfies Record<ContestTypeOrigin, ContestTypeOrigin>;
