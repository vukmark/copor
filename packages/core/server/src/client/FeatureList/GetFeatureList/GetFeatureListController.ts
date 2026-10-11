import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetFeatureListDTO} from '@copor/core/domain/FeatureList/validation/dto/ValidateGetFeatureListDTO';
import {ValidateGetFeatureList} from '@copor/core/domain/FeatureList/validation/ValidateGetFeatureList';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {GetFeatureList} from '@copor/core/domain/FeatureList/interactor/GetFeatureList';
import {LogGetFeatureList} from '@copor/core/domain/FeatureList/logger/LogGetFeatureList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetFeatureListViewModel} from './GetFeatureListViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFeatureListInteractorRepoPicker} from './repo/repoPicker/GetFeatureListInteractorRepoPicker';
import {GetFeatureListLoggerRepoPicker} from './repo/repoPicker/GetFeatureListLoggerRepoPicker';
import {GetFeatureListPresenter} from './GetFeatureListPresenter';


export class GetFeatureListController extends BaseController<undefined, GetFeatureListViewModel> {
	async getResponse(): Promise<void> {
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetFeatureListDTO>,
			this.getValidator(actorId),
			this.getInteractor(actorId),
			this.getLogger(actorId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetFeatureListPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string) {
		const c = this.container;
		const validatorInput: ValidateGetFeatureListDTO = {
			actorId
		};

		return c.getValidator(
			ValidateGetFeatureList,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	private getLogger(actorId: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetFeatureListLoggerRepoPicker);

		return this.container.getLogger(
			LogGetFeatureList,
			loggerRepository,
			new CreateLogDetails(actorId),
			undefined
		);
	}

	private getInteractor(actorId: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetFeatureListInteractorRepoPicker);

		return this.container.getInteractor(
			GetFeatureList,
			interactorRepository,
			actorId
		);
	}
}
