import crypto from 'crypto';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {Emailer} from '@copor/core/client/Core/Email/Emailer';
import {RegistrationCodeEmail} from '@copor/core/client/Core/Email/Templates/RegistrationCodeEmail';

export const VERIFICATION_CODE_TTL_MS = 30 * 60 * 1000;
export const MAX_FAILED_ATTEMPTS = 5;
export const RESEND_COOLDOWN_MS = 60 * 1000;

export interface PendingAccount {
	userId: string;
	authUserId: string;
	firstName: string;
	email: string;
}

// A self-registered account is "pending" while it is inactive and has at least
// one verification code; admin-deactivated accounts never have codes, so they
// can't be (re)activated through this flow.
export class RegistrationVerificationHelper {
	public static newCode(): {code: string, expiresAt: Date} {
		return {
			code: crypto.randomInt(100000, 1000000).toString(),
			expiresAt: new Date(Date.now() + VERIFICATION_CODE_TTL_MS)
		};
	}

	public static async findPendingAccount(email: string): Promise<PendingAccount | undefined> {
		const row = await db.selectFrom('user')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.select(['user.id as userId', 'authUser.id as authUserId', 'user.firstName as firstName', 'authUser.email as email'])
			.where('authUser.email', '=', email)
			.where('user.isActive', '=', 0)
			.where((eb) => eb.exists(
				eb.selectFrom('registrationVerification')
					.select('registrationVerification.id')
					.whereRef('registrationVerification.authUserId', '=', 'authUser.id')
			))
			.executeTakeFirst();

		if (!row?.email)
			return undefined;

		return {userId: row.userId, authUserId: row.authUserId, firstName: row.firstName ?? '', email: row.email};
	}

	// Retires any earlier codes and stores the new one hashed.
	public static async issueCode(
		authUserId: string,
		code: string,
		expiresAt: Date,
		appContext: AppContext,
		dbInstance: typeof db = db
	): Promise<void> {
		await dbInstance.updateTable('registrationVerification')
			.set({used: true})
			.where('authUserId', '=', authUserId)
			.where('used', '=', false)
			.execute();

		await dbInstance.insertInto('registrationVerification')
			.values({
				id: await new IdGenerator().getNewId(),
				authUserId,
				codeHash: await PasswordHelper.hashPassword(code, appContext),
				expiresAt,
				used: false
			})
			.execute();
	}

	// A failed send must not fail the request: the account already exists and the
	// user can ask for the code again ("resend").
	public static async sendCode(email: string, firstName: string, code: string): Promise<void> {
		try {
			await new Emailer().sendEmail(new RegistrationCodeEmail({receiver: email, firstName, verificationCode: code}));
		} catch (error) {
			console.error('Registration code email could not be sent:', error);
		}
	}
}
