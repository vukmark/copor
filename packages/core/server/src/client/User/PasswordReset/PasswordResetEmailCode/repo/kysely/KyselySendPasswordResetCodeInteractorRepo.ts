import {db} from '@copor/core/client/AppDataSource';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {PasswordResetCodeEmail} from '@copor/core/client/Core/Email/Templates/PasswordResetCodeEmail';
import {Emailer} from '@copor/core/client/Core/Email/Emailer';
import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';
import {SendPasswordResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/SendPasswordResetCodeRepo';
import {EmailStringValidator} from '@copor/core/client/Core/Helpers/EmailStringValidator';

export class KyselySendPasswordResetCodeInteractorRepo implements SendPasswordResetCodeRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async save(input: SaveResetCodeDTO): Promise<void> {
		const userNameOrEmail = input.userNameOrEmail;

		// const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userNameOrEmail);
		const isEmail = EmailStringValidator.isValid(userNameOrEmail);

		const field = isEmail ? 'email' : 'userName';

		const result = await db
			.selectFrom('authUser')
			.where(field, '=', userNameOrEmail)
			.select(['id', 'userName', 'email'])
			.executeTakeFirst();

		if (!result) {
			return;
		}

		await db
			.updateTable('passwordResetToken')
			.set({used: true})
			.where('authUserId', '=', result.id)
			.where('used', '=', false)
			.execute();

		await db
			.insertInto('passwordResetToken')
			.values({
				id: await new IdGenerator().getNewId(),
				authUserId: result.id,
				codeHash: await PasswordHelper.hashPassword(input.codeHash, this.appContext),
				expiresAt: input.expiresAt,
				used: false
			})
			.execute();

		const email = {... result}.email;

		if (email === null) {
			throw new Error('User don\'t have email');
		}

		await this.sendEmail({... result}.userName, email, input.codeHash);
	}

	private async sendEmail(userName: string, email: string, code: string) {
		const emailMessage = new PasswordResetCodeEmail({
			userName: userName,
			receiver: email,
			resetCode: code
		});

		const emailer = new Emailer();

		await emailer.sendEmail(emailMessage);
	}
}