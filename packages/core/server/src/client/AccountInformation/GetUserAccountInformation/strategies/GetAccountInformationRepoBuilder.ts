import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {
	KyselyGetGenericAccountInformationInteractorRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/strategies/generic/KyselyGetGenericAccountInformationInteractorRepo';

export class GetAccountInformationRepoBuilder {
	static get(roleType: RoleType, appContext: AppContext): GetUserAccountInformationRepo {
		return new KyselyGetGenericAccountInformationInteractorRepo(appContext);
	}
}
