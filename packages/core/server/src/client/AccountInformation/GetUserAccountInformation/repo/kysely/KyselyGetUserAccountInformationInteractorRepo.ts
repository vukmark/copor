import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {db} from '@copor/core/client/AppDataSource';
import {
	GetAccountInformationRepoBuilder
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/strategies/GetAccountInformationRepoBuilder';

export class KyselyGetUserAccountInformationInteractorRepo implements GetUserAccountInformationRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async load(userId: string): Promise<GetUserAccountInformationDTO> {
		const roleType = await this.getUserRoleType(userId);

		const strategyRepo = GetAccountInformationRepoBuilder.get(roleType, this.appContext);

		return strategyRepo.load(userId);
	}

	private async getUserRoleType(userId: string): Promise<RoleType> {
		const user = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.select('role.type as roleType')
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (!user)
			throw new Error('User not found');
		return user.roleType;
	}
}