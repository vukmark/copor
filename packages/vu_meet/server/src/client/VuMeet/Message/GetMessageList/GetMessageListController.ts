import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetMessageListInteractorRepoPicker} from './repo/repoPicker/GetMessageListInteractorRepoPicker';
import {GetMessageListLoggerRepoPicker} from './repo/repoPicker/GetMessageListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageDTO';
import {ValidateGetMessageList} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateGetMessageList';
import {GetMessageList} from '@copor/vu_meet/domain/VuMeet/Message/interactor/GetMessageList';
import {LogGetMessageList} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetMessageList';
import {
	GetMessageListValidatorStorageRepoPicker
} from './repo/repoPicker/GetMessageListValidatorStorageRepoPicker';
import {GetMessageInputDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageInputDTO';
import {
	GetMessageListPresenter
} from '@copor/vu_meet/client/VuMeet/Message/GetMessageList/GetMessageListPresenter';
import {
	MarkChatMessagesSeenInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/MarkChatMessagesSeen/repo/repoPicker/MarkChatMessagesSeenInteractorRepoPicker';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface GetMessageViewModel {
	id: string;
	messageContent: string;
	senderPicture?: string;
	senderName: string;
	isOwn: boolean;
	isSeen: boolean;
	isPrivate: boolean;
	senderId: string;
	dateCreated: string;
	timeCreated: string;
	createdAt: string;
	isLastFromUser: boolean;
	isFirstFromUser: boolean;
	messageStatus: string;
	isSending: boolean;
	type: MessageContentType;
}

interface GetMessageListParams {
	chatId: string;
	beforeDate: string;
	afterDate: string;
}

export class GetMessageListController extends BaseController<GetMessageListParams, GetMessageViewModel[]> {
	async getResponse() {
		const container = this.container;
		const params = this.request.body;

		const factory = container.getFactory(
			RunFactory<GetMessageDTO[]>,
			this.getValidator(params.chatId),
			this.getInteractor(params.chatId, params.beforeDate, params.afterDate),
			this.getLogger(params.chatId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = new GetMessageListPresenter(response, this.actorId, this.container.appContext);
		const presentedResponse = presenter.present();


		const markSeenRepo = this.container.getNewRepoPicker(MarkChatMessagesSeenInteractorRepoPicker);

		await markSeenRepo.markChatMessagesRead(params.chatId, this.actorId);

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(chatId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetMessageListValidatorStorageRepoPicker);
		const validatorInput = {
			userId: this.actorId,
			chatId: chatId
		};

		return container.getValidator(
			ValidateGetMessageList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(chatId: string, beforeDate: string, afterDate: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetMessageListInteractorRepoPicker);
		const input: GetMessageInputDTO = {
			chatId: chatId,
			beforeDate: beforeDate,
			afterDate: afterDate,
			actorId: this.actorId
		};

		return container.getInteractor(GetMessageList, interactorRepo, input);
	}
	private getLogger(chatId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetMessageListLoggerRepoPicker);

		return container.getLogger(LogGetMessageList, loggerRepo, new CreateLogDetails(this.actorId), {chatId: chatId});
	}
}
