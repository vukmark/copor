export interface GetUserChatDTO {
	id: string;
	isPrivate: boolean;
	name: string;
	pictureName?: string;
	pictureExtension?: string;
	lastMessage: string;
	createdAt: Date;
	numberOfUnseenMessages: number;
	isActive?: boolean;
	otherUserId?: string
}
