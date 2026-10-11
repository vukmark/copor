import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/fake/FakeDeleteAlarmValidatorStorageRepo';
import {ValidateDeleteAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateDeleteAlarmRepo';
import {
	KyselyDeleteAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/kysely/KyselyDeleteAlarmValidatorStorageRepo';

export class DeleteAlarmValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteAlarmRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteAlarmValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteAlarmValidatorStorageRepo
		};
	}
}
