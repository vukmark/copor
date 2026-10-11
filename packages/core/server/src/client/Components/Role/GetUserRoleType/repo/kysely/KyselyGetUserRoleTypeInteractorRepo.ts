import {GetUserRoleTypeRepo} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetUserRoleTypeInteractorRepo implements GetUserRoleTypeRepo {
	public async load(userId: string): Promise<RoleType> {
		const result = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.where('user.id', '=', userId)
			.select('role.type as roleType')
			.executeTakeFirst();

		return result!.roleType;
	}
}
