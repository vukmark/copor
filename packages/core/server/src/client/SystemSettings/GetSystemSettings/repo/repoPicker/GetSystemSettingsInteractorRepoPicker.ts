import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/GetSystemSettingsRepo';
import {
	KyselyGetSystemSettingsInteractorRepo
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/kysely/KyselyGetSystemSettingsInteractorRepo';
import {
	FakeGetSystemSettingsInteractorRepo
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/fake/FakeGetSystemSettingsInteractorRepo';

export class GetSystemSettingsInteractorRepoPicker<T> extends NewRepositoryPicker<GetSystemSettingsRepo<T>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetSystemSettingsRepo<T>> {
		return {
			[DBEnv.KYSELY]: KyselyGetSystemSettingsInteractorRepo,
			[DBEnv.FAKE]: FakeGetSystemSettingsInteractorRepo
		};
	}
}
