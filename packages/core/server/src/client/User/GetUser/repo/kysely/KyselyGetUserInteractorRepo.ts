import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyGetUserInteractorRepo implements GetItem<GetUserDTO> {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async load(id: string): Promise<GetUserDTO> {
		const userResult = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.where('user.id', '=', id)
			.select([
				'user.id as id',
				'user.roleId as role',
				'user.isActive as isActive',
				'authUser.userName as userName',
				'user.isDefaultRole as isDefaultRole',
				'role.name as roleName',
				'authUser.email as email'
			])
			.executeTakeFirst();

		if (!userResult) {
			throw new Error(`User with id ${id} not found`);
		}

		const userDetails = await UserKyselyHelper.getUserData(id, this.appContext);

		if (!userDetails) {
			throw new Error(`User details for id ${id} not found`);
		}

		return {
			id: userResult.id,
			role: userResult.roleName ?? '',
			isDefaultRole: Boolean(userResult.isDefaultRole),
			isActive: Boolean(userResult.isActive),
			firstName: userDetails.userFirstName ?? '',
			lastName: userDetails.userLastName ?? '',
			email: userResult.email ?? '',
			userName: userDetails.username ?? '',
			imageName: userDetails.imageName ?? undefined,
			imageExtension: userDetails.imageExtension ?? undefined
		};
	}
}