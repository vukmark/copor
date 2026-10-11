import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';

export class KyselyGetLogInteractorRepo implements GetItem<GetLogDTO> {
	async load(id: string): Promise<GetLogDTO> {
		const result = await db
			.selectFrom('log')
			.leftJoin('user', 'log.actorId', 'user.id')
			.leftJoin('authUser as auser', 'user.authUserId', 'auser.id')
			.select([
				'log.id',
				'log.actorId',
				'log.logData',
				'auser.userName as actorUserName',
				'log.logType',
				'log.createdAt'
			])
			.where('log.id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Log with id ${id} not found`);
		}

		return {
			... result,
			actorId: result.actorId ?? undefined,
			logData: result.logData ? JSON.parse(result.logData) as unknown as Record<string, unknown> : undefined
		};
	}
}