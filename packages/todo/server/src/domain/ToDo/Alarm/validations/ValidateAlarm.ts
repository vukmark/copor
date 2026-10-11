import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/IsInvalidAlarmRepo';
import {InvalidAlarmException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmException';

export class ValidateAlarm extends ValidatorWithRepo<IsInvalidAlarmRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidAlarm(this.input).then((isInvalidAlarm) => {
				if (isInvalidAlarm) {
					throw new InvalidAlarmException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}