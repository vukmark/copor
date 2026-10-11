import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SetSettingsDTO} from './dto/SetSettingsDTO';
import {SetSettingsRepo} from '../repository/SetSettingsRepo';

export class SetSettings extends ExecuteUseCase<SetSettingsDTO, SetSettingsRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.update(this.input);
	}
}