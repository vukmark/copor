import {db} from '@copor/core/client/AppDataSource';

export interface AddressParts {
	country: string;
	state: string;
	city: string;
	postalCode: string;
	streetAddress: string;
}

export interface TenantAddressData extends AddressParts {
	tenantName: string;
}

export class AddressKyselyHelper {
	public static async getAddressParts(addressId: string): Promise<AddressParts | null> {
		const address = await db
			.selectFrom('address')
			.innerJoin('country', 'country.id', 'address.country')
			.innerJoin('state', 'state.id', 'address.state')
			.select([
				'address.city',
				'address.postalCode',
				'address.streetAddress',
				'country.name as countryName',
				'state.name as stateName'
			])
			.where('address.id', '=', addressId)
			.executeTakeFirst();

		if (!address)
			return null;

		return {
			city: address.city ?? '',
			postalCode: address.postalCode ?? '',
			streetAddress: address.streetAddress ?? '',
			country: address.countryName,
			state: address.stateName
		};
	}

	public static async getUserAddress(userId: string): Promise<AddressParts | null> {
		const user = await db
			.selectFrom('user')
			.select('addressId')
			.where('id', '=', userId)
			.executeTakeFirst();

		return user?.addressId
			? this.getAddressParts(user.addressId)
			: null;
	}

	public static async getTenantAddressData(tenantId: string): Promise<TenantAddressData | null> {
		const tenant = await db
			.selectFrom('tenant')
			.select(['addressStreet', 'name'])
			.where('id', '=', tenantId)
			.executeTakeFirst();

		if (!tenant?.addressStreet)
			return null;

		const address = await this.getAddressParts(tenant.addressStreet);

		if (!address)
			return null;

		return {
			... address,
			tenantName: tenant.name
		};
	}

	public static async getTenantAddressDataForUser(userId: string): Promise<TenantAddressData | null> {
		const user = await db
			.selectFrom('user')
			.select(['tenantId'])
			.where('id', '=', userId)
			.executeTakeFirst();

		if (!user?.tenantId) {
			return null;
		}

		return this.getTenantAddressData(user.tenantId);
	}

	static async getAddressId(userId: string): Promise<string | undefined> {
		const user = await db
			.selectFrom('user')
			.select('addressId')
			.where('id', '=', userId)
			.executeTakeFirst();

		return user?.addressId ?? undefined;
	}
}
