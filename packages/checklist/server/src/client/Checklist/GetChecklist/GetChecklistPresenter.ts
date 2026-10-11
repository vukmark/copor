import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';
import {GetChecklistViewModel} from './GetChecklistViewModel';

export class GetChecklistPresenter extends PresenterInstance<GetChecklistDTO, GetChecklistViewModel> {
	present(): GetChecklistViewModel {
		return {
			id: this.input.id,
			title: this.input.title
		};
	}
}
