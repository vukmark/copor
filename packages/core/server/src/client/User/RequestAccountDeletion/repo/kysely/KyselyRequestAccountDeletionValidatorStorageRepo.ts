import {ValidateRequestAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateRequestAccountDeletionRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyRequestAccountDeletionValidatorStorageRepo implements ValidateRequestAccountDeletionRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
