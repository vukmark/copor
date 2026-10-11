import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCanUpdateUserLoginInformationContext}
	from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanUpdateUserLoginInformation';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	KyselyGetUserAccountInformationValidatorPermissionRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/kysely/KyselyGetUserAccountInformationValidatorPermissionRepo';

export class UpdateUserLoginInformationValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanUpdateUserLoginInformationContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanUpdateUserLoginInformationContext> {
		return KyselyGetUserAccountInformationValidatorPermissionRepo;
	}
}