import {
	ValidateCanGetUserAccountInformationContext
} from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanGetUserAccountInformation';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyGetUserAccountInformationValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetUserAccountInformationContext> {
	protected getUserIdFromContext(context: ValidateCanGetUserAccountInformationContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}