import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {UpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/UpdateSystemSettingsRepo';
import {
	FakeUpdateSystemSettingsInteractorRepo
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/fake/FakeUpdateSystemSettingsInteractorRepo';
import {
	KyselyUpdateSystemSettingsInteractorRepo
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/kysely/KyselyUpdateSystemSettingsInteractorRepo';

export class UpdateSystemSettingsInteractorRepoPicker<SettingsDTO>
	extends NewRepositoryPicker<UpdateSystemSettingsRepo<SettingsDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	UpdateSystemSettingsRepo<SettingsDTO>> {
		return {
			[DBEnv.FAKE]: FakeUpdateSystemSettingsInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateSystemSettingsInteractorRepo
		};
	}
}
