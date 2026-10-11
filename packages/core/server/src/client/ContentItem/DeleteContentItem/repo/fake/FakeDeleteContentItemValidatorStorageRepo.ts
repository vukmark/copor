import {ValidateDeleteContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateDeleteContentItemRepo';

export class FakeDeleteContentItemValidatorStorageRepo implements ValidateDeleteContentItemRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}

	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}