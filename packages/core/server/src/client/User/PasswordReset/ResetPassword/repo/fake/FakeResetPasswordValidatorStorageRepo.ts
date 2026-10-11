import {ValidateResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ValidateResetPasswordRepo';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {DEFAULT_PASSWORD_POLICY} from '@copor/core/client/SystemSettings/settings/DefaultPasswordPolicy';

export class FakeResetPasswordValidatorStorageRepo implements ValidateResetPasswordRepo {
	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return Promise.resolve(DEFAULT_PASSWORD_POLICY);
	}

	wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	getAuthUserId(userNameOrEmail: string): Promise<string | undefined> {
		return Promise.resolve('fakeAuthUserId');
	}
}
