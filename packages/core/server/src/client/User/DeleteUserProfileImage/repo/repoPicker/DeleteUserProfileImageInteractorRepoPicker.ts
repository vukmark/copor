import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {DeleteUserProfileImageRepo} from '@copor/core/domain/User/repository/DeleteUserProfileImageRepo';
import {
	FakeDeleteUserProfileImageInteractorRepo
} from '@copor/core/client/User/DeleteUserProfileImage/repo/fake/FakeDeleteUserProfileImageInteractorRepo';
import {
	KyselyDeleteUserProfileImageInteractorRepo
} from '@copor/core/client/User/DeleteUserProfileImage/repo/kysely/KyselyDeleteUserProfileImageInteractorRepo';

export class DeleteUserProfileImageInteractorRepoPicker extends NewRepositoryPicker<DeleteUserProfileImageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteUserProfileImageRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserProfileImageInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserProfileImageInteractorRepo
		};
	}
}
