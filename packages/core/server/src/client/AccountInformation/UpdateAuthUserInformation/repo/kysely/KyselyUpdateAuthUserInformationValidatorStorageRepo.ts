import {db} from '@copor/core/client/AppDataSource';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {KyselyPasswordHistoryRepo} from '@copor/core/client/Core/PasswordPolicy/repo/kysely/KyselyPasswordHistoryRepo';

export class KyselyUpdateAuthUserInformationValidatorStorageRepo
implements ValidateUpdateAuthUserInformationRepo {
	private passwordHistoryRepo = new KyselyPasswordHistoryRepo();

	isNotValidUser(id: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(id);
	}

	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);
	}

	public wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return this.passwordHistoryRepo.wasPasswordRecentlyUsed(authUserId, password);
	}

	async getAuthUserId(userId: string): Promise<string | undefined> {
		const row = await db
			.selectFrom('user')
			.select('authUserId')
			.where('id', '=', userId)
			.executeTakeFirst();

		return row?.authUserId ?? undefined;
	}

	async getUserRoleType(userId: string): Promise<RoleType | undefined> {
		const userRole = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.where('user.id', '=', userId)
			.select(['role.type as roleType'])
			.executeTakeFirst();

		return userRole?.roleType;
	}

	async isUserNameUsedByAnotherUser(id: string, userName: string): Promise<boolean> {
		const row = await db
			.selectFrom('authUser')
			.innerJoin('user', 'user.authUserId', 'authUser.id')
			.select('authUser.id')
			.where('authUser.userName', '=', userName)
			.where('user.id', '!=', id)
			.executeTakeFirst();

		return Boolean(row);
	}

	async isEmailUsedByAnotherUser(id: string, email: string): Promise<boolean> {
		const row = await db
			.selectFrom('authUser')
			.innerJoin('user', 'user.authUserId', 'authUser.id')
			.select('authUser.id')
			.where('authUser.email', '=', email)
			.where('user.id', '!=', id)
			.executeTakeFirst();

		return Boolean(row);
	}
}
