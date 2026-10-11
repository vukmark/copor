import {ValidateDeleteTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateDeleteTagRepo';

export class FakeDeleteTagValidatorStorageRepo implements ValidateDeleteTagRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidTag(tagId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}