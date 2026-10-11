import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ToggleUserActiveStatusRepo} from '@copor/core/domain/User/repository/ToggleUserActiveStatusRepo';
import {
	FakeToggleUserActiveStatusInteractorRepo
} from '@copor/core/client/User/ToggleUserActiveStatus/repo/fake/FakeToggleUserActiveStatusInteractorRepo';
import {
	KyselyToggleUserActiveStatusInteractorRepo
} from '@copor/core/client/User/ToggleUserActiveStatus/repo/kysely/KyselyToggleUserActiveStatusInteractorRepo';

export class ToggleUserActiveStatusInteractorRepoPicker extends NewRepositoryPicker<ToggleUserActiveStatusRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ToggleUserActiveStatusRepo> {
		return {
			[DBEnv.FAKE]: FakeToggleUserActiveStatusInteractorRepo,
			[DBEnv.KYSELY]: KyselyToggleUserActiveStatusInteractorRepo
		};
	}
}
