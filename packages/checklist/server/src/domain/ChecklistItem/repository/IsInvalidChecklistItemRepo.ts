export interface IsInvalidChecklistItemRepo {
	isInvalidChecklistItem(checklistItemId: string | undefined): Promise<boolean>;
}