import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSignContractInteractorRepo} from '../fake/FakeSignContractInteractorRepo';
import {KyselySignContractInteractorRepo}
	from '@copor/core/client/Contract/SignContract/repo/kysely/KyselySignContractInteractorRepo';
import {SignContractRepo} from '@copor/core/domain/Contract/repository/SignContractRepo';

export class SignContractInteractorRepoPicker extends NewRepositoryPicker<SignContractRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SignContractRepo> {
		return {
			[DBEnv.FAKE]: FakeSignContractInteractorRepo,
			[DBEnv.KYSELY]: KyselySignContractInteractorRepo
		};
	}
}
