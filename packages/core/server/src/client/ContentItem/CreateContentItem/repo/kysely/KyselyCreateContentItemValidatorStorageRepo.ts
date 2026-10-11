import {ValidateCreateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateCreateContentItemRepo';

export class KyselyCreateContentItemValidatorStorageRepo implements ValidateCreateContentItemRepo {
	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}