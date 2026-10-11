import {ValidateGetAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateGetAiContextItemRepo';

export class FakeGetAiContextItemValidatorStorageRepo
implements ValidateGetAiContextItemRepo {
	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}