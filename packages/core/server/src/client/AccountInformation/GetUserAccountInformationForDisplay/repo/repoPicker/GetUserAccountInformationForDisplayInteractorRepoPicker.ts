import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetUserAccountInformatForDisplayionInteractorRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/fake/FakeGetUserAccountInformatForDisplayionInteractorRepo';
import {
	GetUserAccountInformationForDisplayRepo
} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationForDisplayRepo';
import {
	KyselyGetUserAccountInformationForDisplayInteractorRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/kysely/KyselyGetUserAccountInformationForDisplayInteractorRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetUserAccountInformationForDisplayInteractorRepoPicker extends NewRepositoryPicker<GetUserAccountInformationForDisplayRepo> {
	protected getRepositoryList(): Record<string,
		new (appContext: AppContext) => GetUserAccountInformationForDisplayRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserAccountInformationForDisplayInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserAccountInformatForDisplayionInteractorRepo
		};
	}
}
