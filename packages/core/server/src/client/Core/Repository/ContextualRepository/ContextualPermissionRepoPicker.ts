import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakePermissionRepository} from '@copor/core/client/GlobalRepository/FakePermissionRepository';

export abstract class ContextualPermissionRepoPicker<Context>
	extends NewRepositoryPicker<PermissionRepository<Context>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => PermissionRepository<Context>> {
		return {
			[DBEnv.KYSELY]: this.getKyselyRepo(),
			[DBEnv.FAKE]: FakePermissionRepository
		};
	}
	protected abstract getKyselyRepo():
	new (appContext: AppContext) => PermissionRepository<Context>;
}