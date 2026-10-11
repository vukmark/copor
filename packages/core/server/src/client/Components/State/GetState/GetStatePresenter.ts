import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetStateViewModel} from './GetStateViewModel';

export class GetStatePresenter extends PresenterInstance<GetStateDTO, GetStateViewModel> {
	present(): GetStateViewModel {
		return {
			... this.input
		};
	}
}