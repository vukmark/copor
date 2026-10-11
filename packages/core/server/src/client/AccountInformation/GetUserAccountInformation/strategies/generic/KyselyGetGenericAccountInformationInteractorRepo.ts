import KyselyGetUserBaseInformationInteractorRepo
	from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/kysely/KyselyGetUserBaseInformationInteractorRepo';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';

export class KyselyGetGenericAccountInformationInteractorRepo
	extends KyselyGetUserBaseInformationInteractorRepo {
	protected async loadRoleData(
		userId: string
	): Promise<Partial<GetUserAccountInformationDTO>> {
		return {};
	}
}
