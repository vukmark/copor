import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {
	KyselyCreateContentItemNewsInteractorRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/ContentItemInteractors/KyselyCreateContentItemNewsInteractorRepo';
import {
	KyselyCreateContentItemUniversalInteractorRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/ContentItemInteractors/KyselyCreateContentItemUniversalInteractorRepo';

export class KyselyCreateContentItemInteractorRepo
implements SaveContentItemRepo {
	async save(saveDTO: SaveContentItemDTO): Promise<void> {
		if (saveDTO.contentType === ContentType.NEWS) {
			return new KyselyCreateContentItemNewsInteractorRepo().save(saveDTO);
		}
		return new KyselyCreateContentItemUniversalInteractorRepo().save(saveDTO);
	}
}