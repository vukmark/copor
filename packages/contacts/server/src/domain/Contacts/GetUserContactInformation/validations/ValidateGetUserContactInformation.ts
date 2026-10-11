import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateGetUserContactInformationDTO} from './dto/ValidateGetUserContactInformationDTO';
import {
	ValidateCanGetUserContactInformation,
	ValidateCanGetUserContactInformationContext
} from './permissions/ValidateCanGetUserContactInformation';


export class ValidateGetUserContactInformation
	extends ValidationWithPermissionAndRepo<
		ValidateGetUserContactInformationDTO,
		IsNotValidUserRepo,
		ValidateCanGetUserContactInformationContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanGetUserContactInformationContext = {
			userId: this.input.userId
		};

		return [
			new ValidateCanGetUserContactInformation(this.permissionRepo, this.input.actorId, context),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}
