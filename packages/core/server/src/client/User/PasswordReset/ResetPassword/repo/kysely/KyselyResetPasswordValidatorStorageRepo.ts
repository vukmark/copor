import {ValidateResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ValidateResetPasswordRepo';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {db} from '@copor/core/client/AppDataSource';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {EmailStringValidator} from '@copor/core/client/Core/Helpers/EmailStringValidator';
import {KyselyPasswordHistoryRepo} from '@copor/core/client/Core/PasswordPolicy/repo/kysely/KyselyPasswordHistoryRepo';

export class KyselyResetPasswordValidatorStorageRepo implements ValidateResetPasswordRepo {
	private passwordHistoryRepo = new KyselyPasswordHistoryRepo();

	public getPasswordPolicy(): Promise<GetPasswordSystemSettingsDTO> {
		return SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);
	}

	public wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		return this.passwordHistoryRepo.wasPasswordRecentlyUsed(authUserId, password);
	}

	async getAuthUserId(userNameOrEmail: string): Promise<string | undefined> {
		const field = EmailStringValidator.isValid(userNameOrEmail) ? 'email' : 'userName';

		const row = await db
			.selectFrom('authUser')
			.select('id')
			.where(field, '=', userNameOrEmail)
			.executeTakeFirst();

		return row?.id;
	}
}
