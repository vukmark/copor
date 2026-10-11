import {ValidateGetAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateGetAiContextItemRepo';
import {AiContextItemKyselyHelper} from '@copor/ai_context_item/client/AiContextItem/repositoryHelper/AiContextItemKyselyHelper';

export class KyselyGetAiContextItemValidatorStorageRepo
implements ValidateGetAiContextItemRepo {
	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return AiContextItemKyselyHelper.isInvalidAiContextItem(contextItemId);
	}
}