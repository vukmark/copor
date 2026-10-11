import {CancelAccountDeletionRepo} from '@copor/core/domain/User/repository/CancelAccountDeletionRepo';

export class FakeCancelAccountDeletionInteractorRepo implements CancelAccountDeletionRepo {
	cancelDeletion(): Promise<void> {
		return Promise.resolve();
	}
}
