import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanCreateAiContextItemContext
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanCreateAiContextItem';

export class KyselyCreateAiContextItemValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanCreateAiContextItemContext> {
	protected getUserIdFromContext(context: ValidateCanCreateAiContextItemContext): Promise<string> {
		return Promise.resolve(context.aiContextItemId);
	}
}