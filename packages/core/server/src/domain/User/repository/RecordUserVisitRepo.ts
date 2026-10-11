import {RecordUserVisitDTO} from '@copor/core/domain/User/interactor/dto/RecordUserVisitDTO';

export interface RecordUserVisitRepo {
	recordVisit(input: RecordUserVisitDTO): Promise<void>
}
