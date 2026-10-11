import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {
	ValidateCanGetUserAccountInformation, ValidateCanGetUserAccountInformationContext
} from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanGetUserAccountInformation';
import {
	ValidateGetUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateGetUserAccountInformationRepo';
import {
	ValidateGetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/validations/dto/ValidateGetUserAccountInformationDTO';

export class ValidateGetUserAccountInformation
	extends ValidationWithPermissionAndRepo
	<ValidateGetUserAccountInformationForDisplayDTO,
		ValidateGetUserAccountInformationRepo,
		ValidateCanGetUserAccountInformationContext> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserAccountInformation(this.permissionRepo, this.input.actorId, {userId: this.input.userId}),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}