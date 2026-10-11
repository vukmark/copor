import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {CreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/CreateUserAccountInformationRepo';
import {FakeCreateUserAccountInformationInteractorRepo} from '../fake/FakeCreateUserAccountInformationInteractorRepo';
import {KyselyCreateUserAccountInformationInteractorRepo} from '../kysely/KyselyCreateUserAccountInformationInteractorRepo';

export class CreateUserAccountInformationInteractorRepoPicker extends NewRepositoryPicker<CreateUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => CreateUserAccountInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateUserAccountInformationInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateUserAccountInformationInteractorRepo
		};
	}
}
