import {
	ValidateCanGetContactInfoForUserContext
} from '@copor/contacts/domain/Contacts/validation/validator/ValidateCanGetContactInfoForUser';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyGetContactInfoForUserValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetContactInfoForUserContext> {
	protected getUserIdFromContext(context: ValidateCanGetContactInfoForUserContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}