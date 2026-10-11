import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateAlarmValidatorStorageRepo} from '../fake/FakeUpdateAlarmValidatorStorageRepo';
import {ValidateUpdateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateUpdateAlarmRepo';
import {
	KyselyUpdateAlarmValidatorStorageRepo
} from '@copor/todo/client/ToDo/Alarm/UpdateToDoAlarm/repo/kysely/KyselyUpdateAlarmValidatorStorageRepo';

export class UpdateAlarmValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateAlarmRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateAlarmRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateAlarmValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateAlarmValidatorStorageRepo
		};
	}
}
