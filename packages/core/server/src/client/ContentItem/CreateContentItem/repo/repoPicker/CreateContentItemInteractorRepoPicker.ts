import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateContentItemInteractorRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/fake/FakeCreateContentItemInteractorRepo';
import {
	KyselyCreateContentItemInteractorRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/KyselyCreateContentItemInteractorRepo';

export class CreateContentItemInteractorRepoPicker
	extends NewRepositoryPicker<SaveContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveContentItemRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateContentItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateContentItemInteractorRepo
		};
	}
}