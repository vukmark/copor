import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedTableModelDTO, TableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export abstract class BaseTableController extends BaseController<GetListReqBodyDTO, TableModelDTO | PaginatedTableModelDTO> {}
