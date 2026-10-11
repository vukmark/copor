import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateLanguage';
import {ValidateCanCreateUserPreferences} from '@copor/core/domain/Core/Validations/Validators/ValidateCanCreateUserPreferences';
import {ValidateCreateUserPreferencesDTO} from './dto/ValidateCreateUserPreferencesDTO';
import {ValidateCreateUserPreferencesRepo} from '../repository/ValidateCreateUserPreferencesRepo';

export class ValidateCreateUserPreferences
	extends ValidationWithPermissionAndRepo<ValidateCreateUserPreferencesDTO, ValidateCreateUserPreferencesRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateUserPreferences(this.permissionRepo, this.input.actorId),
			new ValidateLanguage(this.storageRepo, this.input.language)
		];
	}
}
