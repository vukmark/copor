export interface SaveUserProfileImageRepo {
	save(userId: string, image: Buffer, newImageId: string): Promise<void>
}