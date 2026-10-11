import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {SearchTenantListDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SearchTenantListDTO';
import {SearchTenantListViewModel} from './SearchTenantListViewModel';

export class SearchTenantListPresenter extends PresenterInstance<SearchTenantListDTO[], SearchTenantListViewModel[]> {
	public present(): SearchTenantListViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			name: dto.name,
			city: dto.city,
			publishStatus: dto.publishStatus
		}));
	}
}