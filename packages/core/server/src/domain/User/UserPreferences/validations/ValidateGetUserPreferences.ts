import {ValidateGetUserPreferencesDTO} from './dto/ValidateGetUserPreferencesDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetUserPreferences} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetUserPreferences';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateGetUserPreferences extends ValidationWithPermission<ValidateGetUserPreferencesDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserPreferences(this.permissionRepo, this.input.actorId)
		];
	}
}
