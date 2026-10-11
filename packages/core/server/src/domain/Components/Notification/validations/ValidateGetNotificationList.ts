import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetNotificationList} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetNotificationList';
import {ValidateGetNotificationListDTO} from './dto/ValidateGetNotificationListDTO';

export class ValidateGetNotificationList extends ValidationWithPermission<ValidateGetNotificationListDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetNotificationList(this.permissionRepo, this.input.userId)];
	}
}
