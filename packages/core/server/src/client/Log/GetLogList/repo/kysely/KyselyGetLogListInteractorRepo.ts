import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';

export class KyselyGetLogListInteractorRepo implements ListItems<GetLogDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetLogDTO[]> {
		const searchFilter = input.filters.find((f) => f.name === FilterNameValues.SEARCH as string);
		let search: string = '';

		if (searchFilter?.values?.[0]) {
			search = `%${searchFilter.values[0].trim().toLowerCase()}%`;
		}
		let query = db
			.selectFrom('log')
			.innerJoin('user', 'log.actorId', 'user.id')
			.innerJoin('authUser as auser', 'user.authUserId', 'auser.id')
			.select([
				'log.id as id',
				'log.logData as logData',
				'log.actorId as actorId',
				'log.logType as logType',
				'log.createdAt as createdAt',
				'auser.userName as actorUserName'
			])
			.orderBy('log.createdAt', 'desc')
			.where((eb) => eb.or([
				eb('log.actorId', 'like', `%${search}%`),
				eb('auser.userName', 'like', `%${search}%`)
			]));


		if (input.limit && input.offset) {
			const parsedLimit = parseInt(input.limit, 10);
			const parsedOffset = parseInt(input.offset, 10);

			query = query.limit(parsedLimit).offset(parsedOffset);
		}
		const results = await query.execute();

		return results.map((result) => {
			return {
				... result,
				actorId: result.actorId ?? undefined,
				logData: JSON.parse(result.logData ?? '{}') as Record<string, unknown>
			};
		});
	}
}
