import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateAlarm';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetAlarmDTO} from './dto/ValidateGetAlarmDTO';
import {ValidateGetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateGetAlarmRepo';
import {ValidateCanGetAlarm} from './validators/ValidateCanGetAlarm';

export class ValidateGetAlarm extends ValidationWithPermissionAndRepo<ValidateGetAlarmDTO, ValidateGetAlarmRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAlarm(this.permissionRepo, this.input.actorId),
			new ValidateAlarm(this.storageRepo, this.input.alarmId)
		];
	}
}