import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {MarkAllNotificationsAsReadInteractorRepoPicker} from './repoPicker/MarkAllNotificationsAsReadInteractorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {MarkAllNotificationsAsReadLoggerRepoPicker} from './repoPicker/GetNotificationListLoggerRepoPicker';
import {ValidateMarkAllNotificationsAsRead}
	from '@copor/core/domain/Components/Notification/validations/ValidateMarkAllNotificationsAsRead';
import {LogMarkAllNotificationsAsRead}
	from '@copor/core/domain/Components/Notification/logger/LogMarkAllNotificationsAsRead';
import {MarkAllNotificationsAsRead}
	from '@copor/core/domain/Components/Notification/interactor/MarkAllNotificationsAsRead';

export class MarkAllNotificationsAsReadController extends BaseController<void, void> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<void>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send();
	}

	private getValidator():Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = {
			userId: this.actorId
		};

		return container.getValidator(
			ValidateMarkAllNotificationsAsRead,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(MarkAllNotificationsAsReadLoggerRepoPicker);

		return container.getLogger(LogMarkAllNotificationsAsRead, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(MarkAllNotificationsAsReadInteractorRepoPicker);

		return container.getInteractor(MarkAllNotificationsAsRead, interactorRepo, this.actorId);
	}
}