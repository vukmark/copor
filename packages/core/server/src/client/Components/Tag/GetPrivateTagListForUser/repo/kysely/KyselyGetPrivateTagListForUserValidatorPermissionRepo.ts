import {ValidateCanGetPrivateTagListForUserContext} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetPrivateTagListForUser';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyGetPrivateTagListForUserValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetPrivateTagListForUserContext> {
	protected getUserIdFromContext(context: ValidateCanGetPrivateTagListForUserContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}