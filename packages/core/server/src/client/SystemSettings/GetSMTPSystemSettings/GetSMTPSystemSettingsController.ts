import {GetSMTPSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {LogGetSMTPSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetSMTPSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetSMTPSystemSettingsFormPresenter
} from '@copor/core/client/SystemSettings/GetSMTPSystemSettings/GetSMTPSystemSettingsFormPresenter';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormController} from '@copor/core/client/SystemSettings/GetSystemSettingsFormController';
import {
	GetSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsInteractorRepoPicker';
import {ValidateGetSystemSettingsDTO} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';
import {ValidateGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettings';
import {
	GetSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsLoggerRepoPicker';

export class GetSMTPSystemSettingsController extends GetSystemSettingsFormController<GetSMTPSystemSettingsDTO> {
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
			LogGetSMTPSystemSettings,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	protected getInteractor() {
		const interactorRepository = this.container.getNewRepoPicker(GetSystemSettingsInteractorRepoPicker<GetSMTPSystemSettingsDTO>);

		return this.container.getInteractor(
			GetSystemSettings,
			interactorRepository,
			SystemSettingsType.SMTP
		);
	}

	protected getPresenter(response: GetSMTPSystemSettingsDTO): SystemSettingsFormPresenter<GetFormViewModel> {
		return this.container.getSystemSettingsPresenter(GetSMTPSystemSettingsFormPresenter, response);
	}
}
