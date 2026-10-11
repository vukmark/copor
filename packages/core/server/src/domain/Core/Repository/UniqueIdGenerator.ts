export interface UniqueIdGenerator {
	getNewId(): Promise<string>;
}