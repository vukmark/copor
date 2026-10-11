import {ValidateDeleteAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateDeleteAiContextItemRepo';

export class FakeDeleteAiContextItemValidatorStorageRepo
implements ValidateDeleteAiContextItemRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}

	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}