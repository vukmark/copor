import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {DeleteSentOldQueuedEmailsRepo} from '@copor/core/domain/Core/EmailOutbox/repository/DeleteSentOldQueuedEmailsRepo';

export class DeleteSentOldQueuedEmails extends ExecuteUseCase<Date, DeleteSentOldQueuedEmailsRepo, number> {
	async execute(): Promise<number> {
		return await this.repository.deleteSentOlderThan(
			this.input
		);
	}
}