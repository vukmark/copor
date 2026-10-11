import {SearchAllMessagesDTO} from '../interactor/dto/SearchAllMessagesDTO';

export interface SearchAllMessagesRepo {
	search(prompt: string, actorId: string): Promise<SearchAllMessagesDTO[]>;
}
