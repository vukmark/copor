import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateFileInteractorRepo
} from '@copor/cloud/client/Cloud/CreateFile/repo/fake/FakeCreateFileInteractorRepo';
import {KyselyCreateFileInteractorRepo} from '@copor/cloud/client/Cloud/CreateFile/repo/kysely/KyselyCreateFileInteractorRepo';
import {SaveFileRepo} from '@copor/cloud/domain/Cloud/repository/SaveFileRepo';

export class CreateFileInteractorRepoPicker extends NewRepositoryPicker<SaveFileRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveFileRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateFileInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateFileInteractorRepo
		};
	}
}
