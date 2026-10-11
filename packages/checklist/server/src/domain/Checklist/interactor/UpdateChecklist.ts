import {SaveChecklistDTO} from './dto/SaveChecklistDTO';
import {UpdateChecklistRepo} from '../repository/UpdateChecklistRepo';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';

export class UpdateChecklist extends ExecuteUseCase<SaveChecklistDTO, UpdateChecklistRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.update(this.input);
	}
}