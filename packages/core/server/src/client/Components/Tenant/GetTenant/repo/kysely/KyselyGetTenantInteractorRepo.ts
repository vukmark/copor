import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {db} from '@copor/core/client/AppDataSource';
import {Kysely, Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';

export class KyselyGetTenantInteractorRepo implements GetItem<GetTenantDTO> {
	private dbInstance: Kysely<DB> | Transaction<DB> = db;

	public useTransaction(trx: Transaction<DB>): this {
		this.dbInstance = trx;

		return this;
	}
	async load(id: string): Promise<GetTenantDTO> {
		const result = await this.dbInstance
			.selectFrom('tenant as s')
			.leftJoin('address as ca', 's.contactAddressId', 'ca.id')
			.leftJoin('region as r', 's.regionId', 'r.id')
			.leftJoin('country as c', 'r.countryId', 'c.id')
			.leftJoin('state as st', 'r.stateId', 'st.id')
			.select([
				's.id as tenantId',
				's.name as tenantName',
				's.isBaseTenant as tenantIsBaseTenant',
				's.addressStreet as tenantAddressStreet',
				's.regionId as tenantRegionId',
				's.regionCityId as tenantRegionCityId',
				's.city as tenantCity',
				's.publishStatus as tenantPublishStatus',
				's.email as tenantEmail',
				's.phoneNumber as tenantPhoneNumber',
				's.contactName as tenantContactName',
				's.contactDepartment as tenantContactDepartment',
				's.contactAddressId as tenantAddressId',
				's.contactPhone as tenantContactPhone',
				's.latitude as tenantLatitude',
				's.longitude as tenantLongitude',
				's.contactEmail as tenantContactEmail',

				'r.postalCode as regionPostalCode',
				'c.name as countryName',
				'c.id as countryId',
				'st.name as stateName',
				'st.id as stateId',

				'ca.streetAddress as contactAddress',
				'ca.postalCode as contactPostalCode',
				'ca.city as contactCity'
			])
			.where('s.id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Tenant with id ${id} not found`);
		}

		if (result.tenantRegionId == null) {
			throw new Error(`Tenant with id ${id} has no region linked`);
		}

		if (result.tenantRegionCityId == null) {
			throw new Error(`Tenant with id ${id} has no region city linked`);
		}

		if (result.countryId == null) {
			throw new Error(`Tenant with id ${id} has no country linked`);
		}

		if (result.stateId == null) {
			throw new Error(`Tenant with id ${id} has no state linked`);
		}

		if (result.regionPostalCode == null) {
			throw new Error(`Tenant with id ${id} is missing region postal code`);
		}

		if (result.tenantLatitude == null || result.tenantLongitude == null) {
			throw new Error('Invalid latitude/longitude');
		}

		return {
			id: result.tenantId,
			name: result.tenantName,
			isBaseTenant: Boolean(result.tenantIsBaseTenant),

			regionId: result.tenantRegionId,
			regionCityId: result.tenantRegionCityId,
			addressStreet: result.tenantAddressStreet,
			postalCode: result.regionPostalCode,
			city: result.tenantCity,

			countryName: result.countryName ?? '',
			countryId: result.countryId ?? '',
			stateName: result.stateName ?? '',
			stateId: result.stateId ?? '',

			publishStatus: result.tenantPublishStatus,
			email: result.tenantEmail,
			phone: result.tenantPhoneNumber ?? '',

			contactName: result.tenantContactName ?? '',
			contactDepartment: result.tenantContactDepartment ?? '',
			contactAddress: result.contactAddress ?? '',
			contactPostalCode: result.contactPostalCode ?? '',
			contactCity: result.contactCity ?? '',
			contactPhone: result.tenantContactPhone ?? '',
			contactEmail: result.tenantContactEmail ?? '',

			latitude: Number(result.tenantLatitude),
			longitude: Number(result.tenantLongitude)
		};
	}
}
