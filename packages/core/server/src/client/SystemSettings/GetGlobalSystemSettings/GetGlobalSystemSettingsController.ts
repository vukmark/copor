import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {
	GetGlobalSystemSettingsFormPresenter
} from '@copor/core/client/SystemSettings/GetGlobalSystemSettings/GetGlobalSystemSettingsFormPresenter';
import {GetGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetGlobalSystemSettingsDTO';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';

import {GetSystemSettingsFormController} from '@copor/core/client/SystemSettings/GetSystemSettingsFormController';
import {
	GetSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsInteractorRepoPicker';
import {ValidateGetSystemSettingsDTO} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';
import {ValidateGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettings';
import {
	GetSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsLoggerRepoPicker';
import {LogGetGlobalSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetGlobalSystemSettings';

export class GetGlobalSystemSettingsController extends GetSystemSettingsFormController<GetGlobalSystemSettingsDTO> {
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
			LogGetGlobalSystemSettings,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	protected getInteractor() {
		const interactorRepository = this.container.getNewRepoPicker(GetSystemSettingsInteractorRepoPicker<GetGlobalSystemSettingsDTO>);

		return this.container.getInteractor(
			GetSystemSettings,
			interactorRepository,
			SystemSettingsType.GLOBAL
		);
	}

	protected getPresenter(response: GetGlobalSystemSettingsDTO): SystemSettingsFormPresenter<GetFormViewModel> {
		return this.container.getSystemSettingsPresenter(GetGlobalSystemSettingsFormPresenter, response);
	}
}
