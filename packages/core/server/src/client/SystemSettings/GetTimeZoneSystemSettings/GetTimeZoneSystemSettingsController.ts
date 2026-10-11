import {LogGetTimeZoneSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetTimeZoneSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';

import {GetSystemSettingsFormController} from '@copor/core/client/SystemSettings/GetSystemSettingsFormController';
import {GetTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetTimeZoneSystemSettingsDTO';
import {
	ValidateGetSystemSettingsDTO
} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';
import {ValidateGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettings';
import {
	GetTimeZoneSystemSettingsFormPresenter
} from '@copor/core/client/SystemSettings/GetTimeZoneSystemSettings/GetTimeZoneSystemSettingsFormPresenter';
import {
	GetSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsInteractorRepoPicker';
import {
	GetSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsLoggerRepoPicker';

export class GetTimeZoneSystemSettingsController extends GetSystemSettingsFormController<GetTimeZoneSystemSettingsDTO> {
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
			LogGetTimeZoneSystemSettings,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	protected getInteractor() {
		const interactorRepository = this.container.getNewRepoPicker(GetSystemSettingsInteractorRepoPicker<GetTimeZoneSystemSettingsDTO>);

		return this.container.getInteractor(
			GetSystemSettings,
			interactorRepository,
			SystemSettingsType.TIME_ZONE
		);
	}

	protected getPresenter(response: GetTimeZoneSystemSettingsDTO): SystemSettingsFormPresenter<GetFormViewModel> {
		return this.container.getSystemSettingsPresenter(GetTimeZoneSystemSettingsFormPresenter, response);
	}
}
