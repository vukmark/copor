import {
    ValidateGetPhoneNumberListRepo
} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateGetPhoneNumberListRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyGetPhoneNumberListValidatorRepo implements ValidateGetPhoneNumberListRepo {
	public isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}