import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteContentItemInteractorRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/fake/FakeDeleteContentItemInteractorRepo';
import {
	KyselyDeleteContentItemInteractorRepo
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/kysely/KyselyDeleteContentItemInteractorRepo';

export class DeleteContentItemInteractorRepoPicker
	extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteContentItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteContentItemInteractorRepo
		};
	}
}