export interface UpdateAuthUserInformationDTO {
	id: string;
	userName: string;
	email?: string;
	password?: string;
	actorId: string;
}
