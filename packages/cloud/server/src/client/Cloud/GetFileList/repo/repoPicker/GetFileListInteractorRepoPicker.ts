import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFileListInteractorRepo} from '../fake/FakeGetFileListInteractorRepo';
import {GetFileListRepo} from '@copor/cloud/domain/Cloud/repository/GetFileListRepo';
import {KyselyGetFileListInteractorRepo} from '@copor/cloud/client/Cloud/GetFileList/repo/kysely/KyselyGetFileListInteractorRepo';

export class GetFileListInteractorRepoPicker extends NewRepositoryPicker<GetFileListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetFileListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetFileListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetFileListInteractorRepo
		};
	}
}
