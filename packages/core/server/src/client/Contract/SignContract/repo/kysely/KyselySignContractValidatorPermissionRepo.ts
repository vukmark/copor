import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {ValidateCanSignContractContext} from '@copor/core/domain/Contract/validation/validator/ValidateCanSignContract';

export class KyselySignContractValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanSignContractContext> {
	protected getUserIdFromContext(context: ValidateCanSignContractContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}