import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';
import {GetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/GetChecklistItemListRepo';

export class GetChecklistItemList extends ExecuteUseCase<string, GetChecklistItemListRepo, GetChecklistItemDTO[]> {
	public execute(): Promise<GetChecklistItemDTO[]> {
		return this.repository.list(this.input);
	}
}
