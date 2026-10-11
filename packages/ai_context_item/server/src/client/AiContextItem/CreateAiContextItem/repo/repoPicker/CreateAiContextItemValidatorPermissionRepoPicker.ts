import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanCreateAiContextItemContext
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanCreateAiContextItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	KyselyCreateAiContextItemValidatorPermissionRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/kysely/KyselyCreateAiContextItemValidatorPermissionRepo';

export class CreateAiContextItemValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanCreateAiContextItemContext> {
	protected getKyselyRepo(): new(appContext: AppContext) => PermissionRepository<ValidateCanCreateAiContextItemContext> {
		return KyselyCreateAiContextItemValidatorPermissionRepo;
	}
}