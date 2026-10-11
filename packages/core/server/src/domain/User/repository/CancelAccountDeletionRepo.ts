export interface CancelAccountDeletionRepo {
	cancelDeletion(userId: string): Promise<void>;
}
