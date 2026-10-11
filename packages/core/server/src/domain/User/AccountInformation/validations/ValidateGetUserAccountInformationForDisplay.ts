import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {
	ValidateCanGetUserAccountInformationForDisplay
} from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanGetUserAccountInformationForDisplay';
import {
	ValidateGetUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateGetUserAccountInformationRepo';
import {
	ValidateGetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/validations/dto/ValidateGetUserAccountInformationForDisplayDTO';

export class ValidateGetUserAccountInformationForDisplay
	extends ValidationWithPermissionAndRepo<ValidateGetUserAccountInformationForDisplayDTO, ValidateGetUserAccountInformationRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserAccountInformationForDisplay(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}