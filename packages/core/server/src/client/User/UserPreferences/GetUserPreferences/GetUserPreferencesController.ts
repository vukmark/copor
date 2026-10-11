import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/validations/dto/ValidateGetUserPreferencesDTO';
import {ValidateGetUserPreferences} from '@copor/core/domain/User/UserPreferences/validations/ValidateGetUserPreferences';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {GetUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/GetUserPreferences';
import {LogGetUserPreferences} from '@copor/core/domain/User/UserPreferences/logger/LogGetUserPreferences';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetUserPreferencesViewModel} from './GetUserPreferencesViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserPreferencesInteractorRepoPicker} from './repo/repoPicker/GetUserPreferencesInteractorRepoPicker';
import {GetUserPreferencesLoggerRepoPicker} from './repo/repoPicker/GetUserPreferencesLoggerRepoPicker';
import {GetUserPreferencesPresenter} from '@copor/core/client/User/UserPreferences/GetUserPreferences/GetUserPreferencesPresenter';


export class GetUserPreferencesController extends BaseController<undefined, GetUserPreferencesViewModel> {
	async getResponse(): Promise<void> {
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetUserPreferencesDTO>,
			this.getValidator(actorId),
			this.getInteractor(actorId),
			this.getLogger(actorId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetUserPreferencesPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator(actorId: string) {
		const c = this.container;
		const validatorInput: ValidateGetUserPreferencesDTO = {actorId};

		return c.getValidator(
			ValidateGetUserPreferences,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	private getLogger(actorId: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserPreferencesLoggerRepoPicker);


		return this.container.getLogger(
			LogGetUserPreferences,
			loggerRepository,
			new CreateLogDetails(actorId),
			undefined
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserPreferencesInteractorRepoPicker);

		return this.container.getInteractor(
			GetUserPreferences,
			interactorRepository,
			id
		);
	}
}
