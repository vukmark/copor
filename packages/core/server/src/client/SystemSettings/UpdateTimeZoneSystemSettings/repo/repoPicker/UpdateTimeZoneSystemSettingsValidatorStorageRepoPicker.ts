import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';
import {
	FakeUpdateTimeZoneSystemSettingsValidatorStorageRepo
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/repo/fake/FakeUpdateTimeZoneSystemSettingsValidatorStorageRepo';
import {
	KyselyUpdateTimeZoneSystemSettingsValidatorStorageRepo
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/repo/kysely/KyselyUpdateTimeZoneSystemSettingsValidatorStorageRepo';

export class UpdateTimeZoneSystemSettingsValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateSystemSettingsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateSystemSettingsRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateTimeZoneSystemSettingsValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateTimeZoneSystemSettingsValidatorStorageRepo
		};
	}
}
