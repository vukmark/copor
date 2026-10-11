import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/GetSystemSettingsRepo';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class GetSystemSettings<SettingsDTO> extends ExecuteUseCase<SystemSettingsType, GetSystemSettingsRepo<SettingsDTO>, SettingsDTO> {
	public execute(): Promise<SettingsDTO> {
		return this.repository.load(this.input);
	}
}
