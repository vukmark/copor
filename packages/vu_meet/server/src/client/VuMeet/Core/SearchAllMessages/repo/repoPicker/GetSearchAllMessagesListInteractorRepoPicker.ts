import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeSearchAllMessagesInteractorRepo} from '../fake/FakeSearchAllMessagesInteractorRepo';
import {SearchAllMessagesRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/SearchAllMessagesRepo';
import {
    KyselyGetSearchAllMessagesListInteractorRepo
} from '@copor/vu_meet/client/VuMeet/Core/SearchAllMessages/repo/kysely/KyselyGetSearchAllMessagesListInteractorRepo';

export class GetSearchAllMessagesListInteractorRepoPicker extends NewRepositoryPicker<SearchAllMessagesRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SearchAllMessagesRepo> {
		return {
			[DBEnv.FAKE]: FakeSearchAllMessagesInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetSearchAllMessagesListInteractorRepo
		};
	}
}
