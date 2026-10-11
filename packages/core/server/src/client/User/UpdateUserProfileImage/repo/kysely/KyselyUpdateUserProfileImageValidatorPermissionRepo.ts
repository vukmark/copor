import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanUpdateUserAccountInformationContext
} from '@copor/core/domain/Core/Validations/Validators/ValidateCanUpdateUserAccountInformation';

export class KyselyUpdateUserProfileImageValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanUpdateUserAccountInformationContext> {
	protected getUserIdFromContext(context: ValidateCanUpdateUserAccountInformationContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}
