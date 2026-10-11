import {ValidateUpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserLoginInformationRepo';
import {UserIdentityDTO} from '@copor/core/domain/User/repository/dto/UserIdentityDTO';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {DEFAULT_PASSWORD_POLICY} from '@copor/core/client/SystemSettings/settings/DefaultPasswordPolicy';

export class FakeUpdateUserLoginInformationValidatorStorageRepo implements ValidateUpdateUserLoginInformationRepo {
	isInvalidUserPassword(userId: string | undefined, password: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	getUserIdentity(userId: string): Promise<UserIdentityDTO> {
		return Promise.resolve({
			authUserId: 'fakeAuthUserId',
			userName: 'fakeUser',
			email: 'fake@example.com',
			firstName: 'Fake',
			lastName: 'User'
		});
	}
	getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return Promise.resolve(DEFAULT_PASSWORD_POLICY);
	}
	wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
