import {RecordUserVisitRepo} from '@copor/core/domain/User/repository/RecordUserVisitRepo';
import {RecordUserVisitDTO} from '@copor/core/domain/User/interactor/dto/RecordUserVisitDTO';

export class FakeRecordUserVisitInteractorRepo implements RecordUserVisitRepo {
	private readonly visits = new Map<string, Date>();

	recordVisit(input: RecordUserVisitDTO): Promise<void> {
		this.visits.set(input.userId, input.visitedAt);

		return Promise.resolve();
	}
}
