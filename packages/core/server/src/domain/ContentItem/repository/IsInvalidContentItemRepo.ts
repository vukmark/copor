export interface IsInvalidContentItemRepo {
	isInvalidContentItem(contentItemId: string | undefined): Promise<boolean>;
}