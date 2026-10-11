import {RequestAccountDeletionRepo} from '@copor/core/domain/User/repository/RequestAccountDeletionRepo';

export class FakeRequestAccountDeletionInteractorRepo implements RequestAccountDeletionRepo {
	requestDeletion(userId: string): Promise<void> {
		return Promise.resolve();
	}
}
