import {GetRegionViewModel} from '../GetRegion/GetRegionViewModel';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';

export class GetRegionListPresenter extends PaginatedPresenter<GetRegionDTO, GetRegionViewModel> {
	protected mapItem(dto: GetRegionDTO): GetRegionViewModel {
		return {
			id: dto.id,
			country: dto.country,
			state: dto.state,
			postalCode: dto.postalCode,
			cityList: dto.cityList.join(', ')
		};
	}
}
