import {ValidateGetUserRepo} from '@copor/core/domain/User/repository/ValidateGetUserRepo';

export class FakeGetUserValidatorStorageRepo implements ValidateGetUserRepo {
	public isNotValidUser(stateId: string): Promise<boolean> {
		return new Promise((resolve) => {
			resolve(false);
		});
	}
}