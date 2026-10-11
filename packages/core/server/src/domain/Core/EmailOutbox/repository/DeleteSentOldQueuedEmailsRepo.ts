export interface DeleteSentOldQueuedEmailsRepo {
	deleteSentOlderThan(date: Date): Promise<number>;
}