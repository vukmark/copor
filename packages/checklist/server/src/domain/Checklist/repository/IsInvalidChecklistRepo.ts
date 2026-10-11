export interface IsInvalidChecklistRepo {
	isInvalidChecklist(checklistId: string | undefined): Promise<boolean>;
}