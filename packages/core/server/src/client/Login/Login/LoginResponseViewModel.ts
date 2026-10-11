export interface LoginResponseViewModel {
	authToken: string;
	refreshToken: string;
	message?: string;
	redirect?: string;
	error?: string;
}