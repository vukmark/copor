import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {UpdateAuthUserInformationRepo} from '@copor/core/domain/User/repository/UpdateAuthUserInformationRepo';
import {FakeUpdateAuthUserInformationInteractorRepo}
	from '../fake/FakeUpdateAuthUserInformationInteractorRepo';
import {KyselyUpdateAuthUserInformationInteractorRepo}
	from '../kysely/KyselyUpdateAuthUserInformationInteractorRepo';

export class UpdateAuthUserInformationInteractorRepoPicker
	extends NewRepositoryPicker<UpdateAuthUserInformationRepo> {
	protected getRepositoryList(): Record<
		string,
		new (appContext: AppContext) => UpdateAuthUserInformationRepo
	> {
		return {
			[DBEnv.FAKE]: FakeUpdateAuthUserInformationInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateAuthUserInformationInteractorRepo
		};
	}
}
