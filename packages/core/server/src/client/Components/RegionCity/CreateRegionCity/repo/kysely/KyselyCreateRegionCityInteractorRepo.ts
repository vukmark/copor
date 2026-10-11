import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCreateRegionCityInteractorRepo implements SaveItem<SaveRegionCityDTO> {
	async save(saveDTO: SaveRegionCityDTO): Promise<void> {
		await db
			.insertInto('regionCity')
			.values({
				id: saveDTO.id,
				city: saveDTO.city,
				community: saveDTO.community,
				communityCode: saveDTO.communityCode,
				latitude: saveDTO.latitude,
				longitude: saveDTO.longitude,
				province: saveDTO.province,
				provinceCode: saveDTO.provinceCode,
				regionId: saveDTO.regionId
			})
			.execute();
	}
}