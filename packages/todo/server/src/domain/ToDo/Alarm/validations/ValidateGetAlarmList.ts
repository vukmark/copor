import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetAlarmList} from './validators/ValidateCanGetAlarmList';

export class ValidateGetAlarmList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAlarmList(this.permissionRepo, this.input)
		];
	}
}