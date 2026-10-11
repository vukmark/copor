import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetSystemSettingsListInteractorRepo} from '../fake/FakeGetSystemSettingsListInteractorRepo';
import {SystemSettingsListDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {KyselyGetSystemSettingsListInteractorRepo}
	from '@copor/core/client/SystemSettings/GetSystemSettingsList/repo/kysely/KyselyGetSystemSettingsListInteractorRepo';

export class GetSystemSettingsListInteractorRepoPicker extends NewRepositoryPicker<ListItems<SystemSettingsListDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<SystemSettingsListDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetSystemSettingsListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetSystemSettingsListInteractorRepo
		};
	}
}
