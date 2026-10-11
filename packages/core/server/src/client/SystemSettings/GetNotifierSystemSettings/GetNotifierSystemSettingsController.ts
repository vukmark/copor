import {LogGetNotifierSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetNotifierSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';

import {GetSystemSettingsFormController} from '@copor/core/client/SystemSettings/GetSystemSettingsFormController';
import {GetNotifierSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetNotifierSystemSettingsDTO';
import {
	ValidateGetSystemSettingsDTO
} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';
import {ValidateGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettings';
import {
	GetNotifierSystemSettingsFormPresenter
} from '@copor/core/client/SystemSettings/GetNotifierSystemSettings/GetNotifierSystemSettingsFormPresenter';
import {
	GetSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsInteractorRepoPicker';
import {
	GetSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsLoggerRepoPicker';

export class GetNotifierSystemSettingsController extends GetSystemSettingsFormController<GetNotifierSystemSettingsDTO> {
	protected getValidator() {
		const c = this.container;
		const actorId = this.actorId;
		const validatorInput: ValidateGetSystemSettingsDTO = {actorId};

		return c.getValidator(
			ValidateGetSystemSettings,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getLogger() {
		const loggerRepository = this.container.getNewRepoPicker(GetSystemSettingsLoggerRepoPicker);

		return this.container.getLogger(
			LogGetNotifierSystemSettings,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	protected getInteractor() {
		const interactorRepository = this.container.getNewRepoPicker(GetSystemSettingsInteractorRepoPicker<GetNotifierSystemSettingsDTO>);

		return this.container.getInteractor(
			GetSystemSettings,
			interactorRepository,
			SystemSettingsType.NOTIFIER
		);
	}

	protected getPresenter(response: GetNotifierSystemSettingsDTO): SystemSettingsFormPresenter<GetFormViewModel> {
		return this.container.getSystemSettingsPresenter(GetNotifierSystemSettingsFormPresenter, response);
	}
}
