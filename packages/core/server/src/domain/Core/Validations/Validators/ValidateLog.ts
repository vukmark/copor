import {ValidatorWithRepo} from './ValidatorWithRepo';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';
import {IsInvalidLogRepo} from '@copor/core/domain/Log/repository/IsInvalidLogRepo';
import {InvalidLogException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidLogException';

export class ValidateLog extends ValidatorWithRepo<IsInvalidLogRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidLog(this.input).then((isInvalidLog) => {
				if (isInvalidLog) {
					throw new InvalidLogException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
