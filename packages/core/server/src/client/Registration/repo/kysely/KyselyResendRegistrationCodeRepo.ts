import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ResendRegistrationCodeRepo} from '@copor/core/domain/Registration/repository/ResendRegistrationCodeRepo';
import {ResendRegistrationCodeDTO} from '@copor/core/domain/Registration/interactor/dto/ResendRegistrationCodeDTO';
import {
	RegistrationVerificationHelper,
	RESEND_COOLDOWN_MS
} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';

export class KyselyResendRegistrationCodeRepo implements ResendRegistrationCodeRepo {
	private readonly appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	public async resend(input: ResendRegistrationCodeDTO): Promise<void> {
		const account = await RegistrationVerificationHelper.findPendingAccount(input.email);

		if (!account)
			return;

		const recent = await db.selectFrom('registrationVerification')
			.select('id')
			.where('authUserId', '=', account.authUserId)
			.where('createdAt', '>', new Date(Date.now() - RESEND_COOLDOWN_MS))
			.executeTakeFirst();

		// Throttle: at most one new code per cooldown window.
		if (recent)
			return;

		await RegistrationVerificationHelper.issueCode(
			account.authUserId,
			input.verificationCode,
			input.codeExpiresAt,
			this.appContext
		);
		await RegistrationVerificationHelper.sendCode(account.email, account.firstName, input.verificationCode);
	}
}
