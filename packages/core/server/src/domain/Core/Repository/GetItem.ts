export interface GetItem<Response> {
	load(id: string): Promise<Response>;
}