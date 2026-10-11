import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class GetBaseTenantListPresenter extends PresenterInstance<GetTenantDTO[], NameAndIdDTO[]> {
	public present(): NameAndIdDTO[] {
		return this.input.map((tenant) => {
			return {
				id: tenant.id,
				name: tenant.name
			};
		});
	}
}