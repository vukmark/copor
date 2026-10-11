import {db} from '@copor/core/client/AppDataSource';
import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {DB} from '@copor/core/client/types/db';
import {Kysely, Transaction} from 'kysely';

export class RegionCityKyselyHelper {
	public static async isInvalidRegionCity(id: string | undefined): Promise<boolean> {
		if (!id)
			return Promise.resolve(true);
		const regionCity = await db
			.selectFrom('regionCity')
			.select('id')
			.where('id', '=', id)
			.executeTakeFirst();

		return !regionCity;
	}
	public static async hasRegionCityReferences(id: string | undefined) {
		const helper = new EntityRepoHelper('regionCity');

		return helper.hasReferences(id);
	}

	// Resolves the region_city a tenant belongs to given its region and city text.
	// Exact (case-insensitive) city match wins; otherwise falls back to an existing
	// region_city under that region so the tenant stays matchable to its region;
	// if the region has no region_city rows yet, one is created from the given city.
	public static async findOrCreateRegionCityId(
		regionId: string,
		city: string,
		trx: Kysely<DB> | Transaction<DB>
	): Promise<string> {
		const candidates = await trx
			.selectFrom('regionCity')
			.select(['id', 'city'])
			.where('regionId', '=', regionId)
			.orderBy('id')
			.execute();

		const normalizedCity = city.trim().toLowerCase();
		const exactMatch = candidates.find((candidate) => candidate.city.trim().toLowerCase() === normalizedCity);

		if (exactMatch) {
			return exactMatch.id;
		}

		if (candidates.length > 0) {
			return candidates[0].id;
		}

		const newId = await new IdGenerator().getNewId();

		await trx
			.insertInto('regionCity')
			.values({
				id: newId,
				regionId,
				city,
				community: '',
				province: '',
				latitude: 0,
				longitude: 0
			})
			.execute();

		return newId;
	}
}