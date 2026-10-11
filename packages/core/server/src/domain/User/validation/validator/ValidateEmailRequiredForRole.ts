import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {ValidateUpdateAuthUserInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {ValidateEmailAddress} from '@copor/core/domain/Core/Validations/Validators/ValidateEmailAddress';
import {ValidateUniqueAuthUserEmail} from '@copor/core/domain/User/validation/validator/ValidateUniqueAuthUserEmail';

export class ValidateEmailRequiredForRole extends ValidatorWithRepo<
	ValidateUpdateAuthUserInformationRepo,
	UpdateAuthUserInformationDTO
> {
	public async validate(): Promise<void> {
		await new ValidateEmailAddress(this.input!.email!).validate();
		await new ValidateUniqueAuthUserEmail(this.repository, this.input).validate();
	}
}
