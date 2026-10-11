import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ValidateResetPasswordRepo';
import {KyselyResetPasswordValidatorStorageRepo} from '../kysely/KyselyResetPasswordValidatorStorageRepo';
import {FakeResetPasswordValidatorStorageRepo} from '../fake/FakeResetPasswordValidatorStorageRepo';

export class ResetPasswordValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateResetPasswordRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateResetPasswordRepo> {
		return {
			[DBEnv.FAKE]: FakeResetPasswordValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyResetPasswordValidatorStorageRepo
		};
	}
}
