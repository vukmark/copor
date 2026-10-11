import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetUserChatListInteractorRepoPicker} from './repo/repoPicker/GetUserChatListInteractorRepoPicker';
import {GetUserChatListLoggerRepoPicker} from './repo/repoPicker/GetUserChatListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatDTO';
import {ValidateGetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateGetUserChatList';
import {GetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetUserChatList';
import {LogGetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogGetUserChatList';
import {GetUserChatListPresenter} from '@copor/vu_meet/client/VuMeet/Core/GetUserChatList/GetUserChatListPresenter';

export interface GetUserChatViewModel {
	id: string;
	name: string;
	picture?: string;
	lastMessage: string;
	numberOfUnseenMessages: number;
	createdAt: string;
	isPrivate: boolean;
	isActive?: boolean;
	otherUserId?: string;
}
export interface GetUserChatListParams {
	prompt: string;
}

export class GetUserChatListController extends BaseController<void, GetUserChatViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetUserChatListParams;

		if (!params.prompt)
			params.prompt = '';
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetUserChatDTO[]>,
			this.getValidator(),
			this.getInteractor(params.prompt),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.container.getPresenter(GetUserChatListPresenter, response, this.container.appContext);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetUserChatList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(prompt: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserChatListInteractorRepoPicker);

		return container.getInteractor(GetUserChatList, interactorRepo, {
			userId: this.actorId,
			prompt: prompt
		});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserChatListLoggerRepoPicker);

		return container.getLogger(LogGetUserChatList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
