import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateUserAccountInformationDTO} from './dto/ValidateUpdateUserAccountInformationDTO';
import {
	ValidateUpdateUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateUser} from './validator/ValidateUser';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {
	ValidateCanUpdatePersonalAccountInformation, ValidateCanUpdatePersonalAccountInformationContext
} from '@copor/core/domain/User/validation/validator/ValidateCanUpdatePersonalAccountInformation';

export class ValidateUpdatePersonalAccountInformation extends
	ValidationWithPermissionAndRepo<
		ValidateUpdateUserAccountInformationDTO,
		ValidateUpdateUserAccountInformationRepo,
		ValidateCanUpdatePersonalAccountInformationContext
	> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanUpdatePersonalAccountInformation(this.permissionRepo, this.input.id, {userId: this.input.id}),
			new ValidateUser(this.storageRepo, this.input.id)
		];

		if (this.input.country)
			validators.push(new ValidateCountry(this.storageRepo, this.input.country));

		if (this.input.state)
			validators.push(new ValidateState(this.storageRepo, this.input.state));

		return validators;
	}
}

