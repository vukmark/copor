import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetPublicTagListInteractorRepoPicker} from './repo/repoPicker/GetPublicTagListInteractorRepoPicker';
import {GetPublicTagListLoggerRepoPicker} from './repo/repoPicker/GetPublicTagListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetPublicTagViewModel} from './GetPublicTagViewModel';
import {ValidateGetPublicTagList} from '@copor/core/domain/Components/Tag/validation/ValidateGetPublicTagList';
import {GetPublicTagList} from '@copor/core/domain/Components/Tag/interactor/GetPublicTagList';
import {LogGetPublicTagList} from '@copor/core/domain/Components/Tag/logger/LogGetPublicTagList';
import {GetPublicTagListPresenter} from '@copor/core/client/Components/Tag/GetPublicTagList/GetPublicTagListPresenter';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

interface GetPublicTagListReqBody {
	filterList: GetFilterDTO[];
}
export class GetPublicTagListController extends BaseController<GetPublicTagListReqBody, GetPublicTagViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetTagDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetPublicTagListPresenter, response, this.container.appContext);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetPublicTagList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetPublicTagListInteractorRepoPicker);

		return container.getInteractor(GetPublicTagList, interactorRepo, {filters: this.request.body.filterList});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetPublicTagListLoggerRepoPicker);

		return container.getLogger(LogGetPublicTagList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
