import {
	ValidateUpdateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';


export class FakeUpdateUserAccountInformationValidatorStorageRepo implements ValidateUpdateUserAccountInformationRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidNativeLanguage(languageId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
