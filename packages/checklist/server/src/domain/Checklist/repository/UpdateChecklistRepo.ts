import {SaveChecklistDTO} from '../interactor/dto/SaveChecklistDTO';

export interface UpdateChecklistRepo {
	update(checklistDTO: SaveChecklistDTO): Promise<void>;
}