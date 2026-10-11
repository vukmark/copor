import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';

export interface GetPasswordPolicyRepo {
	getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO>;
}
