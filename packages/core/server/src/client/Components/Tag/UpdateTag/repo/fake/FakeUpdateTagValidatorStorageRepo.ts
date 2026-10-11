import {ValidateUpdateTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateUpdateTagRepo';

export class FakeUpdateTagValidatorStorageRepo implements ValidateUpdateTagRepo {
	isInvalidTag(tagId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
