import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {db} from '../../AppDataSource';

/**
 * @deprecated 0.1.0 Use instead this.container.getNewRepoPicker(GetUserRoleTypeInteractorRepoPicker);
 * and pass params from controller
 */
export class KyselyRoleHelper {
	public static async getRoleByRoleType(input: RoleType): Promise<GetRoleDTO> {
		const loadRole = await db
			.selectFrom('role as r')
			.select(['r.id', 'r.name', 'r.type'])
			.where('r.type', '=', input)
			.executeTakeFirst();

		return loadRole!;
	}

	public static async getUserRoleType(userId:string): Promise<RoleType> {
		const userRole = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.where('user.id', '=', userId)
			.select(['role.type as roleType'])
			.executeTakeFirst();

		return userRole!.roleType;
	}
}