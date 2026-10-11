import {ValidateUpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserLoginInformationRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {db} from '@copor/core/client/AppDataSource';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserIdentityDTO} from '@copor/core/domain/User/repository/dto/UserIdentityDTO';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {KyselyPasswordHistoryRepo} from '@copor/core/client/Core/PasswordPolicy/repo/kysely/KyselyPasswordHistoryRepo';
export class KyselyUpdateUserLoginInformationValidatorStorageRepo implements ValidateUpdateUserLoginInformationRepo {
	private appContext: AppContext;
	private passwordHistoryRepo = new KyselyPasswordHistoryRepo();
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
	async isInvalidUserPassword(userId: string | undefined, password: string | undefined): Promise<boolean> {
		const hash = await db
			.selectFrom('user')
			.innerJoin('authUser', 'user.authUserId', 'authUser.id')
			.select(['authUser.password', 'authUserId'])
			.where('user.id', '=', userId!)
			.executeTakeFirst();

		if (!hash || !password)
			return true;

		return !await PasswordHelper.comparePassword(password, hash.password, hash.authUserId!, this.appContext);
	}

	async getUserIdentity(userId: string): Promise<UserIdentityDTO> {
		const identity = await db
			.selectFrom('user')
			.innerJoin('authUser', 'user.authUserId', 'authUser.id')
			.select(['authUser.id as authUserId', 'authUser.userName as userName', 'authUser.email as email'])
			.where('user.id', '=', userId)
			.executeTakeFirstOrThrow();

		const name = await UserKyselyHelper.getUserData(userId, this.appContext);

		return {
			authUserId: identity.authUserId,
			userName: identity.userName,
			email: identity.email,
			firstName: name.userFirstName ?? null,
			lastName: name.userLastName ?? null
		};
	}

	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);
	}

	public wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return this.passwordHistoryRepo.wasPasswordRecentlyUsed(authUserId, password);
	}
}