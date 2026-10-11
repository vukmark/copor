export interface IsInvalidTagRepo {
	isInvalidTag(tagId: string | undefined): Promise<boolean>;
}
