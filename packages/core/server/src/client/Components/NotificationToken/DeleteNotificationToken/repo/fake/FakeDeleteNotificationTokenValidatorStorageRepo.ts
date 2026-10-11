import {
	ValidateDeleteNotificationTokenRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateDeleteNotificationTokenRepo';

export class FakeDeleteNotificationTokenValidatorStorageRepo implements ValidateDeleteNotificationTokenRepo {
	isInvalidNotificationToken(): Promise<boolean> {
		return Promise.resolve(false);
	}
}