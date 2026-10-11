import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeCreateAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/fake/FakeCreateAlarmValidatorStorageRepo';
import {ValidateCreateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateCreateAlarmRepo';
import {
    KyselyCreateAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/kysely/KyselyCreateAlarmValidatorStorageRepo';

export class CreateAlarmValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateCreateAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateAlarmRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateAlarmValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateAlarmValidatorStorageRepo
		};
	}
}
