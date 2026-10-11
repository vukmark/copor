import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetRegionList} from '@copor/core/domain/Components/Region/validations/ValidateGetRegionList';
import {GetRegionListInteractorRepoPicker} from './repo/repoPicker/GetRegionListInteractorRepoPicker';
import {GetRegionList} from '@copor/core/domain/Components/Region/interactor/GetRegionList';
import {GetRegionListLoggerRepoPicker} from './repo/repoPicker/GetRegionListLoggerRepoPicker';
import {LogGetRegionList} from '@copor/core/domain/Components/Region/logger/LogGetRegionList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRegionViewModel} from '../GetRegion/GetRegionViewModel';
import {GetRegionListPresenter} from '@copor/core/client/Components/Region/GetRegionList/GetRegionListPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

export class GetRegionListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<GetRegionViewModel>> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetRegionDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(
			GetRegionListPresenter,
			response,
			this.container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetRegionList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetRegionListInteractorRepoPicker);

		return container.getInteractor(
			GetRegionList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRegionListLoggerRepoPicker);

		return container.getLogger(LogGetRegionList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
