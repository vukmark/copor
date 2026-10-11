import {SetFilterDTO} from '../dto/SetFilterDTO';

export interface GetFilterListRepo {
	getFilterList(actorId: string, page: string): Promise<SetFilterDTO[]>;
}
