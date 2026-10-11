import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetSystemSettingsList} from '@copor/core/domain/SystemSettings/validation/ValidateGetSystemSettingsList';
import {GetSystemSettingsListInteractorRepoPicker} from './repo/repoPicker/GetSystemSettingsListInteractorRepoPicker';
import {GetSystemSettingsList} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettingsList';
import {GetSystemSettingsListLoggerRepoPicker} from './repo/repoPicker/GetSystemSettingsListLoggerRepoPicker';
import {LogGetSystemSettingsList} from '@copor/core/domain/SystemSettings/logger/LogGetSystemSettingsList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SystemSettingsListDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {
	GetSystemSettingsListPresenter
} from '@copor/core/client/SystemSettings/GetSystemSettingsList/GetSystemSettingsListPresenter';
import {TableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetSystemSettingsListController extends BaseController<void, TableModelDTO> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<SystemSettingsListDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetSystemSettingsListPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetSystemSettingsList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetSystemSettingsListInteractorRepoPicker);

		return container.getInteractor(GetSystemSettingsList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetSystemSettingsListLoggerRepoPicker);

		return container.getLogger(LogGetSystemSettingsList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
