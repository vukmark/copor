export interface SaveResetCodeDTO {
	id: string;
	codeHash: string;
	userNameOrEmail: string;
	expiresAt: Date;
}