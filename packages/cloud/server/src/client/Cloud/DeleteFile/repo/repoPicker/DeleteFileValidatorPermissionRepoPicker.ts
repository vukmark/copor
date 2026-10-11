import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateCanDeleteFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	KyselyDeleteFileValidatorPermissionRepo
} from '@copor/cloud/client/Cloud/DeleteFile/repo/kysely/KyselyDeleteFileValidatorPermissionRepo';

export class DeleteFileValidatorPermissionRepoPicker extends ContextualPermissionRepoPicker<ValidateCanDeleteFileContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanDeleteFileContext> {
		return KyselyDeleteFileValidatorPermissionRepo;
	}
}