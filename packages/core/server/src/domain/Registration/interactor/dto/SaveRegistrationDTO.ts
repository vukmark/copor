export interface SaveRegistrationDTO {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	password: string;
	verificationCode: string;
	codeExpiresAt: Date;
}
