import {db} from '@copor/core/client/AppDataSource';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {SaveStateRepo} from '@copor/core/domain/Components/State/repository/SaveStateRepo';

export class KyselyUpdateStateInteractorRepo implements SaveStateRepo {
	public async save(saveDTO: SaveStateDTO): Promise<void> {
		await db
			.updateTable('state')
			.set({
				name: saveDTO.name,
				code: saveDTO.code,
				countryId: saveDTO.countryId,
				publishStatus: saveDTO.publishStatus
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
