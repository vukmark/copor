import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {GetLogViewModel} from '@copor/core/client/Log/GetLogList/GetLogViewModel';
import i18next from 'i18next';

export class GetLogListPresenter extends PresenterInstance<GetLogDTO[], GetLogViewModel[]> {
	public present(): GetLogViewModel[] {
		i18next.setDefaultNamespace('log');
		return this.input.map((record) => {
			return {
				... record,
				logType: i18next.t(record.logType)
			};
		});
	}
}
