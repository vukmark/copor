import {db} from '@copor/core/client/AppDataSource';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {UpdateAuthUserInformationRepo} from '@copor/core/domain/User/repository/UpdateAuthUserInformationRepo';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyUpdateAuthUserInformationInteractorRepo implements UpdateAuthUserInformationRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async update(input: UpdateAuthUserInformationDTO): Promise<void> {
		const user = await db
			.selectFrom('user')
			.select('authUserId')
			.where('id', '=', input.id)
			.executeTakeFirst();

		if (!user?.authUserId)
			throw new Error(`User ${input.id} has no auth user`);

		const password = input.password?.trim();
		const newPasswordHash = password ? await PasswordHelper.hashPassword(password, this.appContext) : undefined;

		const updateData = {
			userName: input.userName,
			email: input.email ?? null,
			... TimestampHelper.getTimestampForUpdate(input.actorId),
			... newPasswordHash ? {password: newPasswordHash} : {}
		};

		const result = await db
			.updateTable('authUser')
			.set(updateData)
			.where('id', '=', user.authUserId)
			.execute();

		if (result[0]?.numUpdatedRows === BigInt(0))
			throw new Error(`Auth user ${user.authUserId} was not updated`);

		if (newPasswordHash) {
			await PasswordHelper.recordPasswordChange(user.authUserId, newPasswordHash);
		}
	}
}
