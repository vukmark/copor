import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateFileValidatorStorageRepoPicker
} from '@copor/cloud/client/Cloud/CreateFile/repo/repoPicker/CreateFileValidatorStorageRepoPicker';

import {CreateFileInteractorRepoPicker} from '@copor/cloud/client/Cloud/CreateFile/repo/repoPicker/CreateFileInteractorRepoPicker';
import {CreateFileLoggerRepoPicker} from '@copor/cloud/client/Cloud/CreateFile/repo/repoPicker/CreateFileLoggerRepoPicker';
import {ValidateCreateFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateCreateFileDTO';
import {ValidateCreateFile} from '@copor/cloud/domain/Cloud/validation/ValidateCreateFile';
import {SaveFileDTO, SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {CreateFile} from '@copor/cloud/domain/Cloud/interactor/CreateFile';
import {LogCreateFile, LogDataForCreateFile} from '@copor/cloud/domain/Cloud/logger/LogCreateFile';
import {CloudFileHelper} from '@copor/cloud/client/Cloud/CloudFileHelper';
import {CloudNotificationHelper} from '@copor/cloud/client/Cloud/Notification/CloudNotificationHelper';
import {CloudFileUploadFields} from '@copor/cloud/client/Cloud/CreateFile/CloudFileUploadFields';

/**
 * Handles `POST /cloud/PUBLIC/*` (upload into the actor's own Public folder)
 * and `POST /cloud/PUBLIC/USER/:userId/*` (upload into another user's Public
 * folder). Both save a `PUBLIC` file with `sharingParticipants.userId` set to
 * the folder owner. When `:userId` is absent it defaults to the actor.
 */
export class CreatePublicFileController extends BaseController<undefined, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();

		if (!this.request.file)
			throw new Error('File is required');

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId),
			this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		try {
			await CloudFileHelper.saveFile(this.request.file, {fileId: uniqueId});
		} catch (e) {
			this.next(e);
			return;
		}

		if (CloudFileUploadFields.notifyReceivers(this.request))
			await CloudNotificationHelper.send(this.container, uniqueId, this.actorId);

		this.response.status(200);
		this.response.send(response);
	}

	private getTargetUserId(): string {
		const params = this.request.params as Record<string, string>;

		return params.userId || this.actorId;
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateFileValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateFileDTO = {
			actorId: this.actorId,
			buffer: this.request.file!.buffer,
			sharingType: SharingType.PUBLIC,
			sharingParticipants: {
				userId: this.getTargetUserId()
			}
		};

		return container.getValidator(
			ValidateCreateFile,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const path = (this.request.params as Record<string, string>)[0] || '';

		const interactorInput: SaveFileDTO = {
			id: uniqueId,
			name: this.request.file!.originalname,
			description: CloudFileUploadFields.description(this.request),
			actorId: this.actorId,
			path: path,
			buffer: this.request.file!.buffer,
			sharingType: SharingType.PUBLIC,
			sharingParticipants: {
				userId: this.getTargetUserId()
			}
		};
		const interactorRepo = container.getNewRepoPicker(CreateFileInteractorRepoPicker);

		return container.getInteractor(
			CreateFile,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateFileLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateFile,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateFile {
		return {
			fileId: uniqueId
		};
	}
}
