export interface PasswordResetCodeEmailDTO {
	receiver: string;
	userName: string;
	resetCode: string;
}