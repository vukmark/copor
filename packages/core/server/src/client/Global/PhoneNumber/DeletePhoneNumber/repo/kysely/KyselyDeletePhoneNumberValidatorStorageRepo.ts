import {ValidateDeletePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateDeletePhoneNumberRepo';
import {PhoneNumberKyselyHelper} from '@copor/core/client/Global/PhoneNumber/repositoryHelper/PhoneNumberKyselyHelper';

export class KyselyDeletePhoneNumberValidatorStorageRepo implements ValidateDeletePhoneNumberRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return PhoneNumberKyselyHelper.phoneNumberHasReferences(id);
	}
	isInvalidPhoneNumber(phoneNumberId: string): Promise<boolean> {
		return PhoneNumberKyselyHelper.isInvalidPhoneNumber(phoneNumberId);
	}
}