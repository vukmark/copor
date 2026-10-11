import {ValidateUpdateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateUpdateAiContextItemRepo';

export class FakeUpdateAiContextItemValidatorStorageRepo
implements ValidateUpdateAiContextItemRepo {
	public isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}