import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {db} from '@copor/core/client/AppDataSource';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetRegionListInteractorRepo implements ListItems<GetRegionDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetRegionDTO[]> {
		let baseQuery = db
			.selectFrom('region')
			.leftJoin('country', 'country.id', 'region.countryId')
			.leftJoin('state', 'state.id', 'region.stateId')
			.leftJoin('regionCity', 'regionCity.regionId', 'region.id')
			.select('region.id')
			.distinct();

		for (const filter of input.filters) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string : {
					let value = filter.values?.[0];

					if (value) {
						value = value.trim().replace(/\s+/g, '%');

						baseQuery = baseQuery.where((eb) => eb.or([
							eb('region.postalCode', 'like', `${value}%`),
							eb('country.name', 'like', `%${value}%`),
							eb('state.name', 'like', `%${value}%`),
							eb('regionCity.city', 'like', `%${value}%`)
						])
						);
					}
					break;
				}

				case FilterNameValues.SORT_BY_NAME as string :
					baseQuery = baseQuery.orderBy(
						'region.postalCode',
						filter.values![0] as 'asc' | 'desc'
					);
					break;
			}
		}

		baseQuery = baseQuery.orderBy('region.postalCode', 'asc');

		if (input.limit !== undefined) {
			baseQuery = baseQuery.limit(parseInt(input.limit, 10));
		}

		if (input.offset !== undefined) {
			baseQuery = baseQuery.offset(parseInt(input.offset, 10));
		}

		const paginatedRegions = baseQuery.as('paginatedRegions');

		const rows = await db
			.selectFrom(paginatedRegions)
			.innerJoin('region', 'region.id', 'paginatedRegions.id')
			.innerJoin('country', 'country.id', 'region.countryId')
			.innerJoin('state', 'state.id', 'region.stateId')
			.leftJoin('regionCity', 'regionCity.regionId', 'region.id')
			.select([
				'region.id',
				'region.postalCode',
				'country.id as countryId',
				'country.name as countryName',
				'state.id as stateId',
				'state.name as stateName',
				'regionCity.city',
				'regionCity.community',
				'regionCity.communityCode',
				'regionCity.latitude',
				'regionCity.longitude'
			])
			.orderBy('region.postalCode', 'asc')
			.execute();

		const regionMap = new Map<string, GetRegionDTO>();

		for (const row of rows) {
			if (!regionMap.has(row.id)) {
				regionMap.set(row.id, {
					id: row.id,
					postalCode: row.postalCode,
					country: {
						id: row.countryId,
						name: row.countryName
					},
					state: {
						id: row.stateId,
						name: row.stateName
					},
					cityList: []
				});
			}

			if (row.city) {
				regionMap.get(row.id)!.cityList.push(row.city);
			}
		}

		return Array.from(regionMap.values());
	}
}