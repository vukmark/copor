import {GetStateDTO} from '../interactor/dto/GetStateDTO';

export interface GetStateListRepo {
	list(countryId: string): Promise<GetStateDTO[]>;
}