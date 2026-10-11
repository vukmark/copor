import {GetUserIdByCredentialsRepo} from '@copor/core/domain/Login/repository/GetUserIdByCredentialsRepo';
import {UserCredentialsResultDTO} from '@copor/core/domain/Login/interactor/dto/UserCredentialsResultDTO';
import {db} from '@copor/core/client/AppDataSource';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {LoginRequestDTO} from '@copor/core/client/Login/Login/dto/LoginRequestDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyGetUserIdByCredentialsRepo implements GetUserIdByCredentialsRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async getUserIdByCredentials(input: LoginRequestDTO): Promise<UserCredentialsResultDTO | undefined> {
		if (!input.username || !input.password)
			return undefined;
		const foundAuthUser = await db
			.selectFrom('authUser')
			.selectAll()
			.where('userName', '=', input.username)
			.executeTakeFirst();

		if (!foundAuthUser
            || !await PasswordHelper.comparePassword(input.password, foundAuthUser.password, foundAuthUser.id, this.appContext))
			return undefined;

		let user = await db
			.selectFrom('user')
			.select(['id', 'isActive'])
			.where('authUserId', '=', foundAuthUser.id)
			.where('isDefaultRole', '=', Number(true))
			.executeTakeFirst();

		if (!user) {
			user = await db
				.selectFrom('user')
				.select(['id', 'isActive'])
				.where('authUserId', '=', foundAuthUser.id)
				.executeTakeFirst();
		}

		if (!user) {
			return undefined;
		}

		return {userId: user.id, isActive: Boolean(user.isActive)};
	}
}
