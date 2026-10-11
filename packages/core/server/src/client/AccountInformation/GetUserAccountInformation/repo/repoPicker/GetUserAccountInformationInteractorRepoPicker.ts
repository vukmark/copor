import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {
	FakeGetUserAccountInformationInteractorRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/fake/FakeGetUserAccountInformationInteractorRepo';
import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {
	KyselyGetUserAccountInformationInteractorRepo
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/kysely/KyselyGetUserAccountInformationInteractorRepo';

export class GetUserAccountInformationInteractorRepoPicker extends NewRepositoryPicker<GetUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string,
		new (appContext: AppContext) => GetUserAccountInformationRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserAccountInformationInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserAccountInformationInteractorRepo
		};
	}
}
