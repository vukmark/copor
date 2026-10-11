import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCityViewModel} from '@copor/core/client/Components/RegionCity/GetRegionCity/GetRegionCityViewModel';

export class GetRegionCityListPresenter extends PaginatedPresenter<GetRegionCityDTO, GetRegionCityViewModel> {
	protected mapItem(input: GetRegionCityDTO): GetRegionCityViewModel {
		return {
			id: input.id,
			regionId: input.regionId,
			city: input.city,
			province: input.province,
			provinceCode: input.provinceCode,
			community: input.community,
			communityCode: input.communityCode,
			postalCode: input.postalCode,
			latitude: input.latitude,
			longitude: input.longitude
		};
	}
}