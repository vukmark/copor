import {
	ValidateGetUserAccountInformationRepo
} from '@copor/core/domain/User/AccountInformation/repository/ValidateGetUserAccountInformationRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyGetUserAccountInformationForDisplayValidatorStorageRepo implements ValidateGetUserAccountInformationRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}