import {UpdateUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';
import KyselyUpdateUserAccountBaseInformationInteractorRepo from
	'@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/kysely/KyselyUpdateUserAccountBaseInformationInteractorRepo';

export class KyselyUpdateGenericAccountInformationInteractorRepo
	extends KyselyUpdateUserAccountBaseInformationInteractorRepo {
	protected async updateRoleSpecificData(
		saveDTO: UpdateUserAccountInformationDTO
	): Promise<void> {
		return;
	}
}
