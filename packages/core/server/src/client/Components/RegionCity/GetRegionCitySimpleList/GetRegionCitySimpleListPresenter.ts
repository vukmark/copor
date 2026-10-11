import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';

export class GetRegionCitySimpleListPresenter extends PaginatedPresenter<GetRegionCityDTO, NameAndIdDTO> {
	protected mapItem(input: GetRegionCityDTO): NameAndIdDTO<string> {
		return {
			id: input.id,
			name: `${input.city}, ${input.postalCode}`
		};
	}
}
