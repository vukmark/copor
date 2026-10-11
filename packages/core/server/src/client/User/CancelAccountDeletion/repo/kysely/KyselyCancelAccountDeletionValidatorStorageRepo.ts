import {ValidateCancelAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateCancelAccountDeletionRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyCancelAccountDeletionValidatorStorageRepo implements ValidateCancelAccountDeletionRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
