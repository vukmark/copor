export interface ValidatePasswordInputDTO {
	password: string;
	confirmPassword: string;
	userName?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
}