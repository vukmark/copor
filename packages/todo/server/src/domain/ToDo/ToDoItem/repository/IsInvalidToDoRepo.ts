export interface IsInvalidToDoRepo {
	isInvalidToDo(taskId: string | undefined): Promise<boolean>;
}
