import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetVuMeetFileValidatorStorageRepoPicker} from './repo/repoPicker/GetVuMeetFileValidatorStorageRepoPicker';
import {GetVuMeetFileInteractorRepoPicker} from './repo/repoPicker/GetVuMeetFileInteractorRepoPicker';
import {GetVuMeetFileLoggerRepoPicker} from './repo/repoPicker/GetVuMeetFileLoggerRepoPicker';
import {GetVuMeetFilePresenter} from './GetVuMeetFilePresenter';
import {GetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileDTO';
import {ValidateGetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateGetVuMeetFileDTO';
import {ValidateGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateGetVuMeetFile';
import {LogGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetVuMeetFile';
import {GetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/interactor/GetVuMeetFile';

export interface GetVuMeetFileParams {
	id: string;
}

export class GetVuMeetFileController extends BaseController<undefined, Buffer> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetVuMeetFileParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetVuMeetFileDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetVuMeetFilePresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.setHeader('Content-Disposition',
			`attachment; filename="${response.fileName}"`);
		this.response.send(presentedResponse.file);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetVuMeetFileDTO = {
			messageId: id,
			actorId: this.actorId
		};

		return c.getValidator(
			ValidateGetVuMeetFile,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetVuMeetFileValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetVuMeetFileLoggerRepoPicker);
		const logData = {
			messageId: id
		};

		return this.container.getLogger(
			LogGetVuMeetFile,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetVuMeetFileInteractorRepoPicker);

		return this.container.getInteractor(
			GetVuMeetFile,
			interactorRepository,
			{
				messageId: id,
				actorId: this.actorId
			}
		);
	}
}
