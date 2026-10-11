export interface UpdateUserLoginInformationDTO {
	newPassword: string;
	oldPassword: string;
	userId: string;
	actorId: string;
}