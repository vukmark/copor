import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteImageInteractorRepo} from '../fake/FakeDeleteImageInteractorRepo';
import {
	KyselyDeleteImageInteractorRepo
} from '@copor/core/client/Components/Image/DeleteImage/repo/kysely/KyselyDeleteImageInteractorRepo';

export class DeleteImageInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteImageInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteImageInteractorRepo
		};
	}
}
