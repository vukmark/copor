export interface TokenPayload {
	userId: string;
	tokenType: 'access' | 'refresh'
}