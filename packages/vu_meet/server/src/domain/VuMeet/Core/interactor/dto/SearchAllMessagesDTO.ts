export interface SearchAllMessagesDTO {
	chatId: string;
	chatName: string;
	chatPicture: string;
	isPrivate: boolean;
	messageId: string;
	messageContent: string;
	senderId: string;
	senderName: string;
	senderPicture: string;
	createdAt: Date;
}
