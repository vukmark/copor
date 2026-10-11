import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';
import {LogGetRoleList} from '@copor/core/domain/Components/Role/logger/LogGetRoleList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {
	GetRoleListInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListInteractorRepoPicker';
import {
	GetRoleListLoggerRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListLoggerRepoPicker';
import {GetRoleSimpleListPresenter} from '@copor/core/client/Components/Role/GetRoleSimpleList/GetRoleSimpleListPresenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

export class GetRoleSimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
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
		const presenter = this.container.getPresenter(
			GetRoleSimpleListPresenter,
			response,
			container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);

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
