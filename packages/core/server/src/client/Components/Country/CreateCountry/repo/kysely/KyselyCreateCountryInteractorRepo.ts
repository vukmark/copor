import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateCountryInteractorRepo implements SaveItem<SaveCountryDTO> {
	async save(saveDTO: SaveCountryDTO): Promise<void> {
		await db
			.insertInto('country')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				code: saveDTO.code,
				publishStatus: saveDTO.publishStatus,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)

			})
			.execute();
	}
}
