export function isDuplicateEntryError(error: unknown): boolean {
	return typeof error === 'object' && error !== null && (error as {code?: string}).code === 'ER_DUP_ENTRY';
}
