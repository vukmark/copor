export interface ValidateUpdateUserAccountInformationDTO {
	id: string;
	country?: string | null;
	state?: string | null;
	actorId: string;
	nativeLanguage?: string | null;
}
