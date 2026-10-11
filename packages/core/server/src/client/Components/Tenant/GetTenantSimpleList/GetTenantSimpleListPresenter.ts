import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';

export class GetTenantSimpleListPresenter extends PaginatedPresenter<GetTenantDTO, NameAndIdDTO> {
	protected mapItem(dto: GetTenantDTO): NameAndIdDTO {
		return {id: dto.id, name: dto.name};
	}
}
