export interface UpdateChecklistItemReqBodyDTO {
	id: string;
	checklistId: string;
	description: string;
	isChecked: boolean;
}