import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {KyselyGetContactInfoForUserValidatorPermissionRepo}
	from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/kysely/KyselyGetContactInfoForUserValidatorPermissionRepo';
import {ValidateCanGetContactInfoForUserContext} from '@copor/contacts/domain/Contacts/validation/validator/ValidateCanGetContactInfoForUser';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';

export class GetContactInfoForUserValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanGetContactInfoForUserContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<ValidateCanGetContactInfoForUserContext> {
		return KyselyGetContactInfoForUserValidatorPermissionRepo;
	}
}