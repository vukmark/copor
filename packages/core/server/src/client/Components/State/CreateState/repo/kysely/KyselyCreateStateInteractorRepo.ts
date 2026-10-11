import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateStateInteractorRepo implements SaveItem<SaveStateDTO> {
	public async save(saveDTO: SaveStateDTO): Promise<void> {
		await db
			.insertInto('state')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				code: saveDTO.code,
				countryId: saveDTO.countryId,
				publishStatus: saveDTO.publishStatus,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}
