export interface GetSimpleUserDTO {
	id: string;
	roleName: string;
	firstName: string;
	lastName: string;
	picture: string | null;
	pictureExtension: string | null;
}

export interface GetChatInfoDTO {
	id: string;
	name: string;
	members: GetSimpleUserDTO[];
	firstName: string | null;
	lastName: string | null;
	isPrivate: boolean;
	chatPicture: string | null;
	chatPictureExtension: string | null;
	isActive?: boolean;
}
