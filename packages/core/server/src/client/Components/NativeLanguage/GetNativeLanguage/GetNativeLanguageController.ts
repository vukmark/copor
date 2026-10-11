import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/validations/dto/ValidateGetNativeLanguageDTO';
import {ValidateGetNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateGetNativeLanguage';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {GetNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguage';
import {LogGetNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetNativeLanguageViewModel} from './GetNativeLanguageViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetNativeLanguageValidatorStorageRepoPicker} from './repo/repoPicker/GetNativeLanguageValidatorStorageRepoPicker';
import {GetNativeLanguageInteractorRepoPicker} from './repo/repoPicker/GetNativeLanguageInteractorRepoPicker';
import {GetNativeLanguageLoggerRepoPicker} from './repo/repoPicker/GetNativeLanguageLoggerRepoPicker';
import {GetNativeLanguagePresenter} from './GetNativeLanguagePresenter';

export interface GetNativeLanguageParams {
	id: string;
}

export class GetNativeLanguageController extends BaseController<undefined, GetNativeLanguageViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetNativeLanguageParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetNativeLanguageDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetNativeLanguagePresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetNativeLanguageDTO = {actorId, languageId: id};

		return c.getValidator(
			ValidateGetNativeLanguage,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetNativeLanguageValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetNativeLanguageLoggerRepoPicker);
		const logData = {
			languageId: id
		};

		return this.container.getLogger(
			LogGetNativeLanguage,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetNativeLanguageInteractorRepoPicker);

		return this.container.getInteractor(
			GetNativeLanguage,
			interactorRepository,
			id
		);
	}
}
