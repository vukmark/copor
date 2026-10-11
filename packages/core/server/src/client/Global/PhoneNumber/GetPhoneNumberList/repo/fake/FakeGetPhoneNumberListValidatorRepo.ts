import {ValidateGetPhoneNumberListRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateGetPhoneNumberListRepo';

export class FakeGetPhoneNumberListValidatorRepo implements ValidateGetPhoneNumberListRepo {
	public isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}