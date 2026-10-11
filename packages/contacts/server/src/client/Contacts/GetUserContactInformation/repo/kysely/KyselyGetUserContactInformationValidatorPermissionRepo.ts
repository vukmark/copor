import {
	ValidateCanGetUserContactInformationContext
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/permissions/ValidateCanGetUserContactInformation';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyGetUserContactInformationValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetUserContactInformationContext> {
	protected getUserIdFromContext(context: ValidateCanGetUserContactInformationContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}