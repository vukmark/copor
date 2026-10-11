import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';
import {db} from '@copor/core/client/AppDataSource';
import {UpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/UpdateUserLoginInformationRepo';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyUpdateUserLoginInformationInteractorRepo implements UpdateUserLoginInformationRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async save(input: UpdateUserLoginInformationDTO): Promise<void> {
		const user = await db
			.selectFrom('user')
			.select(['authUserId'])
			.where('id', '=', input.userId)
			.executeTakeFirst();

		if (!user) {
			throw new Error(`User ${user} not found`);
		}

		const authUserId = user.authUserId;

		const authUser = await db
			.selectFrom('authUser')
			.select(['password'])
			.where('id', '=', authUserId)
			.executeTakeFirst();

		const compareOldPass = await PasswordHelper.comparePassword(
			input.oldPassword,
			authUser!.password,
			authUserId!,
			this.appContext
		);

		if (!compareOldPass) {
			throw new Error('Old password is invalid.');
		}

		const newPasswordHash = await PasswordHelper.hashPassword(input.newPassword, this.appContext);

		await db
			.updateTable('authUser')
			.set({password: newPasswordHash})
			.where('id', '=', authUserId)
			.execute();

		await PasswordHelper.recordPasswordChange(authUserId!, newPasswordHash);
	}
}