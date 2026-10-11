import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';

export class KyselyCreateContentItemUniversalInteractorRepo
implements SaveContentItemRepo {
	async save(saveDTO: SaveContentItemDTO): Promise<void> {
		await db
			.insertInto('contentItem')
			.values({
				id: saveDTO.id,
				title: saveDTO.title,
				summary: saveDTO.summary,
				content: saveDTO.content,
				publishStatus: saveDTO.publishStatus,
				contentType: saveDTO.contentType,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.executeTakeFirst();
	}
}