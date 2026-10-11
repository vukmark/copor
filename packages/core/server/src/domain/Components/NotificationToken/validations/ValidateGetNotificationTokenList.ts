import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {
	ValidateCanGetNotificationTokenList
} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetNotificationTokenList';
import {ValidateGetNotificationTokenListDTO} from './dto/ValidateGetNotificationTokenListDTO';
import {ValidateGetNotificationTokenListRepo} from '../repository/ValidateGetNotificationTokenListRepo';

export class ValidateGetNotificationTokenList
	extends ValidationWithPermissionAndRepo<ValidateGetNotificationTokenListDTO, ValidateGetNotificationTokenListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetNotificationTokenList(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}