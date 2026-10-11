import {ValidateRequestAccountDeletionRepo} from '@copor/core/domain/User/repository/ValidateRequestAccountDeletionRepo';

export class FakeRequestAccountDeletionValidatorStorageRepo implements ValidateRequestAccountDeletionRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(!userId);
	}
}
