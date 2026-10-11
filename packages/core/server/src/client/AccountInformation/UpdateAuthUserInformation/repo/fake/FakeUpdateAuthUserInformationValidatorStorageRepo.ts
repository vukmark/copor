import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {DEFAULT_PASSWORD_POLICY} from '@copor/core/client/SystemSettings/settings/DefaultPasswordPolicy';

export class FakeUpdateAuthUserInformationValidatorStorageRepo
implements ValidateUpdateAuthUserInformationRepo {
	isNotValidUser(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return Promise.resolve(DEFAULT_PASSWORD_POLICY);
	}

	getUserRoleType(userId: string): Promise<RoleType | undefined> {
		return Promise.resolve(RoleType.ADMIN);
	}

	isUserNameUsedByAnotherUser(id: string, userName: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	isEmailUsedByAnotherUser(id: string, email: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	getAuthUserId(userId: string): Promise<string | undefined> {
		return Promise.resolve('fakeAuthUserId');
	}
}
