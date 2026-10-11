import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ValidateUpdateUserProfileImage} from '@copor/core/domain/User/validation/ValidateUpdateUserProfileImage';
import {ValidateUpdateUserProfileImageDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserProfileImageDTO';
import {
	UpdateUserProfileImageValidatorPermissionRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageValidatorPermissionRepoPicker';
import {
	UpdateUserProfileImageValidatorStorageRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageValidatorStorageRepoPicker';
import {DeleteUserProfileImage} from '@copor/core/domain/User/interactor/DeleteUserProfileImage';
import {
	DeleteUserProfileImageInteractorRepoPicker
} from '@copor/core/client/User/DeleteUserProfileImage/repo/repoPicker/DeleteUserProfileImageInteractorRepoPicker';
import {
	DeleteUserProfileImageLoggerRepoPicker
} from '@copor/core/client/User/DeleteUserProfileImage/repo/repoPicker/DeleteUserProfileImageLoggerRepoPicker';
import {
	LogDataForDeleteUserProfileImage,
	LogDeleteUserProfileImage
} from '@copor/core/domain/User/logger/LogDeleteUserProfileImage';

interface DeleteUserProfileImageParams {
	id?: string;
}

export class DeleteUserProfileImageController extends BaseController<void, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory,
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
		this.response.send(response);
	}

	private getUserId(): string {
		return (this.request.params as DeleteUserProfileImageParams).id ?? this.actorId;
	}

	private getValidator(): Validator {
		const validatorInput: ValidateUpdateUserProfileImageDTO = {
			actorId: this.actorId,
			userId: this.getUserId()
		};

		return this.container.getValidator(
			ValidateUpdateUserProfileImage,
			validatorInput,
			this.container.getNewRepoPicker(UpdateUserProfileImageValidatorPermissionRepoPicker),
			this.container.getNewRepoPicker(UpdateUserProfileImageValidatorStorageRepoPicker)
		);
	}

	private getInteractor() {
		const repo = this.container.getNewRepoPicker(DeleteUserProfileImageInteractorRepoPicker);

		return this.container.getInteractor(DeleteUserProfileImage, repo, this.getUserId());
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(DeleteUserProfileImageLoggerRepoPicker);
		const logData: LogDataForDeleteUserProfileImage = {
			userId: this.getUserId()
		};

		return this.container.getLogger(
			LogDeleteUserProfileImage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
