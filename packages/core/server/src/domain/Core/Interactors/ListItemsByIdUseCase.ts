import {ExecuteUseCase} from './ExecuteUseCase';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {ListItemsByIdRepo} from '@copor/core/domain/Core/Repository/ListItemsByIdRepo';

export interface ListItemsByIdDTO {
	id: string;
	filters: GetFilterDTO[];
	actorId?: string;
	limit?: string;
	offset?: string;
}


export abstract class ListItemsByIdUseCase<Response>
	extends ExecuteUseCase<ListItemsByIdDTO, ListItemsByIdRepo<Response>, Response[]> {
	public async execute(): Promise<Response[]> {
		return await this.repository.list(this.input);
	}
}
