export interface GetUserDeletionRequestDTO {
	id: string;
	userFirstName?: string | null;
	userLastName?: string | null;
	username?: string | null;
	userRoleType?: string | null;
	imageName?: string | null;
	imageExtension?: string | null;
}
