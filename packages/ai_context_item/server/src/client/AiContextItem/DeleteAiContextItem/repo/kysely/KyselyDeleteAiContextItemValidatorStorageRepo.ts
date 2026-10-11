import {ValidateDeleteAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateDeleteAiContextItemRepo';
import {AiContextItemKyselyHelper} from '@copor/ai_context_item/client/AiContextItem/repositoryHelper/AiContextItemKyselyHelper';

export class KyselyDeleteAiContextItemValidatorStorageRepo
implements ValidateDeleteAiContextItemRepo {
	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return AiContextItemKyselyHelper.isInvalidAiContextItem(contextItemId);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return AiContextItemKyselyHelper.aiContextItemHasReferences(id);
	}
}