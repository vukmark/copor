import {ValidatorWithRepo} from './ValidatorWithRepo';
import {
	IsInvalidNotificationTokenRepo
} from '@copor/core/domain/Components/NotificationToken/repository/IsInvalidNotificationTokenRepo';
import {InvalidIDException} from '../../Exceptions/invalid/InvalidIDException';

export class ValidateNotificationToken extends ValidatorWithRepo<IsInvalidNotificationTokenRepo, string | undefined> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidNotificationToken(this.input).then((isInvalidNotificationToken) => {
				if (isInvalidNotificationToken) {
					throw new InvalidNotificationTokenException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}

export class InvalidNotificationTokenException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidNotificationTokenException';
	}
}