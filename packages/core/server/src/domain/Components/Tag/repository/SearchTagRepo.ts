import {SearchTagDTO} from '../interactor/dto/SearchTagDTO';

export interface SearchTagRepo {
	search(search: string, actorId: string): Promise<SearchTagDTO[]>;
}
