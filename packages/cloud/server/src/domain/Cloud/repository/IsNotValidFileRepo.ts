export interface IsInvalidFileRepo {
	isInvalidFile(userId: string | undefined): Promise<boolean>;
}