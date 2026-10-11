import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {db} from '@copor/core/client/AppDataSource';
import {Kysely, Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';

export class KyselyLogRepository<T> implements LogRepository<T> {
	private dbConnection: Kysely<DB> | Transaction<DB> = db;

	public useTransaction(trx: Transaction<DB>): this {
		this.dbConnection = trx;

		return this;
	}

	async save(logDTO: LogForSave<T>): Promise<void> {
		await this.dbConnection
			.insertInto('log')
			.values({
				id: await this.getNewId(),
				actorId: logDTO.actorUserId,
				logData: JSON.stringify(logDTO.logData),
				logType: typeof logDTO.actionType == 'string'
					? logDTO.actionType
					: logDTO.actionType,
				createdAt: new Date()
			})
			.execute();
	}

	private getNewId(): Promise<string> {
		const idGenerator = new IdGenerator();

		return idGenerator.getNewId();
	}
}