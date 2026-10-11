import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {ValidateCanUpdateAuthUserInformation}
	from '@copor/core/domain/User/validation/validator/ValidateCanUpdateAuthUserInformation';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateUniqueAuthUserName} from '@copor/core/domain/User/validation/validator/ValidateUniqueAuthUserName';
import {ValidateEmailRequiredForRole} from '@copor/core/domain/User/validation/validator/ValidateEmailRequiredForRole';
import {ValidateAdminUser} from '@copor/core/domain/User/validation/validator/ValidateAdminUser';
import {getPasswordPolicyValidators} from '@copor/core/domain/Core/Validations/Validators/PasswordPolicyValidatorSet';
import {ValidatePasswordNotRecentlyUsed} from '@copor/core/domain/Core/Validations/Validators/ValidatePasswordNotRecentlyUsed';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export class ValidateUpdateAuthUserInformation extends ValidationWithPermissionAndRepo<
	UpdateAuthUserInformationDTO,
	ValidateUpdateAuthUserInformationRepo
> {
	private authUserId?: string;

	public async validate(): Promise<void | ErrorList> {
		if (this.input.password !== undefined) {
			this.authUserId = await this.storageRepo.getAuthUserId(this.input.id);
		}

		return super.validate();
	}

	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanUpdateAuthUserInformation(this.permissionRepo, this.input.actorId),
			new ValidateAdminUser(this.storageRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.id),
			new ValidateEmptyName(this.input.userName),
			new ValidateUniqueAuthUserName(this.storageRepo, this.input),
			new ValidateEmailRequiredForRole(this.storageRepo, this.input)
		];

		if (this.input.password !== undefined) {
			validators.push(
				... getPasswordPolicyValidators(this.storageRepo, {
					password: this.input.password,
					userName: this.input.userName,
					email: this.input.email
				}));

			validators.push(new ValidatePasswordNotRecentlyUsed(this.storageRepo, this.authUserId ? {
				authUserId: this.authUserId,
				password: this.input.password
			} : undefined));
		}

		return validators;
	}
}
