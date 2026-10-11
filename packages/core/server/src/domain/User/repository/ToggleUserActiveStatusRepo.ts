export interface ToggleUserActiveStatusRepo {
	updateIsActive(id: string, isActive: boolean): Promise<void>
}
