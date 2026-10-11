export interface IsInvalidToDoCategoryRepo {
	isInvalidToDoCategory(toDoCategoryId: string | undefined): Promise<boolean>;
}