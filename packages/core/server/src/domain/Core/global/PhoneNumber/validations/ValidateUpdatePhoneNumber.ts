import {ValidationWithPermissionAndRepo} from '../../../Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdatePhoneNumberDTO} from './dto/ValidateUpdatePhoneNumberDTO';
import {ValidateUpdatePhoneNumberRepo} from '../repository/ValidateUpdatePhoneNumberRepo';
import {Validator} from '../../../Validations/Validators/Validator';
import {ValidateEmptyPhoneNumber} from '../../../Validations/Validators/ValidateEmptyPhoneNumber';
import {ValidateCanUpdatePhoneNumber} from './permissions/ValidateCanUpdatePhoneNumber';
import {ValidatePhoneNumber} from '../../../Validations/Validators/ValidatePhoneNumber';
import {ValidateUser} from '../../../../User/validation/validator/ValidateUser';

export class ValidateUpdatePhoneNumber
	extends ValidationWithPermissionAndRepo<ValidateUpdatePhoneNumberDTO[], ValidateUpdatePhoneNumberRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [];

		this.input.map((phone) => {
			validators.push(new ValidateCanUpdatePhoneNumber(this.permissionRepo, phone.actorId));
			validators.push(new ValidateEmptyPhoneNumber(phone.phoneNumber));
			validators.push(new ValidateUser(this.storageRepo, phone.user));
			validators.push(new ValidatePhoneNumber(this.storageRepo, phone.id));
		});

		return validators;
	}
}