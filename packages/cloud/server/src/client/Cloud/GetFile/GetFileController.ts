import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetFileValidatorStorageRepoPicker} from './repo/repoPicker/GetFileValidatorStorageRepoPicker';
import {GetFileInteractorRepoPicker} from './repo/repoPicker/GetFileInteractorRepoPicker';
import {GetFileLoggerRepoPicker} from './repo/repoPicker/GetFileLoggerRepoPicker';
import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';
import {ValidateGetFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateGetFileDTO';
import {ValidateGetFile} from '@copor/cloud/domain/Cloud/validation/ValidateGetFile';
import {LogGetFile} from '@copor/cloud/domain/Cloud/logger/LogGetFile';
import {GetFile} from '@copor/cloud/domain/Cloud/interactor/GetFile';
import {
	GetFileValidatorPermissionRepoPicker
} from '@copor/cloud/client/Cloud/GetFile/repo/repoPicker/GetFileValidatorPermissionRepoPicker';

export interface GetFileParams {
	id: string;
}

export class GetFileController extends BaseController<undefined, Buffer> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetFileParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetFileDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.setHeader('Content-Disposition',
			`attachment; filename="${response.fileName}"`);
		this.response.send(response.file);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetFileDTO = {
			fileId: id,
			actorId: actorId
		};

		return c.getValidator(
			ValidateGetFile,
			validatorInput,
			c.getNewRepoPicker(GetFileValidatorPermissionRepoPicker),
			c.getNewRepoPicker(GetFileValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetFileLoggerRepoPicker);
		const logData = {
			fileId: id
		};

		return this.container.getLogger(
			LogGetFile,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetFileInteractorRepoPicker);

		return this.container.getInteractor(
			GetFile,
			interactorRepository,
			id
		);
	}
}
