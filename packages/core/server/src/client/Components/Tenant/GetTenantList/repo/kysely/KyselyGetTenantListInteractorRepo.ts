import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {db} from '@copor/core/client/AppDataSource';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {IsBaseTenantFilterValues} from '@copor/core/domain/Core/enum/IsBaseTenantFilterValues';

export class KyselyGetTenantListInteractorRepo implements ListItems<GetTenantDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetTenantDTO[]> {
		let query = db
			.selectFrom('tenant as s')
			.innerJoin('region as r', 's.regionId', 'r.id')
			.innerJoin('country as c', 'r.countryId', 'c.id')
			.innerJoin('state as st', 'r.stateId', 'st.id')
			.select([
				's.id',
				's.name',
				's.isBaseTenant',
				's.addressStreet',
				's.addressStreet as address',
				's.regionId as regionId',
				's.regionCityId as regionCityId',
				's.city as city',
				'r.postalCode as postalCode',
				'c.name as countryName',
				'c.id as countryId',
				'st.name as stateName',
				'st.id as stateId',
				's.publishStatus',
				's.email',
				's.phoneNumber',
				's.contactName',
				's.contactDepartment',
				's.contactAddressId',
				's.contactPhone',
				's.latitude',
				's.longitude',
				'contactEmail'
			]);

		for (const filter of input.filters) {
			switch (filter.name) {
				case FilterNameValues.SEARCH as string :
					let value = filter.values?.[0];

					if (value) {
						value = value.trim().replace(/\s+/g, '%');

						query = query.where((eb) => eb.or([
							eb('s.name', 'like', `%${value}%`)
						])
						);
					}
					break;
				case FilterNameValues.SORT_BY_NAME as string :
					query = query.orderBy('s.name', filter.values![0] as 'asc' | 'desc');
					break;
				case FilterNameValues.PUBLISH_STATUS as string :
					query = query.where('s.publishStatus', 'in', filter.values as PublishStatus[]);
					break;
				case FilterNameValues.SORT_BY_TENANT_TYPE as string :
					query = query.orderBy('s.isBaseTenant', filter.values![0] as 'asc' | 'desc');
					break;
				case FilterNameValues.IS_BASE_TENANT as string :
					const mappedValues = filter.values!.map((v) => (v === IsBaseTenantFilterValues.BASE_TENANT ? 1 : 0)
					);

					query = query.where('s.isBaseTenant', 'in', mappedValues);
					break;
				case FilterNameValues.STATE as string :
					query = query.where('st.id', 'in', filter.values!);
					break;
				case FilterNameValues.EXCLUDE_TENANT_ID as string :
					if (filter.values?.[0])
						query = query.where('s.id', '!=', filter.values[0]);
					break;
			}
		}

		query = query.orderBy('name', 'asc');

		if (input.limit && input.offset) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			query = query.limit(parsedLimit).offset(parsedOffset);
		}

		const results = await query.execute();

		return results.map((result) => {
			return {
				... result,
				publishStatus: result.publishStatus,
				isBaseTenant: Boolean(result.isBaseTenant),
				regionId: result.regionId,
				regionCityId: result.regionCityId ?? '',
				addressStreet: result.address ?? '',
				postalCode: result.postalCode ?? '',
				city: result.city ?? '',
				state: {
					id: result.stateId,
					name: result.stateName
				},
				country: {
					id: result.countryId,
					name: result.countryName
				},
				latitude: result.latitude ?? undefined,
				longitude: result.longitude ?? undefined,
				phoneNumber: result.phoneNumber ?? '',
				contactName: result.contactName ?? '',
				contactDepartment: result.contactDepartment ?? '',
				contactEmail: result.contactEmail ?? '',
				contactPhone: result.contactPhone ?? ''
			};
		});
	}
}
