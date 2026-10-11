import {db} from '@copor/core/client/AppDataSource';
import {GetUnreadMessageCountForUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUnreadMessageCountForUserDTO';
import {GetUnreadMessageCountForUserRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUnreadMessageCountForUserRepo';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {MessageContentFormatter} from '@copor/vu_meet/client/VuMeet/Core/Helper/MessageContentFormatter';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

interface RawChatData {
	chatId: string;
	createdAt: Date;
	chatName: string;
	lastMessageSentTime: Date;
	isPrivate: boolean;
	lastMessage: string;
	lastMessageType: string;
	lastMessageSentById: string;
	otherUserFirstName: string | null;
	otherUserLastName: string | null;
	pictureName: string | null;
	pictureExtension: string | null;
	numberOfUnseenMessages: number;
}
export class KyselyGetUnreadMessageCountForUserInteractorRepo implements GetUnreadMessageCountForUserRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async getUnreadMessageCountForUser(userId: string): Promise<GetUnreadMessageCountForUserDTO> {
		return this.getNotificationForLastMessageToUser(userId);
	}

	private async getNotificationForLastMessageToUser(userId: string) {
		const rows = await db
			.selectFrom('chat as chats')
			.innerJoin('chatUserMap as currentUserMap', 'currentUserMap.chatId', 'chats.id')
			.leftJoin('chatUserMap as otherUserMap', (join) => join
				.onRef('otherUserMap.chatId', '=', 'chats.id')
				.on('otherUserMap.userId', '!=', userId))
			.leftJoin('user as otherUser', 'otherUser.id', 'otherUserMap.userId')
			.leftJoin('image as otherUserImage', 'otherUserImage.id', 'otherUser.profileImageId')
			.where('currentUserMap.userId', '=', userId)
			.select([
				'chats.id as chatId',
				'chats.name as chatName',
				'chats.isPrivate',
				'chats.lastMessageSentTime as lastMessageSentTime',
				'otherUser.firstName as otherUserFirstName',
				'otherUser.lastName as otherUserLastName',
				'otherUserImage.name as pictureName',
				'otherUserImage.extension as pictureExtension',
				'chats.lastMessage as lastMessage',
				'chats.lastMessageType as lastMessageType',
				'chats.lastMessageSentBy as lastMessageSentById'
			])
			.select((eb) => eb
				.selectFrom('message as pm')
				.leftJoin('messageSeen as ms', (join) => join
					.onRef('ms.messageId', '=', 'pm.id')
					.on('ms.userId', '=', userId))
				.whereRef('pm.chatId', '=', 'chats.id')
				.where('pm.senderId', '!=', userId)
				.where('ms.messageId', 'is', null)
				.select((innerEb) => innerEb.fn.count('pm.id').as('unseenCount'))
				.as('numberOfUnseenMessages'))
			.orderBy('chats.lastMessageSentTime', 'desc')
			.limit(1)
			.execute();

		const response = this.prepareDataForResponse(rows as unknown as RawChatData[], userId);

		return Promise.resolve(response[0]);
	}

	private prepareDataForResponse(rawData: RawChatData[], actorId: string) {
		return rawData.map((row) => {
			const firstName = row.otherUserFirstName ?? '';
			const lastName = row.otherUserLastName ?? '';
			const nameOfUser = `${firstName} ${lastName}`.trim();
			const pictureName = row.pictureName ? row.pictureName : undefined;
			const pictureExtension = row.pictureExtension ? row.pictureExtension : undefined;

			return {
				unreadMessages: row.numberOfUnseenMessages,
				lastMessageChatName: row.isPrivate ? nameOfUser : row.chatName,
				lastMessageContent: MessageContentFormatter.formatContent({
					content: row.lastMessage,
					senderId: row.lastMessageSentById,
					actorId,
					type: row.lastMessageType as MessageContentType
				}),
				lastMessageChatPicture: ImageHelper.getProfileImageUrlOrEmptyString(pictureName, pictureExtension, this.appContext),
				lastMessageChatPictureName: row.pictureName ?? undefined,
				lastMessageChatPictureExtension: row.pictureExtension ?? undefined,
				lastMessageChatId: row.chatId,
				lastMessageIsChatPrivate: row.isPrivate
			};
		});
	}
}
