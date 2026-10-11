import {ValidateCanUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/validators/ValidateCanUpdateAlarm';
import {ValidateUpdateAlarmRepo} from '../repository/ValidateUpdateAlarmRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateAlarm';
import {ValidateUpdateAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateUpdateAlarmDTO';
import {ValidateAlarmable} from '@copor/todo/domain/ToDo/Alarm/validations/validators/ValidateAlarmable';

export class ValidateUpdateAlarm extends ValidationWithPermissionAndRepo<ValidateUpdateAlarmDTO, ValidateUpdateAlarmRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateAlarm(this.permissionRepo, this.input.actorId),
			new ValidateAlarm(this.storageRepo, this.input.id),
			new ValidateAlarmable(
				this.storageRepo,
				{alarmableId: this.input.alarmableId, alarmableType: this.input.alarmableType}
			)
		];
	}
}
