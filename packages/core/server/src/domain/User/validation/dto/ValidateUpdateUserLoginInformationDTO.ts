export interface ValidateUpdateUserLoginInformationDTO {
	newPassword: string;
	userId: string;
	oldPassword: string;
	actorId: string;
}