import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {ValidateDeleteUserPreferencesDTO} from './dto/ValidateDeleteUserPreferencesDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanDeleteUserPermissions} from '@copor/core/domain/Core/Validations/Validators/ValidateCanDeleteUserPermissions';

export class ValidateDeleteUserPreferences extends ValidationWithPermission<ValidateDeleteUserPreferencesDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanDeleteUserPermissions(this.permissionRepo, this.input.actorId)];
	}
}
