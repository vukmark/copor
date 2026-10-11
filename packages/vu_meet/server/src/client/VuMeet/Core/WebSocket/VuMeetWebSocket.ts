import {AppContext} from '@copor/core/client/Interface/AppContext';
import {webSocketHelper} from '@copor/core/client/Core/WebSocket/WebSocketHelper';
import {GetUnreadMessageCountForUser} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetUnreadMessageCountForUser';
import {
	GetUnreadMessageCountForUserRepoPicker
} from '@copor/vu_meet/client/VuMeet/Core/UnreadMessageCount/repo/repoPicker/GetUnreadMessageCountForUserRepoPicker';
import {TypingStatusMessageDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/TypingStatusMessageDTO';
import {ChatListUpdatedMessageDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/ChatListUpdatedMessageDTO';
import {RemovedFromGroupChatMessageDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/RemovedFromGroupChatMessageDTO';
import {GroupCallRosterDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/GroupCallRosterDTO';
import {VuMeetCallNotificationDTO} from '@copor/vu_meet/client/VuMeet/Core/Call/VuMeetCallPushNotification';

export enum VuMeetWebSocketEvent {
	NEW_MESSAGE_NOTIFICATION = 'NEW_MESSAGE_NOTIFICATION',
	TYPING_STATUS = 'TYPING_STATUS',
	NUMBER_OF_UNREAD_MESSAGES = 'NUMBER_OF_UNREAD_MESSAGES',
	PRIVATE_CALL = 'PRIVATE_CALL',
	GROUP_CALL = 'GROUP_CALL',
	GROUP_CALL_ROSTER_UPDATED = 'GROUP_CALL_ROSTER_UPDATED',
	CHAT_LIST_UPDATED = 'CHAT_LIST_UPDATED',
	REMOVED_FROM_GROUP_CHAT = 'REMOVED_FROM_GROUP_CHAT'
}

// VuMeet's messages over core's WebSocket connection.
export class VuMeetWebSocket {
	public static sendTypingStatusMessage(userIds: string[], payload: TypingStatusMessageDTO) {
		webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.TYPING_STATUS, payload}, userIds);
	}

	// Each recipient gets their own unread counts.
	public static async sendNewMessageNotification(userIds: string[], appContext: AppContext) {
		const repo = new GetUnreadMessageCountForUserRepoPicker(appContext).getRepository();

		for (const userId of userIds) {
			const payload = await new GetUnreadMessageCountForUser(userId, repo).execute();

			webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.NEW_MESSAGE_NOTIFICATION, payload}, [userId]);
		}
	}

	public static sendChatListUpdatedNotification(userIds: string[], payload: ChatListUpdatedMessageDTO) {
		webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.CHAT_LIST_UPDATED, payload}, userIds);
	}

	public static sendRemovedFromGroupChatNotification(userIds: string[], payload: RemovedFromGroupChatMessageDTO) {
		webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.REMOVED_FROM_GROUP_CHAT, payload}, userIds);
	}

	// Mirrors VuMeetCallPushNotification's payload exactly, so the frontend
	// parses a call event the same whether it arrived live over the socket (app
	// open) or as a push (app in the background or closed) — the two paths are
	// redundant delivery of the same event.
	public static sendVuMeetCallNotification(userIds: string[], isPrivate: boolean, payload: VuMeetCallNotificationDTO) {
		const event = isPrivate ? VuMeetWebSocketEvent.PRIVATE_CALL : VuMeetWebSocketEvent.GROUP_CALL;

		webSocketHelper.sendMessageWithPayload({event, payload}, userIds);
	}

	public static sendGroupCallRosterUpdate(userIds: string[], payload: GroupCallRosterDTO) {
		webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.GROUP_CALL_ROSTER_UPDATED, payload}, userIds);
	}

	public static async sendNumberOfUnreadMessages(userId: string, appContext: AppContext) {
		const repo = new GetUnreadMessageCountForUserRepoPicker(appContext).getRepository();
		const counts = await new GetUnreadMessageCountForUser(userId, repo).execute();

		webSocketHelper.sendMessageWithPayload({event: VuMeetWebSocketEvent.NUMBER_OF_UNREAD_MESSAGES, payload: counts.unreadMessages}, [userId]);
	}
}
