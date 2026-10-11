import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	UpdateUserProfileImageInteractorRepoPicker
} from '@copor/core/client/User/UpdateUserProfileImage/repo/repoPicker/UpdateUserProfileImageInteractorRepoPicker';
import {
	UpdatePersonalProfileImageLoggerRepoPicker
} from './repo/repoPicker/UpdatePersonalProfileImageLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdatePersonalProfileImage} from '@copor/core/domain/User/validation/ValidateUpdatePersonalProfileImage';
import {UpdateUserProfileImage} from '@copor/core/domain/User/interactor/UpdateUserProfileImage';
import {
	LogDataForUpdatePersonalProfileImage,
	LogUpdatePersonalProfileImage
} from '@copor/core/domain/User/logger/LogUpdatePersonalProfileImage';
import {ValidateUpdatePersonalProfileImageDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdatePersonalProfileImageDTO';
import {SaveUserProfileImageDTO} from '@copor/core/domain/User/interactor/dto/SaveUserProfileImageDTO';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';

export class UpdatePersonalProfileImageController extends BaseController<undefined, void> {
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

	private getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);

		return this.container.getValidator(
			ValidateUpdatePersonalProfileImage,
			this.getValidatorInput(),
			validatorPermissionRepo,
			undefined
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
		const loggerRepo = this.container.getNewRepoPicker(UpdatePersonalProfileImageLoggerRepoPicker);
		const logData: LogDataForUpdatePersonalProfileImage = {
			userId: this.actorId
		};

		return this.container.getLogger(
			LogUpdatePersonalProfileImage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): ValidateUpdatePersonalProfileImageDTO {
		return {
			actorId: this.actorId
		};
	}

	private async getInteractorInput(): Promise<SaveUserProfileImageDTO> {
		return {
			userId: this.actorId,
			image: this.request.file!.buffer,
			newImageId: await this.getUniqueId()
		};
	}
	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}
}
