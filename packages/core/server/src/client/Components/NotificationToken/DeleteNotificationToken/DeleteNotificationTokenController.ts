import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteNotificationTokenValidatorStorageRepoPicker
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/repoPicker/DeleteNotificationTokenValidatorStorageRepoPicker';
import {
	ValidateDeleteNotificationTokenDTO
} from '@copor/core/domain/Components/NotificationToken/validations/dto/ValidateDeleteNotificationTokenDTO';
import {
	ValidateDeleteNotificationToken
} from '@copor/core/domain/Components/NotificationToken/validations/ValidateDeleteNotificationToken';
import {
	DeleteNotificationTokenInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/repoPicker/DeleteNotificationTokenInteractorRepoPicker';
import {DeleteNotificationToken} from '@copor/core/domain/Components/NotificationToken/interactor/DeleteNotificationToken';
import {
	DeleteNotificationTokenLoggerRepoPicker
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/repo/repoPicker/DeleteNotificationTokenLoggerRepoPicker';
import {LogDeleteNotificationToken} from '@copor/core/domain/Components/NotificationToken/logger/LogDeleteNotificationToken';

export interface DeleteNotificationTokenParams {
	token: string;
}

export class DeleteNotificationTokenController extends BaseController<void, void> {
	async getResponse() {
		const params = this.request.params as DeleteNotificationTokenParams;
		const id: string = params.token;

		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send();
	}

	private getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteNotificationTokenDTO = {
			token: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteNotificationToken,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteNotificationTokenValidatorStorageRepoPicker)
		);
	}

	private getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteNotificationTokenInteractorRepoPicker);

		return container.getInteractor(DeleteNotificationToken, repo, id);
	}

	private getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteNotificationToken,
			this.container.getNewRepoPicker(DeleteNotificationTokenLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{tokenId: id}
		);
	}
}
