import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {RecordUserVisitRepo} from '@copor/core/domain/User/repository/RecordUserVisitRepo';
import {
	KyselyRecordUserVisitInteractorRepo
} from '@copor/core/client/User/RecordUserVisit/repo/kysely/KyselyRecordUserVisitInteractorRepo';
import {
	FakeRecordUserVisitInteractorRepo
} from '@copor/core/client/User/RecordUserVisit/repo/fake/FakeRecordUserVisitInteractorRepo';

export class RecordUserVisitInteractorRepoPicker extends NewRepositoryPicker<RecordUserVisitRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => RecordUserVisitRepo> {
		return {
			[DBEnv.KYSELY]: KyselyRecordUserVisitInteractorRepo,
			[DBEnv.FAKE]: FakeRecordUserVisitInteractorRepo
		};
	}
}
