import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';

export class FakeUpdateUserProfileImageValidatorStorageRepo implements ValidateUpdateUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
