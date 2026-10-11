import {ValidateUpdateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateUpdateAiContextItemRepo';
import {AiContextItemKyselyHelper} from '@copor/ai_context_item/client/AiContextItem/repositoryHelper/AiContextItemKyselyHelper';

export class KyselyUpdateAiContextItemValidatorStorageRepo
implements ValidateUpdateAiContextItemRepo {
	public isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return AiContextItemKyselyHelper.isInvalidAiContextItem(contextItemId);
	}
}