import {FakePermissionValidatorRepo} from './FakePermissionValidatorRepo';
import {NewRepositoryPicker} from '../RepositoryPicker';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {AppContext} from '../../Interface/AppContext';
import {DBEnv} from '../../enum/DBEnv';
import {KyselyPermissionValidatorRepo} from './KyselyPermissionValidatorRepo';

export class PermissionValidatorRepoPicker extends NewRepositoryPicker<PermissionRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => PermissionRepository> {
		return {
			[DBEnv.FAKE]: FakePermissionValidatorRepo,
			[DBEnv.KYSELY]: KyselyPermissionValidatorRepo
		};
	}
}
