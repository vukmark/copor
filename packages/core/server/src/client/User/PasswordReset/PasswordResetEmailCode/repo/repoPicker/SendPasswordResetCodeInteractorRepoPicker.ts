import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeSendPasswordResetCodeInteractorRepo
} from '@copor/core/client/User/PasswordReset/PasswordResetEmailCode/repo/fake/FakeSendPasswordResetCodeInteractorRepo';
import {
	KyselySendPasswordResetCodeInteractorRepo
} from '@copor/core/client/User/PasswordReset/PasswordResetEmailCode/repo/kysely/KyselySendPasswordResetCodeInteractorRepo';
import {SaveResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/SaveResetCodeRepo';


export class SendPasswordResetCodeInteractorRepoPicker extends NewRepositoryPicker<SaveResetCodeRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveResetCodeRepo> {
		return {
			[DBEnv.FAKE]: FakeSendPasswordResetCodeInteractorRepo,
			[DBEnv.KYSELY]: KyselySendPasswordResetCodeInteractorRepo
		};
	}
}