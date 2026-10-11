import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {
	ValidateGetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateGetNotificationTokenListRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {
	FakeGetNotificationTokenListValidatorStorageRepo
} from '../fake/FakeGetNotificationTokenListValidatorStorageRepo';

export class GetNotificationTokenListValidatorRepoPicker extends NewRepositoryPicker<ValidateGetNotificationTokenListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsNotValidUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetNotificationTokenListValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeGetNotificationTokenListValidatorStorageRepo
		};
	}
}
