export interface LoginResponseDTO {
	authToken: string;
	refreshToken: string;
	message?: string;
	redirect?: string;
}