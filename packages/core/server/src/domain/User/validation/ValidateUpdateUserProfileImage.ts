import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateUserProfileImageDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserProfileImageDTO';
import {
	ValidateCanUpdateUserProfileImage
} from '@copor/core/domain/User/validation/validator/ValidateCanUpdateUserProfileImage';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';
import {
	ValidateCanUpdateUserAccountInformationContext
} from '@copor/core/domain/Core/Validations/Validators/ValidateCanUpdateUserAccountInformation';

export class ValidateUpdateUserProfileImage
	extends ValidationWithPermissionAndRepo<
		ValidateUpdateUserProfileImageDTO,
		ValidateUpdateUserRepo,
		ValidateCanUpdateUserAccountInformationContext
	> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateUserProfileImage(
				this.permissionRepo,
				this.input.actorId,
				{userId: this.input.userId}
			),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}
