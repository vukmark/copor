import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetVuMeetFileViewModel} from './GetVuMeetFileViewModel';
import {GetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileDTO';

export class GetVuMeetFilePresenter extends PresenterInstance<GetVuMeetFileDTO, GetVuMeetFileViewModel> {
	present(): GetVuMeetFileViewModel {
		return {
			... this.input
		};
	}
}
