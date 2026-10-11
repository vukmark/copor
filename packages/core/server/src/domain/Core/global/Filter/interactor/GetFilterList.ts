import {ExecuteUseCase} from '../../../Interactors/ExecuteUseCase';
import {SetFilterDTO} from '../dto/SetFilterDTO';

import {GetFilterListRepo} from '../repository/GetFilterListRepo';
import {GetFilterListDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterListDTO';

export class GetFilterList extends ExecuteUseCase<GetFilterListDTO, GetFilterListRepo, SetFilterDTO[]> {
	public execute(): Promise<SetFilterDTO[]> {
		return this.repository.getFilterList(this.input.actorId, this.input.page);
	}
}
