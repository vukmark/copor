import {SearchTagRepo} from '../repository/SearchTagRepo';
import {SearchTagDTO} from './dto/SearchTagDTO';
import {ExecuteUseCase} from '../../../Core/Interactors/ExecuteUseCase';

export class SearchTag extends
	ExecuteUseCase<{search: string, actorId: string}, SearchTagRepo, SearchTagDTO[]> {
	public async execute(): Promise<SearchTagDTO[]> {
		return await this.repository.search(this.input.search, this.input.actorId);
	}
}
