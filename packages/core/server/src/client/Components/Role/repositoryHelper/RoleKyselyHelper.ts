import {db} from '@copor/core/client/AppDataSource';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';

export class RoleKyselyHelper {
	private static readonly helper = new EntityRepoHelper('role');
	public static async isInvalidRole(id: string | undefined): Promise<boolean> {
		return this.helper.isInvalid(id);
	}
	public static async isInadequateRoleType(roleId: string | undefined, roleType: RoleType): Promise<boolean> {
		if (!roleId)
			return true;

		const role = await db
			.selectFrom('role')
			.select(['id', 'type']) // or just 'type' if 'id' is not needed
			.where('id', '=', roleId)
			.executeTakeFirst();

		return !role || role.type !== roleType;
	}

	public static async hasRoleReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
	public static async isDefaultRoleForRoleType(id: string | undefined): Promise<boolean> {
		if (!id)
			return true;
		const role = await db
			.selectFrom('role')
			.select('isDefaultForRoleType')
			.where('id', '=', id)
			.executeTakeFirst();

		if (!role)
			return true;
		return !!role.isDefaultForRoleType;
	}

	public static async getRoleForUser(userId: string): Promise<GetRoleDTO | undefined> {
		const result = await db
			.selectFrom('user as u')
			.innerJoin('role as r', 'u.roleId', 'r.id')
			.select([
				'u.roleId as id',
				'r.type as type',
				'r.name as name'
			])
			.where('u.id', '=', userId)
			.executeTakeFirst();

		if (!result || result.id === null) {
			return undefined;
		}

		return {
			id: result.id,
			type: result.type,
			name: result.name
		};
	}
}