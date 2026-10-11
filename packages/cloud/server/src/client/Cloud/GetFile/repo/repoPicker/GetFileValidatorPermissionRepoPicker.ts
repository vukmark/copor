import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateGetFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateGetFile';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	KyselyGetFileValidatorPermissionRepo
} from '@copor/cloud/client/Cloud/GetFile/repo/kysely/KyselyGetFileValidatorPermissionRepo';

export class GetFileValidatorPermissionRepoPicker extends ContextualPermissionRepoPicker<ValidateGetFileContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateGetFileContext> {
		return KyselyGetFileValidatorPermissionRepo;
	}
}