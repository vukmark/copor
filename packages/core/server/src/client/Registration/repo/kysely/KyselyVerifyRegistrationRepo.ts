import {db} from '@copor/core/client/AppDataSource';
import {VerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/VerifyRegistrationRepo';
import {RegistrationVerificationHelper} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyVerifyRegistrationRepo implements VerifyRegistrationRepo {
	public async activate(email: string): Promise<void> {
		const account = await RegistrationVerificationHelper.findPendingAccount(email);

		if (!account)
			return;

		await db.transaction().execute(async (trx) => {
			await trx.updateTable('user')
				.set({isActive: 1, ... TimestampHelper.getTimestampForUpdate(account.userId)})
				.where('id', '=', account.userId)
				.execute();

			await trx.updateTable('registrationVerification')
				.set({used: true})
				.where('authUserId', '=', account.authUserId)
				.execute();
		});
	}
}
