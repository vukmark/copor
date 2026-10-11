import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {MarkChatMessagesSeenValidatorStorageRepoPicker}
	from './repo/repoPicker/MarkChatMessagesSeenValidatorStorageRepoPicker';
import {MarkChatMessagesSeenInteractorRepoPicker}
	from './repo/repoPicker/MarkChatMessagesSeenInteractorRepoPicker';
import {MarkChatMessagesSeenLoggerRepoPicker}
	from './repo/repoPicker/MarkChatMessagesSeenLoggerRepoPicker';
import {ValidateMarkChatMessagesSeenDTO}
	from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenDTO';
import {ValidateMarkChatMessagesSeen}
	from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateMarkChatMessagesSeen';
import {LogMarkChatMessagesSeen}
	from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogMarkChatMessagesSeen';
import {MarkChatMessagesSeen}
	from '@copor/vu_meet/domain/VuMeet/Chat/interactor/MarkChatMessagesSeen';
import {MarkChatMessagesSeenDTO}
	from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/MarkChatMessagesSeenDTO';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export interface MarkChatMessagesSeenParams {
	chatId: string;
}

export class MarkChatMessagesSeenController extends BaseController<undefined, void> {
	async getResponse(): Promise<void> {
		const params = this.request.params as MarkChatMessagesSeenParams;
		const chatId: string = params.chatId;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(actorId, chatId),
			this.getInteractor(actorId, chatId),
			this.getLogger(actorId, chatId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		await VuMeetWebSocket.sendNumberOfUnreadMessages(this.actorId, this.container.appContext);
		this.response.status(200);
		this.response.send(response);
	}

	private getValidator(actorId: string, chatId: string) {
		const c = this.container;
		const validatorInput: ValidateMarkChatMessagesSeenDTO = {userId: actorId, chatId: chatId};

		return c.getValidator(
			ValidateMarkChatMessagesSeen,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(MarkChatMessagesSeenValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, chatId: string) {
		const loggerRepository = this.container.getNewRepoPicker(MarkChatMessagesSeenLoggerRepoPicker);
		const logData = {
			chatId: chatId
		};

		return this.container.getLogger(
			LogMarkChatMessagesSeen,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(actorId: string, chatId: string) {
		const interactorRepository = this.container.getNewRepoPicker(MarkChatMessagesSeenInteractorRepoPicker);
		const input: MarkChatMessagesSeenDTO = {
			chatId: chatId,
			userId: actorId
		};

		return this.container.getInteractor(
			MarkChatMessagesSeen,
			interactorRepository,
			input
		);
	}
}
