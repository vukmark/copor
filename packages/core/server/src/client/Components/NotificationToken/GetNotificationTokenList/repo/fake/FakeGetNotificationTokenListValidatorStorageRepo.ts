import {
	ValidateGetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateGetNotificationTokenListRepo';

export class FakeGetNotificationTokenListValidatorStorageRepo implements ValidateGetNotificationTokenListRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
