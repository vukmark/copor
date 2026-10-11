import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetAlarmViewModel} from './GetAlarmViewModel';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';

export class GetAlarmPresenter extends PresenterInstance<GetAlarmDTO, GetAlarmViewModel> {
	present(): GetAlarmViewModel {
		return {
			... this.input
		};
	}
}
