import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetFeatureListDTO} from '@copor/core/domain/FeatureList/validation/dto/ValidateGetFeatureListDTO';
import {ValidateGetFeatureList} from '@copor/core/domain/FeatureList/validation/ValidateGetFeatureList';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {GetFeatureList} from '@copor/core/domain/FeatureList/interactor/GetFeatureList';
import {LogGetFeatureList} from '@copor/core/domain/FeatureList/logger/LogGetFeatureList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetMenuViewModel} from './GetMenuViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFeatureListInteractorRepoPicker} from '@copor/core/client/FeatureList/GetFeatureList/repo/repoPicker/GetFeatureListInteractorRepoPicker';
import {GetFeatureListLoggerRepoPicker} from '@copor/core/client/FeatureList/GetFeatureList/repo/repoPicker/GetFeatureListLoggerRepoPicker';
import {GetMenuPresenter} from './GetMenuPresenter';
import {GetUserRoleTypeInteractorRepoPicker} from '@copor/core/client/Components/Role/GetUserRoleType/repo/repoPicker/GetUserRoleTypeInteractorRepoPicker';
import {GetUserRoleType} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';


export class GetMenuController extends BaseController<undefined, GetMenuViewModel> {
	async getResponse(): Promise<void> {
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetFeatureListDTO>,
			this.getValidator(actorId),
			this.getInteractor(actorId),
			this.getLogger(actorId)
		);
		const [response, actorRole] = await Promise.all([
			factory.run(),
			this.getActorRole(actorId)
		]);
		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = new GetMenuPresenter(response, this.container.appContext, actorRole);
		const presentedResponse = presenter.present();
		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private async getActorRole(actorId: string): Promise<RoleType> {
		const repository = this.container.getNewRepoPicker(GetUserRoleTypeInteractorRepoPicker);

		return this.container.getInteractor(GetUserRoleType, repository, actorId).execute();
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
