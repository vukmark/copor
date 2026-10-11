export interface DeleteItem {
	delete(itemId: string): Promise<void>;
}