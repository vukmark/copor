import {ValidateDeleteContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateDeleteContentItemRepo';
import {ContentItemKyselyHelper} from '@copor/core/client/ContentItem/repositoryHelper/ContentItemKyselyHelper';

export class KyselyDeleteContentItemValidatorStorageRepo implements
    ValidateDeleteContentItemRepo {
	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean> {
		return ContentItemKyselyHelper.isInvalidContentItem(contentItemId);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return ContentItemKyselyHelper.contentItemHasReferences(id);
	}
}