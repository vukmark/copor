import {
	ValidateUpdateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';
import {StateKyselyHelper} from '@copor/core/client/Components/State/repositoryHelper/StateKyselyHelper';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {NativeLanguageKyselyHelper} from '@copor/core/client/Components/NativeLanguage/repositoryHelper/NativeLanguageKyselyHelper';

export class KyselyUpdateUserAccountInformationValidatorStorageRepo implements ValidateUpdateUserAccountInformationRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
	isInvalidCountry(countryId: string | undefined): Promise<boolean> {
		return CountryKyselyHelper.isInvalidCountry(countryId);
	}
	isInvalidState(stateId: string | undefined): Promise<boolean> {
		return StateKyselyHelper.isInvalidState(stateId);
	}
	isInvalidNativeLanguage(languageId: string | undefined): Promise<boolean> {
		return NativeLanguageKyselyHelper.isInvalidNativeLanguage(languageId);
	}
}
