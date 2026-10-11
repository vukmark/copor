import {PasswordHistoryRepo} from '@copor/core/domain/Core/Repository/PasswordHistoryRepo';
import {db} from '@copor/core/client/AppDataSource';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class KyselyPasswordHistoryRepo implements PasswordHistoryRepo {
	async wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean> {
		const policy = await SystemSettingsFactory.getSettings<GetPasswordSystemSettingsDTO>(SystemSettingsType.PASSWORD);

		if (policy.passwordHistoryCount <= 0)
			return false;

		const history = await db
			.selectFrom('passwordHistory')
			.select('passwordHash')
			.where('authUserId', '=', authUserId)
			.orderBy('createdAt', 'desc')
			.limit(policy.passwordHistoryCount)
			.execute();

		for (const entry of history) {
			if (await PasswordHelper.matchesHash(password, entry.passwordHash)) {
				return true;
			}
		}

		return false;
	}
}
