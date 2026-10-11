import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SaveUserPreferencesDTO} from '../interactor/dto/SaveUserPreferencesDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateLanguage';
import {ValidateUpdateUserPreferencesRepo} from '../repository/ValidateUpdateUserPreferencesRepo';
import {ValidateCanUpdateUserPreferences} from './permissions/ValidateCanUpdateUserPreferences';
import {ValidateModulePreferences} from '@copor/core/domain/User/UserPreferences/validations/ValidateModulePreferences';

export class ValidateUpdateUserPreferences
	extends ValidationWithPermissionAndRepo<SaveUserPreferencesDTO, ValidateUpdateUserPreferencesRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateUserPreferences(this.permissionRepo, this.input.user),
			new ValidateLanguage(this.storageRepo, this.input.language),
			new ValidateModulePreferences(this.input.modulePreferences)
		];
	}
}
