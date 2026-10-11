export interface DeleteUserProfileImageRepo {
	deleteProfileImage(userId: string): Promise<void>
}
