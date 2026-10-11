import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	KyselyUpdateUserProfileImageValidatorPermissionRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/kysely/KyselyUpdateUserProfileImageValidatorPermissionRepo';
import {
	ValidateCanUpdateUserAccountInformationContext
} from '@copor/core/domain/Core/Validations/Validators/ValidateCanUpdateUserAccountInformation';

export class UpdateUserProfileImageValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanUpdateUserAccountInformationContext> {
	protected getKyselyRepo():
	new(appContext: AppContext) => PermissionRepository<ValidateCanUpdateUserAccountInformationContext> {
		return KyselyUpdateUserProfileImageValidatorPermissionRepo;
	}
}
