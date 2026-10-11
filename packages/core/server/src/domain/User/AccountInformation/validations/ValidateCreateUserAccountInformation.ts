import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmailAddress} from '@copor/core/domain/Core/Validations/Validators/ValidateEmailAddress';
import {ValidateEmailNotInUse} from '@copor/core/domain/Core/Validations/Validators/ValidateEmailNotInUse';
import {ValidateCreateUserAccountInformationDTO}
	from '@copor/core/domain/User/AccountInformation/validations/dto/ValidateCreateUserAccountInformationDTO';
import {ValidateCreateUserAccountInformationRepo}
	from '@copor/core/domain/User/AccountInformation/repository/ValidateCreateUserAccountInformationRepo';
import {ValidateCanCreateUserAccountInformation}
	from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanCreateUserAccountInformation';

export class ValidateCreateUserAccountInformation
	extends ValidationWithPermissionAndRepo
	<ValidateCreateUserAccountInformationDTO, ValidateCreateUserAccountInformationRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateUserAccountInformation(this.permissionRepo, this.input.actorId, this.input.roleType),
			new ValidateEmailAddress(this.input.email!),
			new ValidateEmailNotInUse(this.storageRepo, this.input.email)
		];
	}
}
