import {ExecuteUseCase} from '../../../Core/Interactors/ExecuteUseCase';
import {SearchTenantListRepo} from '../repository/SearchTenantListRepo';
import {SearchTenantListDTO} from './dto/SearchTenantListDTO';

export class SearchTenantList extends ExecuteUseCase<string, SearchTenantListRepo, SearchTenantListDTO[]> {
	public execute(): Promise<SearchTenantListDTO[]> {
		return this.repository.search(this.input);
	}
}