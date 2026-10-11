import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	UpdateUserProfileImageValidatorStorageRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageValidatorStorageRepoPicker';
import {
	UpdateUserProfileImageLoggerRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageLoggerRepoPicker';
import {
	UpdateUserProfileImageInteractorRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageInteractorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	UpdateUserProfileImageValidatorPermissionRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageValidatorPermissionRepoPicker';
import {ValidateUpdateUserProfileImage} from '@copor/core/domain/User/validation/ValidateUpdateUserProfileImage';
import {ValidateUpdateUserProfileImageDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserProfileImageDTO';
import {UpdateUserProfileImage} from '@copor/core/domain/User/interactor/UpdateUserProfileImage';
import {SaveUserProfileImageDTO} from '@copor/core/domain/User/interactor/dto/SaveUserProfileImageDTO';
import {
	LogDataForUpdateUserProfileImage,
	LogUpdateUserProfileImage
} from '@copor/core/domain/User/logger/LogUpdateUserProfileImage';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {
	UpdateUserProfileImageReqBodyDTO
} from '@copor/core/client/User/UpdateUserProfileImage/dto/UpdateUserProfileImageReqBodyDTO';

interface UpdateUserProfileImageParams {
	id?: string;
}

export class UpdateUserProfileImageController extends BaseController<UpdateUserProfileImageReqBodyDTO, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(),
			await this.getInteractor(),
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
		return (this.request.params as UpdateUserProfileImageParams).id ?? this.request.body.userId;
	}

	private getValidator(): Validator {
		const validatorInput: ValidateUpdateUserProfileImageDTO = {
			actorId: this.actorId,
			userId: this.getUserId()
		};

		return this.container.getValidator(
			//ValidateUpdateUserAccountInformation
			ValidateUpdateUserProfileImage,
			validatorInput,
			this.container.getNewRepoPicker(UpdateUserProfileImageValidatorPermissionRepoPicker),
			this.container.getNewRepoPicker(UpdateUserProfileImageValidatorStorageRepoPicker)
		);
	}

	private async getInteractor() {
		return this.container.getInteractor(
			UpdateUserProfileImage,
			this.container.getNewRepoPicker(UpdateUserProfileImageInteractorRepoPicker),
			await this.getInteractorInput()
		);
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateUserProfileImageLoggerRepoPicker);
		const logData: LogDataForUpdateUserProfileImage = {
			userId: this.getUserId()
		};

		return this.container.getLogger(
			LogUpdateUserProfileImage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private async getInteractorInput(): Promise<SaveUserProfileImageDTO> {
		return {
			userId: this.getUserId(),
			image: this.request.file!.buffer,
			newImageId: await this.getUniqueId()
		};
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}
}
