import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';

export interface GetChecklistItemListRepo {
	list(checklistId: string): Promise<GetChecklistItemDTO[]>;
}