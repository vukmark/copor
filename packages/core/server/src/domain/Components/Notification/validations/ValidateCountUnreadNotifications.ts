import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountUnreadNotificationsDTO} from './dto/ValidateCountUnreadNotificationsDTO';
import {ValidateCanCountUnreadNotifications} from './ValidateCanCountUnreadNotifications';

export class ValidateCountUnreadNotifications extends ValidationWithPermission<ValidateCountUnreadNotificationsDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanCountUnreadNotifications(this.permissionRepo, this.input.userId)];
	}
}
