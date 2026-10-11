import {BaseController} from '@copor/core/client/Core/BaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';
import {CreateImageInteractorRepoPicker} from './repo/repoPicker/CreateImageInteractorRepoPicker';
import {CreateImage} from '@copor/core/domain/Components/Image/interactor/CreateImage';
import {CreateImageLoggerRepoPicker} from './repo/repoPicker/CreateImageLoggerRepoPicker';
import {
	LogCreateImage,
	LogDataForCreateImage
} from '@copor/core/domain/Components/Image/logger/LogCreateImage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {ValidateCreateImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateCreateImageDTO';
import {ValidateCreateImage} from '@copor/core/domain/Components/Image/validation/ValidateCreateImage';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import path from 'node:path';

export class CreateImageController extends BaseController<undefined, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId),
			await this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateImageDTO = {
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateImage,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveImageDTO = {
			name: path.parse(this.request.file!.originalname).name,
			image: this.request.file!.buffer,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateImageInteractorRepoPicker);

		return container.getInteractor(
			CreateImage,
			interactorRepo,
			interactorInput
		);
	}

	private async getLogger(uniqueId: string) : Promise<LogAction> {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateImageLoggerRepoPicker);
		const logData = await this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateImage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private async getLogData(uniqueId: string): Promise<LogDataForCreateImage> {
		const metadata = await ImageHelper.getImageMetadata(this.request.file!.buffer);

		return {
			... metadata,
			name: path.parse(this.request.file!.originalname).name,
			id: uniqueId
		};
	}
}
