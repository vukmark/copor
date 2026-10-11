import {LogGetWorkflowSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogGetWorkflowSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';

import {GetSystemSettingsFormController} from '@copor/core/client/SystemSettings/GetSystemSettingsFormController';
import {GetWorkflowSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetWorkflowSystemSettingsDTO';
import {
	ValidateGetSystemSettingsDTO
} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';
import {ValidateGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettings';
import {
	GetWorkflowSystemSettingsFormPresenter
} from '@copor/core/client/SystemSettings/GetWorkflowSystemSettings/GetWorkflowSystemSettingsFormPresenter';
import {
	GetSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsInteractorRepoPicker';
import {
	GetSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/repoPicker/GetSystemSettingsLoggerRepoPicker';

export class GetWorkflowSystemSettingsController extends GetSystemSettingsFormController<GetWorkflowSystemSettingsDTO> {
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
			LogGetWorkflowSystemSettings,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	protected getInteractor() {
		const interactorRepository = this.container.getNewRepoPicker(GetSystemSettingsInteractorRepoPicker<GetWorkflowSystemSettingsDTO>);

		return this.container.getInteractor(
			GetSystemSettings,
			interactorRepository,
			SystemSettingsType.WORKFLOW
		);
	}

	protected getPresenter(response: GetWorkflowSystemSettingsDTO): SystemSettingsFormPresenter<GetFormViewModel> {
		return this.container.getSystemSettingsPresenter(GetWorkflowSystemSettingsFormPresenter, response);
	}
}
