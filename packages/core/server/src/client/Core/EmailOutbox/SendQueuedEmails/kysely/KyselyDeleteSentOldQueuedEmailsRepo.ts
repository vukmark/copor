import {db} from '@copor/core/client/AppDataSource';
import {OutboxEmailStatus} from '@copor/core/domain/Core/enum/OutboxEmailStatus';
import {DeleteSentOldQueuedEmailsRepo} from '@copor/core/domain/Core/EmailOutbox/repository/DeleteSentOldQueuedEmailsRepo';

export class KyselyDeleteSentOldQueuedEmailsRepo
implements DeleteSentOldQueuedEmailsRepo {
	async deleteSentOlderThan(date: Date): Promise<number> {
		const result = await db
			.deleteFrom('emailOutbox')
			.where('status', '=', OutboxEmailStatus.SENT)
			.where('sentAt', '<', date)
			.executeTakeFirst();

		return Number(result.numDeletedRows ?? 0);
	}
}