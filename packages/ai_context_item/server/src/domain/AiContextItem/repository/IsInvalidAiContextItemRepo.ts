export interface IsInvalidAiContextItemRepo {
	isInvalidAiContextItem(contextItemId: string | undefined): Promise<boolean>
}