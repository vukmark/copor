import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {CancelAccountDeletionRepo} from '@copor/core/domain/User/repository/CancelAccountDeletionRepo';

export class CancelAccountDeletion extends ExecuteUseCase<string, CancelAccountDeletionRepo, void> {
	public async execute(): Promise<void> {
		return this.repository.cancelDeletion(this.input);
	}
}
