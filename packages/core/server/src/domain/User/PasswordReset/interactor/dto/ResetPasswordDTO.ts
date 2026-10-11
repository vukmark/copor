export interface ResetPasswordDTO {
	userName: string;
	code: string;
	newPassword: string;
}