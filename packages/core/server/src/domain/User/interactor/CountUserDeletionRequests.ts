import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {CountUserDeletionRequestsRepo} from '@copor/core/domain/User/repository/CountUserDeletionRequestsRepo';

export class CountUserDeletionRequests extends ExecuteUseCase<undefined, CountUserDeletionRequestsRepo, number> {
	public async execute(): Promise<number> {
		return this.repository.count();
	}
}
