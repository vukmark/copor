import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';

export class GetRegionSimpleListPresenter extends PaginatedPresenter<GetRegionDTO, NameAndIdDTO> {
	protected mapItem(input: GetRegionDTO): NameAndIdDTO<string> {
		return {
			id: input.id,
			name: input.postalCode + ' ' + input.cityList.join('. ') + ', ' + input.state.name
		};
	}
}
