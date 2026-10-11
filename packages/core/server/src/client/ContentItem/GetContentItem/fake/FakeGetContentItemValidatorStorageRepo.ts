import {ValidateGetContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateGetContentItemRepo';

export class FakeGetContentItemValidatorStorageRepo
implements ValidateGetContentItemRepo {
	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}