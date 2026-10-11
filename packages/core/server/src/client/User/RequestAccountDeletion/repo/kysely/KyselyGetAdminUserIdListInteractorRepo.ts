import {GetAdminUserIdListRepo} from '@copor/core/domain/User/repository/GetAdminUserIdListRepo';
import {db} from '@copor/core/client/AppDataSource';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class KyselyGetAdminUserIdListInteractorRepo implements GetAdminUserIdListRepo {
	async list(): Promise<string[]> {
		const rows = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.select('user.id')
			.where('role.type', '=', RoleType.ADMIN)
			.where('user.isActive', '=', 1)
			.execute();

		return rows.map((row) => row.id);
	}
}
