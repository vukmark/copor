import {ValidateCreateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateCreateAiContextItemRepo';

export class KyselyCreateAiContextItemValidatorStorageRepo
implements ValidateCreateAiContextItemRepo {
	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}