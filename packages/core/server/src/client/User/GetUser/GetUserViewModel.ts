export interface GetUserViewModel {
	id: string;
	firstName: string;
	lastName: string;
	picturePath?: string;
	role: string;
	isDefaultRole: boolean;
	isActive: boolean;
}