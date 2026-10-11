import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyResetPasswordRepo} from '../kysely/KyselyResetPasswordRepo';
import {ResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ResetPasswordRepo';

export class ResetPasswordInteractorRepoPicker extends NewRepositoryPicker<ResetPasswordRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ResetPasswordRepo> {
		return {
			[DBEnv.FAKE]: KyselyResetPasswordRepo,
			[DBEnv.KYSELY]: KyselyResetPasswordRepo
		};
	}
}