import {ValidateUpdateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateUpdateContentItemRepo';

export class FakeUpdateContentItemValidatorStorageRepo
implements ValidateUpdateContentItemRepo {
	public isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}