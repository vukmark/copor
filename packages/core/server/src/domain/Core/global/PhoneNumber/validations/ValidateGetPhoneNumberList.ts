import {ValidationWithPermissionAndRepo} from '../../../Validations/ValidationWithPermissionAndRepo';
import {ValidateGetPhoneNumberListDTO} from './dto/ValidateGetPhoneNumberListDTO';
import {ValidateGetPhoneNumberListRepo} from '../repository/ValidateGetPhoneNumberListRepo';
import {Validator} from '../../../Validations/Validators/Validator';
import {ValidateCanGetPhoneNumberList} from './permissions/ValidateCanGetPhoneNumberList';
import {ValidateUser} from '../../../../User/validation/validator/ValidateUser';

export class ValidateGetPhoneNumberList extends
	ValidationWithPermissionAndRepo<ValidateGetPhoneNumberListDTO, ValidateGetPhoneNumberListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetPhoneNumberList(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.user)
		];
	}
}