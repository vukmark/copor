import {db} from '@copor/core/client/AppDataSource';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {SaveChecklistRepo} from '@copor/checklist/domain/Checklist/repository/SaveChecklistRepo';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateChecklistInteractorRepo implements SaveChecklistRepo {
	async save(saveDTO: SaveChecklistDTO): Promise<void> {
		await db.insertInto('checklist').values({
			id: saveDTO.id,
			title: saveDTO.title ?? null,
			actorId: saveDTO.actorId,
			... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
		}).execute();
	}
}