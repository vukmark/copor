import {ValidationWithPermissionAndRepo} from '../../Core/Validations/ValidationWithPermissionAndRepo';
import {SaveSettingsDTO} from '../interactor/dto/SaveSettingsDTO';
import {ValidateUpdateSettingsRepo} from '../repository/ValidateUpdateSettingsRepo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidateCanUpdatePersonalData} from './permissions/ValidateCanUpdatePersonalData';
import {ValidateUser}                  from '../../User/validation/validator/ValidateUser';

export class ValidateUpdateSettings extends ValidationWithPermissionAndRepo<SaveSettingsDTO, ValidateUpdateSettingsRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdatePersonalData(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.actorId)
		];
	}
}