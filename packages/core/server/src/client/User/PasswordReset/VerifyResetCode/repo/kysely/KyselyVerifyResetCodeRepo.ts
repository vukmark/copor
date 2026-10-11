import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {VerifyResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/VerifyResetCodeRepo';
import {VerifyResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/VerifyResetCodeDTO';
import {FindValidTokenDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/FindValidTokenDTO';
import {EmailStringValidator} from '@copor/core/client/Core/Helpers/EmailStringValidator';

export class KyselyVerifyResetCodeRepo implements VerifyResetCodeRepo {
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
			// .where('a.userName', '=', userName)
			.where(field, '=', userNameOrEmail)
			.where('prt.used', '=', false)
			.where('prt.expiresAt', '>', new Date())
			.executeTakeFirst();
	}

	async verifyCode(input: VerifyResetCodeDTO): Promise<void> {
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
	}
}