import {SaveChecklistItemDTO} from '../../Checklist/interactor/dto/SaveChecklistItemDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';

export class UpdateChecklistItem extends ExecuteUseCase<SaveChecklistItemDTO, SaveChecklistItemRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}