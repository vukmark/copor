export interface IsInvalidStateRepo {
	isInvalidState(stateId: string | undefined): Promise<boolean>;
}