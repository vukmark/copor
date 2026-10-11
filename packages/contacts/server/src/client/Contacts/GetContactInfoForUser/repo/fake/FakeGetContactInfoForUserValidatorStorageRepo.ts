import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';

export class FakeGetContactInfoForUserValidatorStorageRepo implements IsNotValidUserRepo {
	public isNotValidUser(userId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
