import {IsNotValidUserRepo} from '../../repository/IsNotValidUserRepo';
import {IsInvalidCountryRepo} from '@copor/core/domain/Components/Country/repository/IsInvalidCountryRepo';
import {IsInvalidStateRepo} from '@copor/core/domain/Components/State/repository/IsInvalidStateRepo';
import {IsInvalidNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/IsInvalidNativeLanguageRepo';

export interface ValidateUpdateUserAccountInformationRepo
	extends IsNotValidUserRepo, IsInvalidCountryRepo, IsInvalidStateRepo, IsInvalidNativeLanguageRepo {
}
