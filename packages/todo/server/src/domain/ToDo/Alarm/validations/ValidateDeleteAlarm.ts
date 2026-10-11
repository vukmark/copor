import {ValidateDeleteAlarmDTO} from './dto/ValidateDeleteAlarmDTO';
import {ValidateCanDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/validators/ValidateCanDeleteAlarm';
import {ValidateDeleteAlarmRepo} from '../repository/ValidateDeleteAlarmRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateAlarm';

export class ValidateDeleteAlarm extends ValidationWithPermissionAndRepo<ValidateDeleteAlarmDTO, ValidateDeleteAlarmRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteAlarm(this.permissionRepo, this.input.actorId),
			new ValidateAlarm(this.storageRepo, this.input.alarmId)
		];
	}
}
