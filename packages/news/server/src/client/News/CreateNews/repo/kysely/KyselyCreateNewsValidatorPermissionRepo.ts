import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {ValidateCanCreateNewsContext} from '@copor/news/domain/News/validations/permissions/ValidateCanCreateNews';

export class KyselyCreateNewsValidatorPermissionRepo extends KyselyUserPermissionRepo<ValidateCanCreateNewsContext> {
	protected getUserIdFromContext(context: ValidateCanCreateNewsContext): Promise<string> {
		return Promise.resolve(context.newsId);
	}
}