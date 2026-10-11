import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidAlarmableRepo} from '@copor/todo/domain/ToDo/Alarm/repository/IsInvalidAlarmableRepo';
import {ValidateAlarmableDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateAlarmableDTO';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {InvalidAlarmableException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmableException';

export class ValidateAlarmable extends ValidatorWithRepo<IsInvalidAlarmableRepo, ValidateAlarmableDTO | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidAlarmable(this.input?.alarmableType, this.input?.alarmableId).then((isInvalidToDo) => {
				if (isInvalidToDo) {
					throw new InvalidAlarmableException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}