import {ValidateUpdatePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateUpdatePhoneNumberRepo';

export class FakeUpdatePhoneNumberValidatorStorageRepo implements ValidateUpdatePhoneNumberRepo {
	public isInvalidPhoneNumber(phoneid: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	public isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
