import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetLanguageViewModel} from '../GetLanguage/GetLanguageViewModel';
import {ValidateGetLanguageList} from '@copor/core/domain/Components/Language/validations/ValidateGetLanguageList';
import {GetLanguageListInteractorRepoPicker} from './repo/repoPicker/GetLanguageListInteractorRepoPicker';
import {GetLanguageList} from '@copor/core/domain/Components/Language/interactor/GetLanguageList';
import {GetLanguageListLoggerRepoPicker} from './repo/repoPicker/GetLanguageListLoggerRepoPicker';
import {LogGetLanguageList} from '@copor/core/domain/Components/Language/logger/LogGetLanguageList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';

export class GetLanguageListController extends BaseController<void, GetLanguageViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetLanguageDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetLanguageList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetLanguageListInteractorRepoPicker);

		return container.getInteractor(GetLanguageList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetLanguageListLoggerRepoPicker);

		return container.getLogger(LogGetLanguageList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
