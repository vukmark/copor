import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteNotificationTokenDTO} from './dto/ValidateDeleteNotificationTokenDTO';
import {ValidateDeleteNotificationTokenRepo} from '../repository/ValidateDeleteNotificationTokenRepo';
import {ValidateNotificationToken} from '@copor/core/domain/Core/Validations/Validators/ValidateNotificationToken';
import {ValidateCanDeleteNotificationToken} from './ValidateCanDeleteNotificationToken';

export class ValidateDeleteNotificationToken extends ValidationWithPermissionAndRepo<ValidateDeleteNotificationTokenDTO,
	ValidateDeleteNotificationTokenRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteNotificationToken(this.permissionRepo, this.input.actorId),
			new ValidateNotificationToken(this.storageRepo, this.input.token)
		];
	}
}
