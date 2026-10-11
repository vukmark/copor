import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {SaveQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SaveQueuedEmailDTO';
import {OutboxEmailStatus} from '@copor/core/domain/Core/enum/OutboxEmailStatus';
import {Kysely, Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';

export class KyselyCreateQueuedEmailInteractorRepo implements SaveItem<SaveQueuedEmailDTO> {
	private dbConnection: Kysely<DB> | Transaction<DB> = db;

	public useTransaction(trx: Transaction<DB>): this {
		this.dbConnection = trx;

		return this;
	}

	async save(saveDTO: SaveQueuedEmailDTO): Promise<void> {
		const timestamps = TimestampHelper.getTimestampForCreate(saveDTO.actorId);

		await this.dbConnection
			.insertInto('emailOutbox')
			.values({
				id: saveDTO.id,
				type: saveDTO.type,
				receiver: saveDTO.receiver,
				subject: saveDTO.subject ?? '',
				status: OutboxEmailStatus.PENDING,
				priority: saveDTO.priority ?? 0,
				payload: JSON.stringify(saveDTO.payload),
				createdAt: timestamps.createdAt,
				nextAttemptAt: timestamps.createdAt
			})
			.execute();
	}
}