import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	GetOtherParticipantsInChatRepoPicker
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/repoPicker/GetOtherParticipantsInChatRepoPicker';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {
	GetNotificationTokenListInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {VuMeetCallPushNotification, SendVuMeetDeclineCallNotificationDTO, SendVuMeetTerminateCalling} from '@copor/vu_meet/client/VuMeet/Core/Call/VuMeetCallPushNotification';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {DeclineCallReqBodyDTO} from '@copor/vu_meet/client/VuMeet/Chat/DeclineCall/dto/DeclineCallReqBodyDTO';
import {
	CreateMessageInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/repoPicker/CreateMessageInteractorRepoPicker';
import {SaveMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {CreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/interactor/CreateMessage';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {CallAction} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallAction';
import {
	GetVuMeetUserInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/repoPicker/GetVuMeetUserInteractorRepoPicker';
import {GetVuMeetUser} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetVuMeetUser';
import {GetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatInfo';
import {
	GetChatInfoInteractorRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/GetChatInfo/repo/repoPicker/GetChatInfoInteractorRepoPicker';
import {callRosterRegistry, RosterEntry, RosterParticipantStatus, rosterToDTO} from '@copor/vu_meet/client/VuMeet/Core/CallRoster/CallRosterRegistry';
import {ValidateStartPrivateCall} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateStartPrivateCall';
import {ValidateStartGroupCall} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateStartGroupCall';
import {
	StartGroupCallValidatorStorageRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/StartGroupCall/repo/repoPicker/StartGroupCallValidatorStorageRepoPicker';
import {
	HandleCallActionValidatorStorageRepoPicker
} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/repo/repoPicker/HandleCallActionValidatorStorageRepoPicker';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';


export class DeclineCallController extends BaseController<DeclineCallReqBodyDTO, void> {
	public async getResponse(): Promise<void> {
		const chatInfoRepo = this.container.getNewRepoPicker(GetChatInfoInteractorRepoPicker);
		const chatInfo = await this.container.getInteractor(GetChatInfo, chatInfoRepo, this.request.body.chatId).execute();

		const validationResult = await this.validateRequest(chatInfo.isPrivate);

		if (validationResult instanceof ErrorList) {
			this.next(validationResult);
			return;
		}

		const otherUsersInChat = await this.getOtherUsersInChat();
		const tokenList = await this.getTokenList(otherUsersInChat);
		const declinerName = await this.getDeclinerName();

		// Group calls: CallRosterRegistry is the authoritative, server-side source of
		// truth for who's still ringing/joined vs. declined/left/no-answer. Marking the
		// decline here (before deciding decline-vs-terminate) avoids the race the old
		// client-echoed `numberOfDeclinedCalls` counter had, where two participants
		// declining at the same moment could both read the same stale count.
		const rosterEntry = chatInfo.isPrivate
			? undefined
			: callRosterRegistry.markDeclined(this.request.body.chatId, this.actorId);
		const notificationData = this.getNotificationData(chatInfo.isPrivate, rosterEntry, declinerName);

		await VuMeetCallPushNotification.send(tokenList, notificationData);
		VuMeetWebSocket.sendVuMeetCallNotification(otherUsersInChat, chatInfo.isPrivate, notificationData);
		await this.saveVuMeetMessageAboutDeclineCall();
		await VuMeetWebSocket.sendNewMessageNotification(otherUsersInChat, this.container.appContext);

		if (rosterEntry) {
			const memberIds = [this.actorId, ...otherUsersInChat];

			VuMeetWebSocket.sendGroupCallRosterUpdate(memberIds, rosterToDTO(rosterEntry));
		}

		this.response.status(200);
		this.response.send();
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

	private async getDeclinerName(): Promise<string> {
		const getVuMeetUserRepo = this.container.getNewRepoPicker(GetVuMeetUserInteractorRepoPicker);
		const declinerData = await this.container.getInteractor(GetVuMeetUser, getVuMeetUserRepo, this.actorId).execute();

		return declinerData.firstName + ' ' + declinerData.lastName;
	}

	private async getOtherUsersInChat() : Promise<string[]> {
		const getOtherParticipantsInChatRepo = new GetOtherParticipantsInChatRepoPicker(this.container.appContext).getRepository();

		return await getOtherParticipantsInChatRepo.load(this.actorId, this.request.body.chatId);
	}

	private getNotificationData(
		isPrivate: boolean,
		rosterEntry: RosterEntry | undefined,
		declinerName: string): SendVuMeetDeclineCallNotificationDTO | SendVuMeetTerminateCalling {
		// Private (1:1) calls have exactly one other participant, so any decline always
		// ends the call — no roster entry exists for private calls to check. For group
		// calls, an empty participants map means CallRosterRegistry already determined
		// no one is left RINGING/JOINED (see RosterRegistry.isDone/mutate) — the call is
		// over. A missing entry (roster already cleared by a concurrent update) is
		// treated the same way: fail toward ending the call rather than leaving a ghost
		// call that never formally terminates for the remaining participants.
		const isCallOver = isPrivate || !rosterEntry || rosterEntry.participants.size === 0;

		if (isCallOver) {
			return this.getTerminateCallNotificationData(declinerName);
		}

		const numberOfDeclinedCalls = Array.from(rosterEntry.participants.values())
			.filter((status) => status === RosterParticipantStatus.DECLINED)
			.length;

		return this.getDeclineCallNotificationData(numberOfDeclinedCalls, declinerName);
	}

	private getTerminateCallNotificationData(declinerName: string) : SendVuMeetTerminateCalling {
		return {
			type: 'terminate_call',
			chatId: this.request.body.chatId,
			declinerName: declinerName
		};
	}

	private getDeclineCallNotificationData(
		numberOfDeclinedCalls: number,
		declinerName: string) : SendVuMeetDeclineCallNotificationDTO {
		return {
			type: 'decline_call',
			chatId: this.request.body.chatId,
			numberOfDeclinedCalls: numberOfDeclinedCalls.toString(),
			declinerName: declinerName
		};
	}

	private async saveVuMeetMessageAboutDeclineCall() {
		const messageRepo = this.container.getNewRepoPicker(CreateMessageInteractorRepoPicker);
		const inputDTO: SaveMessageDTO = {
			id: await this.getUniqueId(),
			content: CallAction.DECLINE_CALL,
			type: MessageContentType.CALL_EVENT,
			sender: this.actorId,
			chat: this.request.body.chatId
		};
		const interactor = this.container.getInteractor(CreateMessage, messageRepo, inputDTO);

		await interactor.execute();
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
}