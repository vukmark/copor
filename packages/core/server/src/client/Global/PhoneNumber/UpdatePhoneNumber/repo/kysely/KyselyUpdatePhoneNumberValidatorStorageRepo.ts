import {ValidateUpdatePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateUpdatePhoneNumberRepo';
import {PhoneNumberKyselyHelper} from '@copor/core/client/Global/PhoneNumber/repositoryHelper/PhoneNumberKyselyHelper';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyUpdatePhoneNumberValidatorStorageRepo implements ValidateUpdatePhoneNumberRepo {
	public isInvalidPhoneNumber(phoneid: string | undefined): Promise<boolean> {
		return PhoneNumberKyselyHelper.isInvalidPhoneNumber(phoneid);
	}

	public isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
