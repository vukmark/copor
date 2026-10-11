import {UpdateChatReqBodyDTO} from './dto/UpdateChatReqBodyDTO';
import {UpdateChatValidatorStorageRepoPicker} from './repo/repoPicker/UpdateChatValidatorStorageRepoPicker';
import {UpdateChatInteractorRepoPicker} from './repo/repoPicker/UpdateChatInteractorRepoPicker';
import {UpdateChatLoggerRepoPicker} from './repo/repoPicker/UpdateChatLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateUpdateChat';
import {UpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/UpdateChat';
import {GetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatInfo';
import {LogDataForUpdateChat, LogUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogUpdateChat';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {GetChatInfoInteractorRepoPicker}
	from '@copor/vu_meet/client/VuMeet/Chat/GetChatInfo/repo/repoPicker/GetChatInfoInteractorRepoPicker';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export class UpdateChatController extends UpdateBaseController<UpdateChatReqBodyDTO> {
	async getResponse() {
		const container = this.container;
		const getChatInfoRepo = container.getNewRepoPicker(GetChatInfoInteractorRepoPicker);
		const existingChat = await container.getInteractor(GetChatInfo, getChatInfoRepo, this.request.body.id).execute();
		const existingMemberIds = existingChat.members.map((member) => member.id);

		const factory = container.getFactory(
			RunFactory,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const newMemberIds = this.request.body.userList.filter((memberId) => !existingMemberIds.includes(memberId));
		const removedMemberIds = existingMemberIds.filter((memberId) => !this.request.body.userList.includes(memberId));

		VuMeetWebSocket.sendChatListUpdatedNotification(newMemberIds, {chatId: this.request.body.id});
		VuMeetWebSocket.sendRemovedFromGroupChatNotification(removedMemberIds, {
			chatId: this.request.body.id,
			chatName: existingChat.name
		});

		this.response.status(200);
		this.response.send(response);
	}

	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateChatValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateChat,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateChat,
			this.container.getNewRepoPicker(UpdateChatInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateChatLoggerRepoPicker);
		const logData: LogDataForUpdateChat = {
			... this.request.body,
			chatId: this.request.body.id
		};

		return this.container.getLogger(
			LogUpdateChat,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveChatDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
