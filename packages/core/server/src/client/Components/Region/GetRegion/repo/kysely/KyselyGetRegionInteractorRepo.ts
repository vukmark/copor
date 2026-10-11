import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetRegionInteractorRepo implements GetItem<GetRegionDTO> {
	async load(id: string): Promise<GetRegionDTO> {
		const rows = await db
			.selectFrom('region as r')
			.innerJoin('country as c', 'r.countryId', 'c.id')
			.innerJoin('state as s', 'r.stateId', 's.id')
			.innerJoin('regionCity as rc', 'r.id', 'rc.regionId')
			.select([
				'r.id',
				'r.countryId',
				'c.name as countryName',
				'r.stateId',
				's.name as stateName',
				'r.postalCode',
				'rc.city',
				'rc.community',
				'rc.communityCode',
				'rc.latitude',
				'rc.longitude'
			] as const)
			.where('r.id', '=', id)
			.execute();

		if (!rows.length) {
			throw new Error(`Region with id ${id} not found`);
		}

		const first = rows[0];

		return {
			id: first.id,
			postalCode: first.postalCode,
			country: {id: first.countryId ?? '', name: first.countryName},
			state: {id: first.stateId ?? '', name: first.stateName},
			cityList: rows.map((r) => r.city)
		};
	}
}
