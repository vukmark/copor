import {GetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/GetUserGroupUserListRepo';
import {db} from '@copor/core/client/AppDataSource';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';
import {ListItemsByIdDTO} from '@copor/core/domain/Core/Interactors/ListItemsByIdUseCase';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class KyselyGetUserGroupUserListInteractorRepo implements GetUserGroupUserListRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async list(input: ListItemsByIdDTO): Promise<GetUserGroupUserListDTO[]> {
		let query = db.selectFrom('userGroupUserMap')
			.innerJoin('user', 'user.id', 'userGroupUserMap.userId')
			.innerJoin('role', 'role.id', 'user.roleId')
			.select('userGroupUserMap.userId as userId')
			.where('userGroupUserMap.userGroupId', '=', input.id)
			// Inactive regular users are hidden from membership; admins stay visible so saving
			// this form doesn't silently drop them.
			.where((eb) => eb.or([
				eb('user.isActive', '=', 1),
				eb('role.type', '=', RoleType.ADMIN)
			]))
			.orderBy('userGroupUserMap.userId', 'asc');

		if (input.limit !== undefined && input.offset !== undefined) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			query = query.limit(parsedLimit).offset(parsedOffset);
		}

		const userIdList = await query.execute();

		return await Promise.all(
			userIdList.map(async (user) => {
				const userData = await UserKyselyHelper.getUserData(user.userId, this.appContext);

				return {
					id: user.userId,
					firstName: userData.userFirstName ?? '',
					lastName: userData.userLastName ?? '',
					imageName: userData.imageName ?? '',
					imageExtension: userData.imageExtension ?? ''
				};
			})
		);
	}
}