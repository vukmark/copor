import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetChatInfoViewModel} from './GetChatInfoViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetChatInfoValidatorStorageRepoPicker} from './repo/repoPicker/GetChatInfoValidatorStorageRepoPicker';
import {GetChatInfoInteractorRepoPicker} from './repo/repoPicker/GetChatInfoInteractorRepoPicker';
import {GetChatInfoLoggerRepoPicker} from './repo/repoPicker/GetChatInfoLoggerRepoPicker';
import {GetChatInfoPresenter} from './GetChatInfoPresenter';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {ValidateGetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateGetChatInfoDTO';
import {ValidateGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateGetChatInfo';
import {LogGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatInfo';
import {GetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatInfo';

export interface GetChatInfoParams {
	id: string;
}

export class GetChatInfoController extends BaseController<undefined, GetChatInfoViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetChatInfoParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetChatInfoDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		//TODO: (Dusan Borovnica) this.container.appContext has to be passed, if not, presenter doesn't have context. why is that?
		const presenter = this.container.getPresenter(GetChatInfoPresenter, response, this.container.appContext);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetChatInfoDTO = {
			actorId: this.actorId,
			chatId: id
		};

		return c.getValidator(
			ValidateGetChatInfo,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetChatInfoValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetChatInfoLoggerRepoPicker);
		const logData = {
			chatId: id
		};

		return this.container.getLogger(
			LogGetChatInfo,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetChatInfoInteractorRepoPicker);

		return this.container.getInteractor(
			GetChatInfo,
			interactorRepository,
			id
		);
	}
}
