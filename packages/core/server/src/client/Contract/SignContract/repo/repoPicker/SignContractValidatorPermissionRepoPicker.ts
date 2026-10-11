import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ContextualPermissionRepoPicker} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {ValidateCanSignContractContext} from '@copor/core/domain/Contract/validation/validator/ValidateCanSignContract';
import {KyselySignContractValidatorPermissionRepo}
	from '@copor/core/client/Contract/SignContract/repo/kysely/KyselySignContractValidatorPermissionRepo';

export class SignContractValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanSignContractContext> {
	protected getKyselyRepo(): new(appContext: AppContext) => PermissionRepository<ValidateCanSignContractContext> {
		return KyselySignContractValidatorPermissionRepo;
	}
}