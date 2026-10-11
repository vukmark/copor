import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeSetPermissionListToUserValidatorStorageRepo} from '../fake/FakeSetPermissionListToUserValidatorStorageRepo';
import {ValidateSetPermissionListToUserRepo}
	from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserRepo';

export class SetPermissionListToUserValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateSetPermissionListToUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateSetPermissionListToUserRepo> {
		return {
			[DBEnv.FAKE]: FakeSetPermissionListToUserValidatorStorageRepo,
			[DBEnv.KYSELY]: FakeSetPermissionListToUserValidatorStorageRepo
		};
	}
}
