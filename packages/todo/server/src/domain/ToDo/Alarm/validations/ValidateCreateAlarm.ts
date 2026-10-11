import {ValidateCreateAlarmRepo} from '../repository/ValidateCreateAlarmRepo';
import {ValidateCanCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/validators/ValidateCanCreateAlarm';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateCreateAlarmDTO';
import {ValidateAlarmable} from '@copor/todo/domain/ToDo/Alarm/validations/validators/ValidateAlarmable';

export class ValidateCreateAlarm extends ValidationWithPermissionAndRepo<ValidateCreateAlarmDTO, ValidateCreateAlarmRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateAlarm(this.permissionRepo, this.input.actorId),
			new ValidateAlarmable(
				this.storageRepo,
				{alarmableType: this.input.alarmableType, alarmableId: this.input.alarmableId}
			)
		];
	}
}
