
import {GetAllToDosForUserDTO} from '../interactor/dto/GetAllToDosForUserDTO';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export interface GetAllToDosForUserRepo {
	load(userId: string, filterList: GetFilterDTO[]): Promise<GetAllToDosForUserDTO[]>;
}
