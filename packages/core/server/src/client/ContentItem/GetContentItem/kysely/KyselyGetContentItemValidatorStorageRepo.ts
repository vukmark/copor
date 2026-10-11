import {ValidateGetContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateGetContentItemRepo';
import {ContentItemKyselyHelper} from '@copor/core/client/ContentItem/repositoryHelper/ContentItemKyselyHelper';

export class KyselyGetContentItemValidatorStorageRepo
implements ValidateGetContentItemRepo {
	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return ContentItemKyselyHelper.isInvalidContentItem(contentItemId);
	}
}