import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {GetFeatureListViewModel} from './GetFeatureListViewModel';

export class GetFeatureListPresenter extends PresenterInstance<GetFeatureListDTO, GetFeatureListViewModel> {
	present(): GetFeatureListViewModel {
		return {
			featureList: this.input.featureList
		};
	}
}
