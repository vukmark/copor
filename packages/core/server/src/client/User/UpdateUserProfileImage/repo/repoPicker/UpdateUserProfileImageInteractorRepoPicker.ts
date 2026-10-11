import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserProfileImageInteractorRepo} from '../fake/FakeUpdateUserProfileImageInteractorRepo';
import {SaveUserProfileImageRepo} from '@copor/core/domain/User/repository/SaveUserProfileImageRepo';
import {
	KyselyUpdateUserProfileImageInteractorRepo
} from '@copor/core/client/User/UpdateUserProfileImage/repo/kysely/KyselyUpdateUserProfileImageInteractorRepo';

export class UpdateUserProfileImageInteractorRepoPicker extends NewRepositoryPicker<SaveUserProfileImageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveUserProfileImageRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserProfileImageInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserProfileImageInteractorRepo
		};
	}
}
