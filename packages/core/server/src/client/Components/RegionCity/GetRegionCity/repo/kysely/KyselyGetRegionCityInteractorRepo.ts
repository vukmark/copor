import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetRegionCityInteractorRepo implements GetItem<GetRegionCityDTO> {
	async load(id: string): Promise<GetRegionCityDTO> {
		const result = await db
			.selectFrom('regionCity as rc')
			.innerJoin('region as r', 'rc.regionId', 'r.id')
			.select([
				'rc.id',
				'rc.regionId as regionId',
				'rc.city',
				'rc.province',
				'rc.provinceCode as provinceCode',
				'rc.community',
				'rc.communityCode as communityCode',
				'rc.latitude',
				'rc.longitude',
				'r.postalCode as postalCode'
			] as const)
			.where('rc.id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`RegionCity with id ${id} not found`);
		}

		return {
			... result,
			communityCode: result.communityCode ?? '',
			provinceCode: result.provinceCode ?? ''
		};
	}
}