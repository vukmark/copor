import {ValidateCreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/ValidateCreateUserAccountInformationRepo';

export class FakeCreateUserAccountInformationValidatorStorageRepo implements ValidateCreateUserAccountInformationRepo {
	isEmailAlreadyInUse(email: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
