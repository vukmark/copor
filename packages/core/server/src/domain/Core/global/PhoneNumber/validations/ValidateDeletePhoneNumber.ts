import {ValidationWithPermissionAndRepo} from '../../../Validations/ValidationWithPermissionAndRepo';
import {ValidateDeletePhoneNumberDTO} from './dto/ValidateDeletePhoneNumberDTO';
import {ValidateDeletePhoneNumberRepo} from '../repository/ValidateDeletePhoneNumberRepo';
import {Validator} from '../../../Validations/Validators/Validator';
import {ValidateCanDeletePhoneNumber} from './permissions/ValidateCanDeletePhoneNumber';
import {ValidatePhoneNumber} from '../../../Validations/Validators/ValidatePhoneNumber';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeletePhoneNumber extends
	ValidationWithPermissionAndRepo<ValidateDeletePhoneNumberDTO, ValidateDeletePhoneNumberRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeletePhoneNumber(this.permissionRepo, this.input.actorId),
			new ValidatePhoneNumber(this.storageRepo, this.input.id),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.id)
		];
	}
}