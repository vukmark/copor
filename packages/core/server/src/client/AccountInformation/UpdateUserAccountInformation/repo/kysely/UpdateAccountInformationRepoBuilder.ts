import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {UpdateUserAccountInformationRepo} from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {
	KyselyUpdateGenericAccountInformationInteractorRepo
} from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/kysely/strategy/generic/KyselyUpdateGenericAccountInformationInteractorRepo';

export class UpdateAccountInformationRepoBuilder {
	static get(roleType: RoleType): UpdateUserAccountInformationRepo {
		return new KyselyUpdateGenericAccountInformationInteractorRepo();
	}
}
