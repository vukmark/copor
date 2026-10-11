export interface GetUnreadMessageCountForUserDTO {
	unreadMessages: number;
	lastMessageChatName: string;
	lastMessageContent: string;
	lastMessageChatPictureName?: string;
	lastMessageChatPictureExtension?: string;
	lastMessageChatId: string;
	lastMessageIsChatPrivate: boolean;
}
