import {OutboxEmailStatus} from '@copor/core/domain/Core/enum/OutboxEmailStatus';
import {db} from '@copor/core/client/AppDataSource';
import {QueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/QueuedEmailDTO';
import {SendQueuedEmailsRepo} from '@copor/core/domain/Core/EmailOutbox/repository/SendQueuedEmailsRepo';

export class KyselySendQueuedEmailsRepo implements SendQueuedEmailsRepo {
	async getReadyToSend(limit: number): Promise<QueuedEmailDTO[]> {
		const rows = await db
			.selectFrom('emailOutbox')
			.select([
				'id',
				'type',
				'receiver',
				'subject',
				'payload',
				'attempts'
			])
			.where('status', '=', OutboxEmailStatus.PENDING)
			.orderBy('priority', 'asc')
			.orderBy('createdAt', 'asc')
			.orderBy('id', 'asc')
			.limit(limit)
			.execute();

		return rows.map((row) => ({
			id: row.id,
			type: row.type,
			receiver: row.receiver,
			subject: row.subject,
			payload: row.payload,
			attempts: row.attempts ?? 0
		}));
	}

	async markAsSending(id: string): Promise<void> {
		await db
			.updateTable('emailOutbox')
			.set({
				status: OutboxEmailStatus.SENDING
			})
			.where('id', '=', id)
			.execute();
	}

	async markAsSent(id: string): Promise<void> {
		await db
			.updateTable('emailOutbox')
			.set({
				status: OutboxEmailStatus.SENT,
				sentAt: new Date()
			})
			.where('id', '=', id)
			.execute();
	}

	async markAsFailedAttempt(id: string, errorMessage: string): Promise<void> {
		await db
			.updateTable('emailOutbox')
			.set((eb) => ({
				status: OutboxEmailStatus.PENDING,
				attempts: eb('attempts', '+', 1),
				lastError: errorMessage,
				nextAttemptAt: new Date(Date.now() + 5 * 60 * 1000)
			}))
			.where('id', '=', id)
			.execute();
	}
}