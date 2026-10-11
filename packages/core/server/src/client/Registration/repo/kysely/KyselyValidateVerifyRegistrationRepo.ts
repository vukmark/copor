import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';
import {ValidateVerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/ValidateVerifyRegistrationRepo';
import {VerifyRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/VerifyRegistrationDTO';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {
	MAX_FAILED_ATTEMPTS,
	RegistrationVerificationHelper
} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';
import {KyselyRegistrationStatusRepo} from './KyselyRegistrationStatusRepo';

export class KyselyValidateVerifyRegistrationRepo extends KyselyRegistrationStatusRepo
	implements ValidateVerifyRegistrationRepo {
	public async getPendingUserId(email: string): Promise<string | undefined> {
		return (await RegistrationVerificationHelper.findPendingAccount(email))?.userId;
	}

	public async isValidVerificationCode(input: VerifyRegistrationDTO): Promise<boolean> {
		const account = await RegistrationVerificationHelper.findPendingAccount(input.email);

		if (!account)
			return false;

		const latest = await db.selectFrom('registrationVerification')
			.select(['id', 'codeHash', 'failedAttempts'])
			.where('authUserId', '=', account.authUserId)
			.where('used', '=', false)
			.where('expiresAt', '>', new Date())
			.orderBy('createdAt', 'desc')
			.executeTakeFirst();

		if (!latest)
			return false;

		if (await PasswordHelper.matchesHash(input.code.trim(), latest.codeHash))
			return true;

		// Wrong code: count it, and retire the code once it has been guessed at too often.
		await db.updateTable('registrationVerification')
			.set({
				failedAttempts: sql<number>`failed_attempts + 1`,
				used: latest.failedAttempts + 1 >= MAX_FAILED_ATTEMPTS
			})
			.where('id', '=', latest.id)
			.execute();

		return false;
	}
}
