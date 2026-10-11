import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAlarmValidatorStorageRepo} from '../fake/FakeGetAlarmValidatorStorageRepo';
import {ValidateGetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateGetAlarmRepo';
import {IsInvalidAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/IsInvalidAlarmRepo';
import {
	KyselyGetAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/GetAlarm/repo/kysely/KyselyGetAlarmValidatorStorageRepo';

export class GetAlarmValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidAlarmRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetAlarmValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetAlarmValidatorStorageRepo
		};
	}
}
