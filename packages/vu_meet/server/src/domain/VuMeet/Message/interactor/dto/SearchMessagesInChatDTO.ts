export interface SearchMessagesInChatDTO {
	messageId: string;
	messageContent: string;
	messageType: string;
	senderId: string;
	senderFirstName: string;
	senderLastName: string;
	senderProfileImagePath: string;
	messageSeen: boolean;
	createdAt: Date;
}