export interface RequestAccountDeletionRepo {
	requestDeletion(userId: string): Promise<void>;
}
