import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {RecordUserVisitDTO} from '@copor/core/domain/User/interactor/dto/RecordUserVisitDTO';
import {RecordUserVisitRepo} from '@copor/core/domain/User/repository/RecordUserVisitRepo';

export class RecordUserVisit extends ExecuteUseCase<RecordUserVisitDTO, RecordUserVisitRepo, void> {
	public execute(): Promise<void> {
		return this.repository.recordVisit(this.input);
	}
}
