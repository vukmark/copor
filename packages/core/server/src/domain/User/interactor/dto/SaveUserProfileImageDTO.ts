export interface SaveUserProfileImageDTO {
	userId: string;
	image: Buffer;
	newImageId: string;
}