import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {db} from '@copor/core/client/AppDataSource';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {sql, SqlBool} from 'kysely';

const POSTAL_CODE_IS_NUMERIC = sql<SqlBool>`r.postal_code REGEXP '^[0-9]+$'`;

function postalCodeBetween(from: number, to: number) {
	return sql<SqlBool>`${POSTAL_CODE_IS_NUMERIC} AND CAST(r.postal_code AS UNSIGNED) BETWEEN ${from} AND ${to}`;
}

export class KyselyGetRegionCityListInteractorRepo implements ListItems<GetRegionCityDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetRegionCityDTO[]> {
		let query = db
			.selectFrom('regionCity as rc')
			.innerJoin('region as r', 'rc.regionId', 'r.id')
			.innerJoin('country as c', 'r.countryId', 'c.id')
			.innerJoin('state as s', 'r.stateId', 's.id')
			.select([
				'rc.id',
				'rc.regionId',
				'rc.city',
				'rc.province',
				'rc.provinceCode',
				'rc.community',
				'rc.communityCode',
				'rc.latitude',
				'rc.longitude',

				'r.postalCode as regionPostalCode',

				'c.name as countryName',
				'c.code as countryCode',

				's.name as stateName',
				's.code as stateCode'
			] as const);

		type OrderDirection = 'asc' | 'desc';

		for (const filter of input.filters) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string : {
					let value = filter.values?.[0];

					if (value) {
						value = value.trim().replace(/\s+/g, '%');

						query = query.where((eb) => eb.or([
							eb('rc.city', 'like', `%${value}%`),
							eb('r.postalCode', 'like', `${value}%`)
						])
						);
					}
					break;
				}

				case FilterNameValues.SEARCH_BY_STATE_ID as string : {
					const stateId = filter.values?.[0]?.trim();

					if (stateId) {
						query = query.where('s.id', '=', stateId);
					}
					break;
				}

				case FilterNameValues.SEARCH_BY_POSTAL_CODE_RANGE as string : {
					const from = filter.values?.[0]?.trim();
					const to = filter.values?.[1]?.trim();

					if (from && to && /^\d+$/.test(from) && /^\d+$/.test(to)) {
						query = query.where(postalCodeBetween(Number(from), Number(to)));
					}
					break;
				}

				case FilterNameValues.SORT_BY_CITY as string : {
					query = query.orderBy(
						'rc.city',
						filter.values![0] as OrderDirection
					);
					break;
				}

				case FilterNameValues.SORT_BY_POSTAL_CODE as string : {
					query = query.orderBy(
						'regionPostalCode',
						filter.values![0] as OrderDirection
					);
					break;
				}
			}
		}

		if (input.limit && input.offset) {
			const limit = parseInt(input.limit, 10);
			const offset = parseInt(input.offset, 10);

			query = query.limit(limit).offset(offset);
		}

		const results = await query.execute();


		return results.map((result) => ({
			id: result.id,
			regionId: result.regionId,
			city: result.city,
			province: result.province,
			provinceCode: result.provinceCode ?? '',
			community: result.community,
			communityCode: result.communityCode ?? '',
			postalCode: result.regionPostalCode,
			latitude: Number(result.latitude),
			longitude: Number(result.longitude)
		}));
	}
}