export interface GetUserFullNameRepo {
	load(id: string): Promise<string>;
}
