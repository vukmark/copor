import {ValidationWithPermissionAndRepo} from '../../../Validations/ValidationWithPermissionAndRepo';
import {ValidateCreatePhoneNumberDTO} from './dto/ValidateCreatePhoneNumberDTO';
import {ValidateCreatePhoneNumberRepo} from '../repository/ValidateCreatePhoneNumberRepo';
import {Validator} from '../../../Validations/Validators/Validator';
import {ValidateCanCreatePhoneNumber} from './permissions/ValidateCanCreatePhoneNumber';
import {ValidateEmptyPhoneNumber} from '../../../Validations/Validators/ValidateEmptyPhoneNumber';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateCreatePhoneNumber
	extends ValidationWithPermissionAndRepo<ValidateCreatePhoneNumberDTO[], ValidateCreatePhoneNumberRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [];

		this.input.map((phone) => {
			validators.push(new ValidateCanCreatePhoneNumber(this.permissionRepo, phone.actorId));
			validators.push(new ValidateEmptyPhoneNumber(phone.phoneNumber));
			validators.push(new ValidateUser(this.storageRepo, phone.user));
		});

		return validators;
	}
}