import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {EmptyTokenValidator} from '@copor/core/domain/Core/Validations/Validators/EmptyTokenValidator';
import {ValidateCreateNotificationTokenRepo} from '../repository/ValidateCreateNotificationTokenRepo';
import {ValidateCreateNotificationTokenDTO} from './dto/ValidateCreateNotificationTokenDTO';
import {ValidateCanCreateNotificationToken} from './ValidateCanCreateNotificationToken';

export class ValidateCreateNotificationToken
	extends ValidationWithPermissionAndRepo<ValidateCreateNotificationTokenDTO, ValidateCreateNotificationTokenRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateNotificationToken(this.permissionRepo, this.input.userId),
			new EmptyTokenValidator(this.input.token)
		];
	}
}