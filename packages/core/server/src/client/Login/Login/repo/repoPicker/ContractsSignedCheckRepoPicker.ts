import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ContractsSignedCheckRepo} from '@copor/core/domain/Login/repository/ContractsSignedCheckRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyContractsSignedCheckRepo} from '@copor/core/client/Login/Login/repo/kysely/KyselyContractsSignedCheckRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeContractsSignedCheckRepo} from '@copor/core/client/Login/Login/repo/fake/FakeContractsSignedCheckRepo';

export class ContractsSignedCheckRepoPicker extends NewRepositoryPicker<ContractsSignedCheckRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ContractsSignedCheckRepo> {
		return {
			[DBEnv.FAKE]: FakeContractsSignedCheckRepo,
			[DBEnv.KYSELY]: KyselyContractsSignedCheckRepo
		};
	}
}
