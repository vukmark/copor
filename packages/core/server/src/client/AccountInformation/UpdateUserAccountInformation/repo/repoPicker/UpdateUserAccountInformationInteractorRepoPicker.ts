import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserAccountInformationInteractorRepo} from '../fake/FakeUpdateUserAccountInformationInteractorRepo';
import {UpdateUserAccountInformationRepo}
	from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {
	KyselyUpdateUserAccountInformationInteractorRepo
} from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/repo/kysely/KyselyUpdateUserAccountInformationInteractorRepo';

export class UpdateUserAccountInformationInteractorRepoPicker extends NewRepositoryPicker<UpdateUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => UpdateUserAccountInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserAccountInformationInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserAccountInformationInteractorRepo
		};
	}
}
