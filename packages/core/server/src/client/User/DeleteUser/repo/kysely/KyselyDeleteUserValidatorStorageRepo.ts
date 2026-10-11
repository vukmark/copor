import {ValidateDeleteUserRepo} from '@copor/core/domain/User/repository/ValidateDeleteUserRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyDeleteUserValidatorStorageRepo implements ValidateDeleteUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
