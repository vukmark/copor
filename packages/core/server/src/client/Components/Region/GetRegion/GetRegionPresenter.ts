import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegionViewModel} from './GetRegionViewModel';

export class GetRegionPresenter extends PresenterInstance<GetRegionDTO, GetRegionViewModel> {
	present(): GetRegionViewModel {
		return {
			id: this.input.id,
			country: this.input.country,
			state: this.input.state,
			postalCode: this.input.postalCode,
			cityList: this.input.cityList.join(', '),
		};
	}
}
