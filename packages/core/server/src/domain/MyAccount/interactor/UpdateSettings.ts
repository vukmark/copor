import {ExecuteUseCase} from '../../Core/Interactors/ExecuteUseCase';
import {SaveSettingsDTO} from './dto/SaveSettingsDTO';
import {SaveSettingsRepo} from '../repository/SaveSettingsRepo';

export class UpdateSettings extends ExecuteUseCase<SaveSettingsDTO, SaveSettingsRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}