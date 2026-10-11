import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {ResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ResetPasswordRepo';
import {ResetPasswordDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/ResetPasswordDTO';
import {FindValidTokenDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/FindValidTokenDTO';
import {EmailStringValidator} from '@copor/core/client/Core/Helpers/EmailStringValidator';

export class KyselyResetPasswordRepo implements ResetPasswordRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async findValidToken(userNameOrEmail: string): Promise<FindValidTokenDTO | undefined> {
		const isEmail = EmailStringValidator.isValid(userNameOrEmail);

		const field = isEmail ? 'a.email' : 'a.userName';

		return await db
			.selectFrom('passwordResetToken as prt')
			.innerJoin('authUser as a', 'a.id', 'prt.authUserId')
			.select(['prt.codeHash', 'prt.authUserId'])
			//.where('a.userName', '=', userName)
			.where(field, '=', userNameOrEmail)
			.where('prt.used', '=', false)
			.where('prt.expiresAt', '>', new Date())
			.executeTakeFirst();
	}

	async resetPassword(authUserId: string, newPasswordHash: string): Promise<void> {
		await db
			.updateTable('authUser')
			.set({password: newPasswordHash})
			.where('id', '=', authUserId)
			.execute();
	}

	async markAsUsed(authUserId: string): Promise<void> {
		await db
			.updateTable('passwordResetToken')
			.set({used: true})
			.where('authUserId', '=', authUserId)
			.execute();
	}

	async verifyAndReset(input: ResetPasswordDTO): Promise<void> {
		const token = await this.findValidToken(input.userName);

		if (!token) {
			throw new Error('Invalid or expired reset code.');
		}

		const isValid = await PasswordHelper.comparePassword(
			input.code,
			token.codeHash,
			token.authUserId,
			this.appContext
		);

		if (!isValid) {
			throw new Error('Invalid or expired reset code.');
		}

		const newPasswordHash = await PasswordHelper.hashPassword(input.newPassword, this.appContext);

		await this.resetPassword(token.authUserId, newPasswordHash);
		await this.markAsUsed(token.authUserId);
		await PasswordHelper.recordPasswordChange(token.authUserId, newPasswordHash);
	}
}