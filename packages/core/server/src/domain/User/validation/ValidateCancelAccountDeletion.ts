import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCancelAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateCancelAccountDeletionRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanRequestAccountDeletion} from '@copor/core/domain/User/validation/validator/ValidateCanRequestAccountDeletion';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateCancelAccountDeletion
	extends ValidationWithPermissionAndRepo<string, ValidateCancelAccountDeletionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanRequestAccountDeletion(this.permissionRepo, this.input),
			new ValidateUser(this.storageRepo, this.input)
		];
	}
}
