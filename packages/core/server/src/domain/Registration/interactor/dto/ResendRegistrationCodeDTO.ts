export interface ResendRegistrationCodeDTO {
	email: string;
	verificationCode: string;
	codeExpiresAt: Date;
}
