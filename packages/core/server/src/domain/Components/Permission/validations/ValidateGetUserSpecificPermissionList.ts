import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateCanGetUserPermissionList} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetUserPermissionList';
import {ValidateGetUserSpecificPermissionListDTO} from './dto/ValidateGetUserSpecificPermissionListDTO';
import {ValidateGetUserSpecificPermissionListRepo} from '../repository/ValidateGetUserSpecificPermissionListRepo';

export class ValidateGetUserSpecificPermissionList
	extends ValidationWithPermissionAndRepo<ValidateGetUserSpecificPermissionListDTO, ValidateGetUserSpecificPermissionListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserPermissionList(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}
