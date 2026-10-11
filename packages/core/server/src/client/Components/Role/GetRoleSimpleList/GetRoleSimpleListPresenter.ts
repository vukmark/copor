import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';

export class GetRoleSimpleListPresenter extends PaginatedPresenter<GetRoleDTO, NameAndIdDTO> {
	protected mapItem(input: GetRoleDTO): NameAndIdDTO<string> {
		return {
			id: input.id,
			name: input.name
		};
	}
}