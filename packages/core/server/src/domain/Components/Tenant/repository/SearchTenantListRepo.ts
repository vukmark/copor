import {SearchTenantListDTO} from '../interactor/dto/SearchTenantListDTO';

export interface SearchTenantListRepo {
	search(prompt: string): Promise<SearchTenantListDTO[]>;
}