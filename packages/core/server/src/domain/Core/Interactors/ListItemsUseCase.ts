import {ListItems} from '../Repository/ListItems';
import {ExecuteUseCase} from './ExecuteUseCase';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export interface ListItemsUseCaseInput {
	filters: GetFilterDTO[];
	actorId?: string;
	limit?: string;
	offset?: string
}

export interface ListRepoInputDTO {
	filters: GetFilterDTO[];
	actorId?: string;
	permissionType?: PermissionType;
	limit?: string;
	offset?: string;
}

export abstract class ListItemsUseCase<Response>
	extends ExecuteUseCase<ListItemsUseCaseInput | GetFilterDTO[], ListItems<Response>, Response[]> {
	protected permissionType?: PermissionType;
	public async execute(): Promise<Response[]> {
		const filters = Array.isArray(this.input) ? this.input : this.input.filters;
		const actorId = Array.isArray(this.input) ? undefined : this.input.actorId;
		const limit = Array.isArray(this.input) ? undefined : this.input.limit;
		const offset = Array.isArray(this.input) ? undefined : this.input.offset;

		const query: ListRepoInputDTO = {
			filters,
			actorId,
			permissionType: this.permissionType,
			limit,
			offset
		};

		return await this.repository.list(query);
	}
}
