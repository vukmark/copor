import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';

import {
	ValidateCanGetUserAccountInformationContext
} from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanGetUserAccountInformation';
import {
	KyselyGetUserAccountInformationValidatorPermissionRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/kysely/KyselyGetUserAccountInformationValidatorPermissionRepo';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';

export class GetUserAccountInformationValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanGetUserAccountInformationContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanGetUserAccountInformationContext> {
		return KyselyGetUserAccountInformationValidatorPermissionRepo;
	}
}