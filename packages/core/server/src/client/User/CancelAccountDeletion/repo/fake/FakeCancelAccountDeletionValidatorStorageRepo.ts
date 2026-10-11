import {ValidateCancelAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateCancelAccountDeletionRepo';

export class FakeCancelAccountDeletionValidatorStorageRepo implements ValidateCancelAccountDeletionRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(!userId);
	}
}
