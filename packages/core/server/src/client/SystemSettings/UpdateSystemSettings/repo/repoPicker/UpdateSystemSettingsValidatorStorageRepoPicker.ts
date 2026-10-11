import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';
import {
	KyselyUpdateSystemSettingsValidatorStorageRepo
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/kysely/KyselyUpdateSystemSettingsValidatorStorageRepo';
import {
	FakeUpdateSystemSettingsValidatorStorageRepo
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/fake/FakeUpdateSystemSettingsValidatorStorageRepo';

export class UpdateSystemSettingsValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateSystemSettingsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateSystemSettingsRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateSystemSettingsValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateSystemSettingsValidatorStorageRepo
		};
	}
}
