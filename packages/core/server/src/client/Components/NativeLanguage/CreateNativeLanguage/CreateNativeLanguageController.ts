import {CreateNativeLanguageReqBodyDTO} from './dto/CreateNativeLanguageReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateNativeLanguageDTO}
	from '@copor/core/domain/Components/NativeLanguage/validations/dto/ValidateCreateNativeLanguageDTO';
import {ValidateCreateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateCreateNativeLanguage';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {CreateNativeLanguageInteractorRepoPicker} from './repo/repoPicker/CreateNativeLanguageInteractorRepoPicker';
import {CreateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/interactor/CreateNativeLanguage';
import {CreateNativeLanguageLoggerRepoPicker} from './repo/repoPicker/CreateNativeLanguageLoggerRepoPicker';
import {
	LogCreateNativeLanguage,
	LogDataForCreateNativeLanguage
} from '@copor/core/domain/Components/NativeLanguage/logger/LogCreateNativeLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateNativeLanguageController extends CreateBaseController<CreateNativeLanguageReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateNativeLanguageDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateNativeLanguage,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveNativeLanguageDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateNativeLanguageInteractorRepoPicker);

		return container.getInteractor(
			CreateNativeLanguage,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateNativeLanguageLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateNativeLanguage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateNativeLanguage {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
