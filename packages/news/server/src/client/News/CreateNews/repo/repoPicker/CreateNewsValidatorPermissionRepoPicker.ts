import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {ValidateCanCreateNewsContext} from '@copor/news/domain/News/validations/permissions/ValidateCanCreateNews';
import {
	KyselyCreateNewsValidatorPermissionRepo
} from '@copor/news/client/News/CreateNews/repo/kysely/KyselyCreateNewsValidatorPermissionRepo';

export class CreateNewsValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanCreateNewsContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanCreateNewsContext> {
		return KyselyCreateNewsValidatorPermissionRepo;
	}
}