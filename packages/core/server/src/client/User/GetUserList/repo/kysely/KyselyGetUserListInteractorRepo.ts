import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {sql} from 'kysely';
import {ActiveStatusFilterValues} from '@copor/core/domain/Core/enum/ActiveStatusFilterValues';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GroupListDTO} from '@copor/core/domain/User/interactor/dto/GroupListDTO';
import i18next from 'i18next';

export class KyselyGetUserListInteractorRepo implements ListItems<GetUserDTO> {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	public async list(input: ListRepoInputDTO): Promise<GetUserDTO[]> {
		let query = db.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.leftJoin('image', 'user.profileImageId', 'image.id')
			.select([
				'user.id as id',
				sql<string>`TRIM(${sql.ref('user.firstName')})`.as('firstName'),
				sql<string>`TRIM(${sql.ref('user.lastName')})`.as('lastName'),
				'role.name as role',
				'authUser.userName as userName',
				'user.isDefaultRole as isDefaultRole',
				'user.isActive as isActive',
				'image.name as imageName',
				'image.extension as imageExtension',
				'authUser.email as email',
				sql<number>`(SELECT COUNT(*) FROM user_group_user_map WHERE user_group_user_map.user_id = user.id)`
					.as('groups')
			]);

		const sortFields: {column: 'firstName' | 'lastName' | 'userName' | 'role' | 'groups'; order: 'asc' | 'desc'}[]
			= [];

		for (const filter of input.filters) {
			if (filter.name === FilterNameValues.SEARCH.toString() && filter.values?.length) {
				const value = filter.values[0].trim();

				if (value) {
					const tokens = value.split(/\s+/);

					query = query.where((eb) => eb.and(
						tokens.map((token) => eb.or([
							eb('user.firstName', 'like', `%${token}%`),
							eb('user.lastName', 'like', `%${token}%`)
						]))
					));
				}
			}

			if (filter.name === FilterNameValues.SORT_BY_NAME.toString() && filter.values?.length) {
				sortFields.push({column: 'firstName', order: filter.values[0].toLowerCase() === 'desc' ? 'desc' : 'asc'});
			}

			if (filter.name === FilterNameValues.SORT_BY_SURNAME.toString() && filter.values?.length) {
				sortFields.push({column: 'lastName', order: filter.values[0].toLowerCase() === 'desc' ? 'desc' : 'asc'});
			}

			if (filter.name === FilterNameValues.SORT_BY_USERNAME.toString() && filter.values?.length) {
				sortFields.push({column: 'userName', order: filter.values[0].toLowerCase() === 'desc' ? 'desc' : 'asc'});
			}

			if (filter.name === FilterNameValues.SORT_BY_ROLE.toString() && filter.values?.length) {
				sortFields.push({column: 'role', order: filter.values[0].toLowerCase() === 'desc' ? 'desc' : 'asc'});
			}

			if (filter.name === FilterNameValues.SORT_BY_GROUP.toString() && filter.values?.length) {
				sortFields.push({column: 'groups', order: filter.values[0].toLowerCase() === 'desc' ? 'asc' : 'desc'});
			}
		}

		if (sortFields.length === 0) {
			sortFields.push({column: 'lastName', order: 'asc'});
		}

		const roleValues = this.getFilterValues(input.filters, FilterNameValues.ROLE);

		if (roleValues?.length) {
			query = query.where('role.type', 'in', roleValues as RoleType[]);
		}

		const activeValues = this.getFilterValues(input.filters, FilterNameValues.IS_ACTIVE);

		if (activeValues?.length) {
			const mappedValues = activeValues.map((value) => value === ActiveStatusFilterValues.ACTIVE.toString() ? 1 : 0);

			query = query.where('user.isActive', 'in', mappedValues);
		}

		for (const sort of sortFields) {
			query = query.orderBy(sort.column, sort.order);
		}

		if (input.limit && input.offset) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			query = query.limit(parsedLimit).offset(parsedOffset);
		}

		const resultData = await query.execute();
		const groupListByUserId = await this.getGroupListByUserId(resultData.map((result) => result.id));

		return resultData.map((result): GetUserDTO => ({
			id: result.id,
			firstName: result.firstName,
			lastName: result.lastName,
			userName: result.userName,
			email: result.email ?? '',
			imageName: result.imageName ?? undefined,
			imageExtension: result.imageExtension ?? undefined,
			role: result.role,
			isActive: Boolean(result.isActive),
			isDefaultRole: Boolean(result.isDefaultRole),
			groupList: groupListByUserId.get(result.id) ?? {userGroupList: []}
		}));
	}

	private getFilterValues(filterList: GetFilterDTO[], name: FilterNameValues): string[] | undefined {
		return filterList.find((filter) => filter.name === name.toString())?.values;
	}

	private async getGroupListByUserId(userIdList: string[]): Promise<Map<string, GroupListDTO>> {
		const groupListByUserId = new Map<string, GroupListDTO>();

		if (userIdList.length === 0) {
			return groupListByUserId;
		}

		const userGroupRows = await db.selectFrom('userGroupUserMap')
			.innerJoin('userGroup', 'userGroup.id', 'userGroupUserMap.userGroupId')
			.select(['userGroupUserMap.userId as userId', 'userGroup.name as name', 'userGroup.isSpecial as isSpecial'])
			.where('userGroupUserMap.userId', 'in', userIdList)
			.execute();

		i18next.setDefaultNamespace('user_group');
		for (const row of userGroupRows) {
			const name = row.isSpecial ? i18next.t('translationStringList.' + row.name) : row.name;
			let entry = groupListByUserId.get(row.userId);

			if (!entry) {
				entry = {userGroupList: []};
				groupListByUserId.set(row.userId, entry);
			}

			entry.userGroupList.push({name});
		}

		return groupListByUserId;
	}
}
