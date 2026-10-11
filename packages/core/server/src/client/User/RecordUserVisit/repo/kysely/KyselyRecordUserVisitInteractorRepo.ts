import {RecordUserVisitRepo} from '@copor/core/domain/User/repository/RecordUserVisitRepo';
import {RecordUserVisitDTO} from '@copor/core/domain/User/interactor/dto/RecordUserVisitDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyRecordUserVisitInteractorRepo implements RecordUserVisitRepo {
	async recordVisit(input: RecordUserVisitDTO): Promise<void> {
		await db
			.updateTable('user')
			.set({lastVisitedAt: input.visitedAt})
			.where('id', '=', input.userId)
			.execute();
	}
}
