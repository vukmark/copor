import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';

export class FakeGetUserContactInformationValidatorStorageRepo implements IsNotValidUserRepo {
	public isNotValidUser(userId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
