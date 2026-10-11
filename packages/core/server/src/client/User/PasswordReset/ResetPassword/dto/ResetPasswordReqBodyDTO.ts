export interface ResetPasswordReqBodyDTO {
	userName: string;
	code: string;
	newPassword: string;
}