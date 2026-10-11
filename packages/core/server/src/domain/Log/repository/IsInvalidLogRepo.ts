export interface IsInvalidLogRepo {
	isInvalidLog(logId: string | undefined): Promise<boolean>;
}
