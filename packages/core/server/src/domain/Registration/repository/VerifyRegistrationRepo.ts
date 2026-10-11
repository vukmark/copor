export interface VerifyRegistrationRepo {
	// Activates the pending account with this email and retires its codes.
	activate(email: string): Promise<void>;
}
