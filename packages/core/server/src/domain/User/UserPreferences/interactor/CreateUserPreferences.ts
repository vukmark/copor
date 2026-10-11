import {SaveUserPreferencesDTO} from './dto/SaveUserPreferencesDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveUserPreferencesRepo} from '../repository/SaveUserPreferencesRepo';

export class CreateUserPreferences extends ExecuteUseCase<SaveUserPreferencesDTO, SaveUserPreferencesRepo, void> {
	public execute(): Promise<void> {
		return this.repository.save(this.input);
	}
}
