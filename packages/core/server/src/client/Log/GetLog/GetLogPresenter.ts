import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetLogViewModel} from './GetLogViewModel';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';

export class GetLogPresenter extends PresenterInstance<GetLogDTO, GetLogViewModel> {
	present(): GetLogViewModel {
		return {
			id: this.input.id,
			actorId: this.input.actorId,
			logData: this.input.logData,
			actorUserName: this.input.actorUserName ?? '',
			logType: this.input.logType,
			createdAt: this.input.createdAt
		};
	}
}
