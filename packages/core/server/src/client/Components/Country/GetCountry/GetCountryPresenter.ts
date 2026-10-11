import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetCountryWithStateListViewModel} from './GetCountryWithStateListViewModel';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';

export class GetCountryPresenter extends PresenterInstance<GetCountryWithStateListDTO, GetCountryWithStateListViewModel> {
	present(): GetCountryWithStateListViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			code: this.input.code,
			publishStatus: this.input.publishStatus,
			stateList: this.input.stateList
		};
	}
}
