export interface SaveItem<SaveDTO> {
	save(saveDTO: SaveDTO): Promise<void>;
}