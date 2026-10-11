interface ChatMemberDisplayDTO {
	id: string;
	name: string;
	picture?: string;
	roleName: string;
}

export interface GetChatInfoViewModel {
	id: string;
	members: ChatMemberDisplayDTO[]
	name: string;
	isPrivate: boolean;
	chatPicture?: string;
	isActive?: boolean;
}
