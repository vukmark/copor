import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateMarkAllNotificationsAsReadDTO} from './dto/ValidateMarkAllNotificationsAsReadDTO';
import {ValidateCanMarkAllNotificationsAsRead} from './ValidateCanMarkAllNotificationsAsRead';

export class ValidateMarkAllNotificationsAsRead extends ValidationWithPermission<ValidateMarkAllNotificationsAsReadDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanMarkAllNotificationsAsRead(this.permissionRepo, this.input.userId)];
	}
}
