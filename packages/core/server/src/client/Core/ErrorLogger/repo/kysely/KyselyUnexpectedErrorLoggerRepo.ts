import {UnexpectedErrorLoggerDTO, UnexpectedErrorLoggerRepo} from '@copor/core/domain/Core/Repository/UnexpectedErrorLoggerRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUnexpectedErrorLoggerRepo implements UnexpectedErrorLoggerRepo {
	async log(input: UnexpectedErrorLoggerDTO): Promise<void> {
		await db
			.insertInto('unexpectedError')
			.values({
				id: crypto.randomUUID(),
				message: input.message,
				stack: input.stack,
				path: input.path,
				method: input.method,
				actorId: input.actorId,
				createdAt: new Date()
			})
			.execute();
	}
}