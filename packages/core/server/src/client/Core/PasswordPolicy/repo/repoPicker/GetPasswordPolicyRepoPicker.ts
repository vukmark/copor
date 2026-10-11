import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetPasswordPolicyRepo} from '@copor/core/domain/Core/Repository/GetPasswordPolicyRepo';
import {KyselyGetPasswordPolicyRepo} from '@copor/core/client/Core/PasswordPolicy/repo/kysely/KyselyGetPasswordPolicyRepo';
import {FakeGetPasswordPolicyRepo} from '@copor/core/client/Core/PasswordPolicy/repo/fake/FakeGetPasswordPolicyRepo';

export class GetPasswordPolicyRepoPicker extends NewRepositoryPicker<GetPasswordPolicyRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetPasswordPolicyRepo> {
		return {
			[DBEnv.FAKE]: FakeGetPasswordPolicyRepo,
			[DBEnv.KYSELY]: KyselyGetPasswordPolicyRepo
		};
	}
}
