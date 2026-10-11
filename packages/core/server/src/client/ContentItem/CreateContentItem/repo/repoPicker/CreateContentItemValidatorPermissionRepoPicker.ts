import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanCreateContentItemContext
} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanCreateContentItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	KyselyCreateContentItemValidatorPermissionRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/KyselyCreateContentItemValidatorPermissionRepo';

export class CreateContentItemValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanCreateContentItemContext> {
	protected getKyselyRepo(): new(appContext: AppContext) => PermissionRepository<ValidateCanCreateContentItemContext> {
		return KyselyCreateContentItemValidatorPermissionRepo;
	}
}