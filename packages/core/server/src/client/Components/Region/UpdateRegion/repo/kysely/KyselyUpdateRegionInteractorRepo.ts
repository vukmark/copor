import {SaveRegionRepo} from '@copor/core/domain/Components/Region/repository/SaveRegionRepo';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateRegionInteractorRepo implements SaveRegionRepo {
	async save(saveDTO: SaveRegionDTO): Promise<void> {
		await db
			.updateTable('region')
			.set({
				id: saveDTO.id,
				countryId: saveDTO.country,
				stateId: saveDTO.state,
				postalCode: saveDTO.postalCode,
				//city: saveDTO.city,
				//community: saveDTO.community,
				//communityCode: saveDTO.communityCode,
				//latitude: saveDTO.latitude,
				//longitude: saveDTO.longitude,
				//publishStatus: saveDTO.publishStatus
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
