
export interface SaveNotificationRepo<SaveDTO> {
	save(saveDto: SaveDTO): Promise<string>;
}
