import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {RequestAccountDeletionRepo} from '@copor/core/domain/User/repository/RequestAccountDeletionRepo';

export class RequestAccountDeletion extends ExecuteUseCase<string, RequestAccountDeletionRepo, void> {
	public async execute(): Promise<void> {
		return this.repository.requestDeletion(this.input);
	}
}
