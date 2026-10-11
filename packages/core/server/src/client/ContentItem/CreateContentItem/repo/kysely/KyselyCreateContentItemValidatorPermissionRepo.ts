import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanCreateContentItemContext
} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanCreateContentItem';

export class KyselyCreateContentItemValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanCreateContentItemContext> {
	protected getUserIdFromContext(context: ValidateCanCreateContentItemContext): Promise<string> {
		return Promise.resolve(context.contentItemId);
	}
}