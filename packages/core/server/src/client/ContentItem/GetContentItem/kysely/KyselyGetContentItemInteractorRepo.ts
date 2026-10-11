import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {db} from '@copor/core/client/AppDataSource';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {
	KyselyGetNewsInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItem/kysely/ContentItemIteractors/KyselyGetNewsInteractorRepo';
import {
	KyselyGetContentItemWithoutRoleListInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItem/kysely/ContentItemIteractors/KyselyGetContentItemWithoutRoleListInteractorRepo';

export class KyselyGetContentItemInteractorRepo
implements GetItem<GetContentItemDTO> {
	async load(id: string): Promise<GetContentItemDTO> {
		const option = await db
			.selectFrom('contentItem as ci')
			.select('ci.contentType')
			.where('ci.id', '=', id)
			.executeTakeFirst();

		if (!option) {
			throw new Error(`Can't find content item with id: ${id}`);
		}

		if (option.contentType === ContentType.NEWS) {
			return new KyselyGetNewsInteractorRepo().load(id);
		}

		return new KyselyGetContentItemWithoutRoleListInteractorRepo().load(id);
	}
}