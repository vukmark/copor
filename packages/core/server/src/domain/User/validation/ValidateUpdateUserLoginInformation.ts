import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateUser} from './validator/ValidateUser';
import {ValidateUpdateUserLoginInformationDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserLoginInformationDTO';
import {ValidateUpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserLoginInformationRepo';
import {ValidateUserPassword} from '@copor/core/domain/User/validation/validator/ValidateUserPassword';
import {ValidateCanUpdateUserLoginInformation, ValidateCanUpdateUserLoginInformationContext}
	from '@copor/core/domain/User/AccountInformation/validations/validator/ValidateCanUpdateUserLoginInformation';
import {getPasswordPolicyValidators} from '@copor/core/domain/Core/Validations/Validators/PasswordPolicyValidatorSet';
import {ValidatePasswordNotRecentlyUsed} from '@copor/core/domain/Core/Validations/Validators/ValidatePasswordNotRecentlyUsed';
import {UserIdentityDTO} from '@copor/core/domain/User/repository/dto/UserIdentityDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export class ValidateUpdateUserLoginInformation extends
	ValidationWithPermissionAndRepo<
		ValidateUpdateUserLoginInformationDTO,
		ValidateUpdateUserLoginInformationRepo,
		ValidateCanUpdateUserLoginInformationContext
	> {
	private identity?: UserIdentityDTO;

	public async validate(): Promise<void | ErrorList> {
		this.identity = await this.storageRepo.getUserIdentity(this.input.userId);

		return super.validate();
	}

	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateUserLoginInformation(this.permissionRepo, this.input.actorId, {userId: this.input.userId}),
			new ValidateUser(this.storageRepo, this.input.userId),
			... getPasswordPolicyValidators(
				this.storageRepo, {
					password: this.input.newPassword,
					userName: this.identity?.userName,
					email: this.identity?.email ?? undefined,
					firstName: this.identity?.firstName ?? undefined,
					lastName: this.identity?.lastName ?? undefined
				}),
			new ValidatePasswordNotRecentlyUsed(this.storageRepo, this.identity && {
				authUserId: this.identity.authUserId,
				password: this.input.newPassword
			}),
			new ValidateUserPassword(this.storageRepo, {userId: this.input.userId, password: this.input.oldPassword})
		];
	}
}
