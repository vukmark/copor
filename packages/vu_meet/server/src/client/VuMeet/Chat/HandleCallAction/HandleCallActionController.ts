import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	HandleCallActionReqBodyDTO
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/HandleCallActionReqBodyDTO';
import {
	GetOtherParticipantsInChatRepoPicker
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/repoPicker/GetOtherParticipantsInChatRepoPicker';
import {
	GetVuMeetUserInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/repoPicker/GetVuMeetUserInteractorRepoPicker';
import {GetVuMeetUser} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetVuMeetUser';
import {
	HandleCallActionValidatorStorageRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/repoPicker/HandleCallActionValidatorStorageRepoPicker';
import {ValidateStartPrivateCall} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateStartPrivateCall';
import {ValidateStartGroupCall} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateStartGroupCall';
import {
	StartGroupCallValidatorStorageRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/StartGroupCall/repo/repoPicker/StartGroupCallValidatorStorageRepoPicker';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {
	GetNotificationTokenListInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {VuMeetCallPushNotification, SendVuMeetCallPushNotificationDTO, SendVuMeetDeclineCallNotificationDTO} from '@copor/vu_meet/client/VuMeet/Core/Call/VuMeetCallPushNotification';
import {CallType} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallType';
import {CallAction} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallAction';
import {
	CreateMessageInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/repoPicker/CreateMessageInteractorRepoPicker';
import {CreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/interactor/CreateMessage';
import {SaveMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {GetVuMeetUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetVuMeetUserDTO';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {GetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatInfo';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {
	GetChatInfoInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/GetChatInfo/repo/repoPicker/GetChatInfoInteractorRepoPicker';
import {callRosterRegistry, rosterToDTO} from '@copor/vu_meet/client/VuMeet/Core/CallRoster/CallRosterRegistry';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';


export class HandleCallActionController extends BaseController<HandleCallActionReqBodyDTO, void> {
	public async getResponse(): Promise<void> {
		const chatInfo = await this.getChatInfo();
		const validationResult = await this.validateRequest(chatInfo.isPrivate);

		if (validationResult instanceof ErrorList) {
			this.next(validationResult);
			return;
		}

		const otherUsersInChat = await this.getOtherUsersInChat();
		const getVuMeetUserRepo = this.container.getNewRepoPicker(GetVuMeetUserInteractorRepoPicker);
		const tokenList = await this.getTokenList(otherUsersInChat);
		const senderData = await this.container.getInteractor(GetVuMeetUser, getVuMeetUserRepo, this.actorId).execute();
		const notificationData = this.getNotificationData(senderData, chatInfo);

		await VuMeetCallPushNotification.send(tokenList, notificationData);
		VuMeetWebSocket.sendVuMeetCallNotification(otherUsersInChat, chatInfo.isPrivate, notificationData);
		if (this.request.body.action !== CallAction.START_CALL) {
			await this.sendMessage(otherUsersInChat);
			await VuMeetWebSocket.sendNewMessageNotification(otherUsersInChat, this.container.appContext);
		}

		if (!chatInfo.isPrivate) {
			this.updateGroupCallRoster(otherUsersInChat);
		}

		this.response.status(200);
		this.response.send();
	}

	// Group calls have no per-participant delivery of their own — this is the one
	// place every group member's join/leave/no-answer transition passes through, so
	// the roster (and its broadcast to everyone viewing the chat, not just other
	// participants) is updated here rather than in a separate group-call code path.
	private updateGroupCallRoster(otherUsersInChat: string[]) {
		const chatId = this.request.body.chatId;
		const memberIds = [this.actorId, ...otherUsersInChat];
		const entry = (() => {
			switch (this.request.body.action) {
				case CallAction.START_CALL :
					return callRosterRegistry.startCall(chatId, this.actorId, memberIds);
				case CallAction.CALL_ACCEPTED :
					return callRosterRegistry.markJoined(chatId, this.actorId);
				case CallAction.TIMEOUT_CALL :
					return callRosterRegistry.markAllRingingAsNoAnswer(chatId);
				case CallAction.END_CALL :
					return callRosterRegistry.markLeft(chatId, this.actorId);
				default :
					return undefined;
			}
		})();

		if (entry) {
			VuMeetWebSocket.sendGroupCallRosterUpdate(memberIds, rosterToDTO(entry));
		}
	}

	private async getOtherUsersInChat() : Promise<string[]> {
		const getOtherParticipantsInChatRepo = new GetOtherParticipantsInChatRepoPicker(this.container.appContext).getRepository();

		return await getOtherParticipantsInChatRepo.load(this.actorId, this.request.body.chatId);
	}

	private async getChatInfo(): Promise<GetChatInfoDTO> {
		const chatInfoRepo = this.container.getNewRepoPicker(GetChatInfoInteractorRepoPicker);

		return await this.container.getInteractor(GetChatInfo, chatInfoRepo, this.request.body.chatId).execute();
	}

	// For a group chat, the notification should identify the group being called
	// rather than whichever member happens to be the one who triggered this
	// action (e.g. the callee accepting shouldn't make the caller's own device
	// think the callee's name is the group name).
	private getNotificationData(
		senderData: GetVuMeetUserDTO, chatInfo: GetChatInfoDTO
	) : SendVuMeetCallPushNotificationDTO | SendVuMeetDeclineCallNotificationDTO {
		const callerName = chatInfo.isPrivate
			? senderData.firstName + ' ' + senderData.lastName
			: chatInfo.name;
		const avatar = chatInfo.isPrivate
			? ImageHelper.getProfileImageOrInitialsAvatarUrl(
				senderData.imageName, senderData.imageExtension,
				senderData.firstName + ' ' + senderData.lastName, this.container.appContext
			)
			: ImageHelper.getProfileImageOrInitialsAvatarUrl(
				chatInfo.chatPicture ?? undefined, chatInfo.chatPictureExtension ?? undefined,
				chatInfo.name, this.container.appContext
			);

		return {
			chatId: this.request.body.chatId,
			type: this.getType(),
			callerName,
			hasVideo: (this.request.body.type === CallType.VIDEO).toString(),
			avatar,
			durationSeconds: this.request.body.durationSeconds?.toString() ?? ''
		};
	}

	private getType(): string {
		switch (this.request.body.action) {
			case CallAction.START_CALL :
				return 'incoming_call';
			case CallAction.CALL_ACCEPTED :
				return 'call_accepted';
			case CallAction.END_CALL :
				return 'end_call';
			case CallAction.TIMEOUT_CALL :
				return 'timeout_call';
			default :
				return 'unknown';
		}
	}

	private async validateRequest(isPrivate: boolean) {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);

		if (!isPrivate) {
			const groupValidatorStorageRepo = this.container.getNewRepoPicker(StartGroupCallValidatorStorageRepoPicker);
			const groupValidator = new ValidateStartGroupCall(
				{actorId: this.actorId, chatId: this.request.body.chatId},
				validatorPermissionRepo,
				groupValidatorStorageRepo);

			return await groupValidator.validate();
		}

		const validatorStorageRepo = this.container.getNewRepoPicker(HandleCallActionValidatorStorageRepoPicker);
		const validator = new ValidateStartPrivateCall(
			{actorId: this.actorId, chatId: this.request.body.chatId},
			validatorPermissionRepo,
			validatorStorageRepo);

		return await validator.validate();
	}
	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}
	private async getTokenList(otherParticipant: string[]): Promise<GetNotificationTokenDTO[]> {
		const getNotificationTokenListRepo = this.container.getNewRepoPicker(GetNotificationTokenListInteractorRepoPicker);
		const getNotificationTokenListInteractor
			= new GetNotificationTokenList(otherParticipant, getNotificationTokenListRepo);

		return await getNotificationTokenListInteractor.execute();
	}
	private async sendMessage(otherUsersInChat: string[]) {
		const messageRepo = this.container.getNewRepoPicker(CreateMessageInteractorRepoPicker);
		// CALL_ACCEPTED is fired by the callee, so "the other participant" is the caller.
		// TIMEOUT_CALL is fired by the caller, so "the other participant" is the callee.
		// Attributing the message to that other participant lets the feed show the right
		// name to each viewer via isOwn, without needing a separate caller/callee field.
		const attributeToOtherParticipant = this.request.body.action === CallAction.CALL_ACCEPTED
			|| this.request.body.action === CallAction.TIMEOUT_CALL;
		const inputDTO: SaveMessageDTO = {
			id: await this.getUniqueId(),
			content: this.request.body.action,
			type: MessageContentType.CALL_EVENT,
			sender: attributeToOtherParticipant ? otherUsersInChat[0] : this.actorId,
			chat: this.request.body.chatId
		};
		const interactor = this.container.getInteractor(CreateMessage, messageRepo, inputDTO);

		await interactor.execute();
	}
}