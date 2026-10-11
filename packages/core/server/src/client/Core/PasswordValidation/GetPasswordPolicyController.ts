import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class GetPasswordPolicyController extends BaseController<void, GetPasswordSystemSettingsDTO> {
	async getResponse() {
		const policy = await SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);

		this.response.status(200).send(policy);
	}
}
