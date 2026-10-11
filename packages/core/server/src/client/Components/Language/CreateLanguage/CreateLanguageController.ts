import {CreateLanguageReqBodyDTO} from './dto/CreateLanguageReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateLanguageDTO}
	from '@copor/core/domain/Components/Language/validations/dto/ValidateCreateLanguageDTO';
import {ValidateCreateLanguage} from '@copor/core/domain/Components/Language/validations/ValidateCreateLanguage';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {CreateLanguageInteractorRepoPicker} from './repo/repoPicker/CreateLanguageInteractorRepoPicker';
import {CreateLanguage} from '@copor/core/domain/Components/Language/interactor/CreateLanguage';
import {CreateLanguageLoggerRepoPicker} from './repo/repoPicker/CreateLanguageLoggerRepoPicker';
import {
	LogCreateLanguage,
	LogDataForCreateLanguage
} from '@copor/core/domain/Components/Language/logger/LogCreateLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateLanguageController extends CreateBaseController<CreateLanguageReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateLanguageDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateLanguage,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveLanguageDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateLanguageInteractorRepoPicker);

		return container.getInteractor(
			CreateLanguage,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateLanguageLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateLanguage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateLanguage {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
