import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateRegionCityInteractorRepo implements SaveRegionCityRepo {
	async save(saveDTO: SaveRegionCityDTO): Promise<void> {
		await db
			.updateTable('regionCity')
			.set({
				id: saveDTO.id,
				regionId: saveDTO.regionId,
				city: saveDTO.city,
				province: saveDTO.province,
				provinceCode: saveDTO.provinceCode,
				community: saveDTO.community,
				communityCode: saveDTO.communityCode,
				latitude: saveDTO.latitude,
				longitude: saveDTO.longitude
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}