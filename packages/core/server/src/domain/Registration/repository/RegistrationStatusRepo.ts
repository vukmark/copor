export interface RegistrationStatusRepo {
	isSelfRegistrationEnabled(): Promise<boolean>;
}
