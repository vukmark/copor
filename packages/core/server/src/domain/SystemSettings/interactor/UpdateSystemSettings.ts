import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/UpdateSystemSettingsRepo';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';

export class UpdateSystemSettings<SettingsDTO>
	extends ExecuteUseCase<SaveSystemSettingsDTO<SettingsDTO>, UpdateSystemSettingsRepo<SettingsDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
