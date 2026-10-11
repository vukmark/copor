import {SetHoursForToDoAlertDTO} from '../interactor/dto/SetHoursForToDoAlertDTO';

import {ValidateCanSetHoursForToDoAlert} from './permissions/ValidateCanSetHoursForToDoAlert';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateSetHoursForToDoAlert extends ValidationWithPermission<SetHoursForToDoAlertDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanSetHoursForToDoAlert(this.permissionRepo, this.input.userId)];
	}
}
