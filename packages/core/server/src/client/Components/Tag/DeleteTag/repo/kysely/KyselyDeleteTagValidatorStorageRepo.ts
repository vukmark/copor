import {ValidateDeleteTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateDeleteTagRepo';
import {TagKyselyHelper} from '@copor/core/client/Components/Tag/repositoryHelper/TagKyselyHelper';

export class KyselyDeleteTagValidatorStorageRepo implements ValidateDeleteTagRepo {
	isInvalidTag(id: string | undefined): Promise<boolean> {
		return TagKyselyHelper.isInvalidTag(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return TagKyselyHelper.tagHasReferences(id);
	}
}