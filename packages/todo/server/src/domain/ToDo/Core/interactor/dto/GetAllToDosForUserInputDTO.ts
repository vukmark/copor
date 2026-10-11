import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export interface GetAllToDosForUserInputDTO {
	userId: string;
	filterList: GetFilterDTO[]
}
