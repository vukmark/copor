import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {db} from '@copor/core/client/AppDataSource';

export class CountryKyselyHelper {
	private static readonly helper = new EntityRepoHelper('country');

	public static async isInvalidCountry(id: string | undefined): Promise<boolean> {
		return this.helper.isInvalid(id);
	}
	public static async countryHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}

	public static async getGermanyCountryId(): Promise<string> {
		const country = await db
			.selectFrom('country')
			.select('id')
			.where('code', '=', 'DE')
			.executeTakeFirst();

		if (!country) {
			throw new Error('Germany country not found');
		}

		return country.id;
	}
}