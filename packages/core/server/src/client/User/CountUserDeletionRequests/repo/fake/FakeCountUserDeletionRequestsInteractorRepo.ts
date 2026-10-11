import {CountUserDeletionRequestsRepo} from '@copor/core/domain/User/repository/CountUserDeletionRequestsRepo';

export class FakeCountUserDeletionRequestsInteractorRepo implements CountUserDeletionRequestsRepo {
	count(): Promise<number> {
		return Promise.resolve(0);
	}
}
