import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ValidateGetRegionList} from '@copor/core/domain/Components/Region/validations/ValidateGetRegionList';
import {
	GetRegionListInteractorRepoPicker
} from '@copor/core/client/Components/Region/GetRegionList/repo/repoPicker/GetRegionListInteractorRepoPicker';
import {GetRegionList} from '@copor/core/domain/Components/Region/interactor/GetRegionList';
import {
	GetRegionListLoggerRepoPicker
} from '@copor/core/client/Components/Region/GetRegionList/repo/repoPicker/GetRegionListLoggerRepoPicker';
import {LogGetRegionList} from '@copor/core/domain/Components/Region/logger/LogGetRegionList';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegionSimpleListPresenter} from '@copor/core/client/Components/Region/GetRegionSimpleList/GetRegionSimpleListPresenter';

export class GetRegionSimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
	public async getResponse(): Promise<void> {
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
			GetRegionSimpleListPresenter,
			response,
			container.appContext,
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
			});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRegionListLoggerRepoPicker);

		return container.getLogger(LogGetRegionList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}