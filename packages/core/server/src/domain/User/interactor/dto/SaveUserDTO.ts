export interface SaveUserDTO {
	id: string;
	authUser: string;
	role: string;
	isDefaultRole: boolean;
	isActive: boolean;
	actorId: string;
}