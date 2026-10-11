import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateUserAccountInformationDTO} from './dto/ValidateUpdateUserAccountInformationDTO';
import {ValidateUpdateUserAccountInformationRepo}
	from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateCanUpdateUserAccountInformation, ValidateCanUpdateUserAccountInformationContext}
	from '../../Core/Validations/Validators/ValidateCanUpdateUserAccountInformation';
import {ValidateUser} from './validator/ValidateUser';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';

export class ValidateUpdateUserAccountInformation extends ValidationWithPermissionAndRepo<
	ValidateUpdateUserAccountInformationDTO,
	ValidateUpdateUserAccountInformationRepo,
	ValidateCanUpdateUserAccountInformationContext> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanUpdateUserAccountInformation(this.permissionRepo, this.input.actorId, {userId: this.input.id}),
			new ValidateUser(this.storageRepo, this.input.id)
		];

		if (this.input.country)
			validators.push(new ValidateCountry(this.storageRepo, this.input.country));

		if (this.input.state)
			validators.push(new ValidateState(this.storageRepo, this.input.state));

		return validators;
	}
}

