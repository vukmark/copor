import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCanUpdateUserAccountInformationContext}
	from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanUpdateUserAccountInformation';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	KyselyGetUserAccountInformationValidatorPermissionRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/kysely/KyselyGetUserAccountInformationValidatorPermissionRepo';

export class UpdateUserAccountInformationValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanUpdateUserAccountInformationContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanUpdateUserAccountInformationContext> {
		return KyselyGetUserAccountInformationValidatorPermissionRepo;
	}
}