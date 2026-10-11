import {UpdateUserAccountInformationRepo} from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {UpdateUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {db} from '@copor/core/client/AppDataSource';
import {
	UpdateAccountInformationRepoBuilder
} from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/kysely/UpdateAccountInformationRepoBuilder';

export class KyselyUpdateUserAccountInformationInteractorRepo
implements UpdateUserAccountInformationRepo {
	public async save(saveDTO: UpdateUserAccountInformationDTO): Promise<void> {
		const roleType = await this.getUserRoleType(saveDTO.id);

		const strategyRepo = UpdateAccountInformationRepoBuilder.get(roleType);

		await strategyRepo.save(saveDTO);
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