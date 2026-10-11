import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCityViewModel} from '@copor/core/client/Components/RegionCity/GetRegionCity/GetRegionCityViewModel';

export class GetRegionCityPresenter extends PresenterInstance<GetRegionCityDTO, GetRegionCityViewModel> {
	present(): GetRegionCityViewModel {
		return {
			id: this.input.id,
			regionId: this.input.regionId,
			city: this.input.city,
			province: this.input.province,
			provinceCode: this.input.provinceCode,
			community: this.input.community,
			communityCode: this.input.communityCode,
			postalCode: this.input.postalCode,
			latitude: this.input.latitude,
			longitude: this.input.longitude
		};
	}
}