export interface TrashToDoRepo {
	trashToDo(id: string): Promise<void>;
}