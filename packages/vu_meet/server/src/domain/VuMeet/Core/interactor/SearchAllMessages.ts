import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SearchAllMessagesInputDTO} from './dto/SearchAllMessagesInputDTO';
import {SearchAllMessagesRepo} from '../repository/SearchAllMessagesRepo';
import {SearchAllMessagesDTO} from './dto/SearchAllMessagesDTO';

export class SearchAllMessages extends ExecuteUseCase<SearchAllMessagesInputDTO, SearchAllMessagesRepo, SearchAllMessagesDTO[]> {
	public execute(): Promise<SearchAllMessagesDTO[]> {
		return this.repository.search(this.input.prompt, this.input.actorId);
	}
}
