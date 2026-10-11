import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCreateRegionInteractorRepo implements SaveItem<SaveRegionDTO> {
	async save(saveDTO: SaveRegionDTO): Promise<void> {
		await db
			.insertInto('region')
			.values({
				id: saveDTO.id,
				countryId: saveDTO.country,
				stateId: saveDTO.state,
				postalCode: saveDTO.postalCode
			})
			.execute();
	}
}
