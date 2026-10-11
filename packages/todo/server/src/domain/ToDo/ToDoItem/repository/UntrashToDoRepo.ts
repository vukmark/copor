export interface UntrashToDoRepo {
	untrashToDo(id: string): Promise<void>;
}