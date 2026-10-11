import {SaveCountryRepo} from '@copor/core/domain/Components/Country/repository/SaveCountryRepo';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyUpdateCountryInteractorRepo implements SaveCountryRepo {
	async save(saveDTO: SaveCountryDTO): Promise<void> {
		await db
			.updateTable('country')
			.set({
				name: saveDTO.name,
				code: saveDTO.code,
				publishStatus: saveDTO.publishStatus,
				... TimestampHelper.getTimestampForUpdate(saveDTO.actorId)
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
