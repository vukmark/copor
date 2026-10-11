import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyVerifyResetCodeRepo
} from '@copor/core/client/User/PasswordReset/VerifyResetCode/repo/kysely/KyselyVerifyResetCodeRepo';
import {VerifyResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/VerifyResetCodeRepo';

export class VerifyResetCodeInteractorRepoPicker extends NewRepositoryPicker<VerifyResetCodeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => VerifyResetCodeRepo> {
		return {
			[DBEnv.FAKE]: KyselyVerifyResetCodeRepo,
			[DBEnv.KYSELY]: KyselyVerifyResetCodeRepo
		};
	}
}