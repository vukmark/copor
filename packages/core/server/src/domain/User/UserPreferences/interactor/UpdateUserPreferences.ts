import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveUserPreferencesDTO} from './dto/SaveUserPreferencesDTO';
import {SaveUserPreferencesRepo} from '../repository/SaveUserPreferencesRepo';

export class UpdateUserPreferences extends ExecuteUseCase<SaveUserPreferencesDTO, SaveUserPreferencesRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}