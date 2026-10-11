import {ValidateGetTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateGetTagRepo';

export class FakeGetTagValidatorStorageRepo implements ValidateGetTagRepo {
	isInvalidTag(tagId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
