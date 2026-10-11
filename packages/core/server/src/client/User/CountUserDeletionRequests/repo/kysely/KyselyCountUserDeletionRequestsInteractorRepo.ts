import {CountUserDeletionRequestsRepo} from '@copor/core/domain/User/repository/CountUserDeletionRequestsRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCountUserDeletionRequestsInteractorRepo implements CountUserDeletionRequestsRepo {
	async count(): Promise<number> {
		const row = await db
			.selectFrom('user')
			.select((eb) => eb.fn.countAll<number>().as('count'))
			.where('deletionRequested', '=', true)
			.executeTakeFirstOrThrow();

		return Number(row.count);
	}
}
