import {ValidateGetTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateGetTagRepo';
import {TagKyselyHelper} from '@copor/core/client/Components/Tag/repositoryHelper/TagKyselyHelper';

export class KyselyGetTagValidatorStorageRepo implements ValidateGetTagRepo {
	isInvalidTag(tagId: string | undefined): Promise<boolean> {
		return TagKyselyHelper.isInvalidTag(tagId);
	}
}