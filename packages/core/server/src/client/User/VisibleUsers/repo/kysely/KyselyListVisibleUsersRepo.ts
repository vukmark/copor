import {db} from '@copor/core/client/AppDataSource';
import {ListVisibleUsersRepo, ListVisibleUsersRepoInput} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {KyselyVisibleUsersHelper} from '@copor/core/client/User/VisibleUsers/KyselyVisibleUsersHelper';
import {DEFAULT_LIST_LIMIT, DEFAULT_LIST_OFFSET} from '@copor/core/client/Core/Pagination/PaginationDefaults';
import {sql} from 'kysely';

// Users the actor may see under the interactor's permission (see
// ListVisibleUsers and KyselyVisibleUsersHelper).
export class KyselyListVisibleUsersRepo implements ListVisibleUsersRepo {
	public async list(input: ListVisibleUsersRepoInput): Promise<VisibleUserDTO[]> {
		const actorId = input.actorId;

		let query = db.selectFrom('user')
			.leftJoin('image', 'image.id', 'user.profileImageId')
			.select([
				'user.id as id',
				sql<string>`TRIM(${sql.ref('user.firstName')})`.as('firstName'),
				sql<string>`TRIM(${sql.ref('user.lastName')})`.as('lastName'),
				'image.name as imageName',
				'image.extension as imageExtension',
				'user.isActive as isActive'
			]);

		query = await KyselyVisibleUsersHelper.restrictToVisible(query, actorId, input.permissionType, input.activeOnly);

		const search = input.filters
			.find((filter) => filter.name === FilterNameValues.SEARCH.toString())?.values?.[0]?.trim();

		if (search) {
			query = query.where((eb) => eb.and(
				search.split(/\s+/).map((token) => eb.or([
					eb('user.firstName', 'like', `%${token}%`),
					eb('user.lastName', 'like', `%${token}%`)
				]))
			));
		}

		const limit = input.limit ? parseInt(input.limit, 10) : DEFAULT_LIST_LIMIT;
		const offset = input.offset ? parseInt(input.offset, 10) : DEFAULT_LIST_OFFSET;

		const rows = await query
			.orderBy('lastName', 'asc')
			.orderBy('firstName', 'asc')
			.orderBy('user.id', 'asc')
			.limit(limit)
			.offset(offset)
			.execute();

		return rows.map((row) => ({
			id: row.id,
			firstName: row.firstName ?? '',
			lastName: row.lastName ?? '',
			imageName: row.imageName ?? undefined,
			imageExtension: row.imageExtension ?? undefined,
			isActive: Boolean(row.isActive)
		}));
	}
}
