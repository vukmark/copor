export interface GetAdminUserIdListRepo {
	list(): Promise<string[]>;
}
