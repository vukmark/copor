import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';

export class GetListReqBodyDTO {
	filterList: GetFilterDTO[];
	limit?: string;
	offset?: string;
}