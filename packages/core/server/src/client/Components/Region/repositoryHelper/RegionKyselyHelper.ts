import {db} from '@copor/core/client/AppDataSource';
import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class RegionKyselyHelper {
	public static async isInvalidRegion(id: string | undefined): Promise<boolean> {
		if (!id)
			return Promise.resolve(true);
		const region = await db
			.selectFrom('region')
			.select('id')
			.where('id', '=', id)
			.executeTakeFirst();

		return !region;
	}
	public static async hasRegionReferences(id: string | undefined) {
		const helper = new EntityRepoHelper('region');

		return helper.hasReferences(id);
	}
}