import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';
import {
	FakeUpdateContentItemInteractorRepo
} from '@copor/core/client/ContentItem/UpdateContentItem/repo/fake/FakeUpdateContentItemInteractorRepo';
import {
	KyselyUpdateContentItemInteractorRepo
} from '@copor/core/client/ContentItem/UpdateContentItem/repo/kysely/KyselyUpdateContentItemInteractorRepo';

export class UpdateContentItemInteractorRepoPicker extends NewRepositoryPicker<SaveContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveContentItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateContentItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateContentItemInteractorRepo
		};
	}
}