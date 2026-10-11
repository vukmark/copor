import {ValidateDeletePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateDeletePhoneNumberRepo';

export class FakeDeletePhoneNumberValidatorStorageRepo implements ValidateDeletePhoneNumberRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidPhoneNumber(phoneNumberId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}