import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyToggleUserActiveStatusValidatorStorageRepo implements ValidateUpdateUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
