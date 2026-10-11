import {ValidateCreatePhoneNumberRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateCreatePhoneNumberRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyCreatePhoneNumberValidatorStorageRepo implements ValidateCreatePhoneNumberRepo {
	public isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
