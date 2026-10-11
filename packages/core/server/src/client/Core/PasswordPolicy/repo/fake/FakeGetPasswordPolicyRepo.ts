import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {DEFAULT_PASSWORD_POLICY} from '@copor/core/client/SystemSettings/settings/DefaultPasswordPolicy';

export class FakeGetPasswordPolicyRepo implements GetPasswordPolicyRepo {
	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return Promise.resolve(DEFAULT_PASSWORD_POLICY);
	}
}
