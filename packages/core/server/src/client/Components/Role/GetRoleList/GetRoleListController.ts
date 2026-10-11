import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRoleViewModel} from '../GetRole/GetRoleViewModel';
import {GetRoleListInteractorRepoPicker} from './repo/repoPicker/GetRoleListInteractorRepoPicker';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';
import {GetRoleListLoggerRepoPicker} from './repo/repoPicker/GetRoleListLoggerRepoPicker';
import {LogGetRoleList} from '@copor/core/domain/Components/Role/logger/LogGetRoleList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {GetRoleListPresenter} from '@copor/core/client/Components/Role/GetRoleList/GetRoleListPresenter';

export class GetRoleListController extends BaseController<GetListReqBodyDTO, GetRoleViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetRoleDTO[]>,
			undefined,
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetRoleListPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetRoleListInteractorRepoPicker);

		return container.getInteractor(GetRoleList, interactorRepo, {filters: this.request.body.filterList});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRoleListLoggerRepoPicker);

		return container.getLogger(LogGetRoleList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
