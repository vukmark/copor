import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetNativeLanguageViewModel} from '../GetNativeLanguage/GetNativeLanguageViewModel';
import {ValidateGetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateGetNativeLanguageList';
import {GetNativeLanguageListInteractorRepoPicker} from './repo/repoPicker/GetNativeLanguageListInteractorRepoPicker';
import {GetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguageList';
import {GetNativeLanguageListLoggerRepoPicker} from './repo/repoPicker/GetNativeLanguageListLoggerRepoPicker';
import {LogGetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguageList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';

export class GetNativeLanguageListController extends BaseController<void, GetNativeLanguageViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetNativeLanguageDTO[]>,
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
			ValidateGetNativeLanguageList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNativeLanguageListInteractorRepoPicker);

		return container.getInteractor(GetNativeLanguageList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetNativeLanguageListLoggerRepoPicker);

		return container.getLogger(LogGetNativeLanguageList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
