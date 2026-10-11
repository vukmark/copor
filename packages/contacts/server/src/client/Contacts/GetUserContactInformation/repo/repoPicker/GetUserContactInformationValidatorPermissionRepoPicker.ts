import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateCanGetUserContactInformationContext
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/permissions/ValidateCanGetUserContactInformation';
import {
	KyselyGetUserContactInformationValidatorPermissionRepo
} from '@copor/contacts/client/Contacts/GetUserContactInformation/repo/kysely/KyselyGetUserContactInformationValidatorPermissionRepo';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';

export class GetUserContactInformationValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanGetUserContactInformationContext> {
	protected getKyselyRepo(): new(appContext: AppContext) => PermissionRepository<ValidateCanGetUserContactInformationContext> {
		return KyselyGetUserContactInformationValidatorPermissionRepo;
	}
}