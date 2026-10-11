import {ValidateDeleteUserRepo} from '@copor/core/domain/User/repository/ValidateDeleteUserRepo';

export class FakeDeleteUserValidatorStorageRepo implements ValidateDeleteUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(!userId);
	}
}
