import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetLanguageDTO} from '@copor/core/domain/Components/Language/validations/dto/ValidateGetLanguageDTO';
import {ValidateGetLanguage} from '@copor/core/domain/Components/Language/validations/ValidateGetLanguage';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {GetLanguage} from '@copor/core/domain/Components/Language/interactor/GetLanguage';
import {LogGetLanguage} from '@copor/core/domain/Components/Language/logger/LogGetLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetLanguageViewModel} from './GetLanguageViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetLanguageValidatorStorageRepoPicker} from './repo/repoPicker/GetLanguageValidatorStorageRepoPicker';
import {GetLanguageInteractorRepoPicker} from './repo/repoPicker/GetLanguageInteractorRepoPicker';
import {GetLanguageLoggerRepoPicker} from './repo/repoPicker/GetLanguageLoggerRepoPicker';
import {GetLanguagePresenter} from './GetLanguagePresenter';

export interface GetLanguageParams {
	id: string;
}

export class GetLanguageController extends BaseController<undefined, GetLanguageViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetLanguageParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetLanguageDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetLanguagePresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetLanguageDTO = {actorId, languageId: id};

		return c.getValidator(
			ValidateGetLanguage,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetLanguageValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetLanguageLoggerRepoPicker);
		const logData = {
			languageId: id
		};

		return this.container.getLogger(
			LogGetLanguage,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetLanguageInteractorRepoPicker);

		return this.container.getInteractor(
			GetLanguage,
			interactorRepository,
			id
		);
	}
}
