import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateRequestAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateRequestAccountDeletionRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanRequestAccountDeletion} from '@copor/core/domain/User/validation/validator/ValidateCanRequestAccountDeletion';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateRequestAccountDeletion
	extends ValidationWithPermissionAndRepo<string, ValidateRequestAccountDeletionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanRequestAccountDeletion(this.permissionRepo, this.input),
			new ValidateUser(this.storageRepo, this.input)
		];
	}
}
