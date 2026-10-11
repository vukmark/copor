import {
	ValidateCreatePhoneNumberRepo
} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateCreatePhoneNumberRepo';

export class FakeCreatePhoneNumberValidatorStorageRepo implements ValidateCreatePhoneNumberRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
