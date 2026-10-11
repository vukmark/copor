import {ValidateUpdateTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateUpdateTagRepo';
import {TagKyselyHelper} from '@copor/core/client/Components/Tag/repositoryHelper/TagKyselyHelper';

export class KyselyUpdateTagValidatorStorageRepo implements ValidateUpdateTagRepo {
	isInvalidTag(tagId: string): Promise<boolean> {
		return TagKyselyHelper.isInvalidTag(tagId);
	}
}
