import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {UpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/UpdateUserLoginInformationRepo';
import {
    FakeUpdateUserLoginInformationInteractorRepo
} from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/fake/FakeUpdateUserLoginInformationInteractorRepo';
import {
    KyselyUpdateUserLoginInformationInteractorRepo
} from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/kysely/KyselyUpdateUserLoginInformationInteractorRepo';

export class UpdateUserLoginInformationInteractorRepoPicker extends NewRepositoryPicker<UpdateUserLoginInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => UpdateUserLoginInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserLoginInformationInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserLoginInformationInteractorRepo
		};
	}
}
