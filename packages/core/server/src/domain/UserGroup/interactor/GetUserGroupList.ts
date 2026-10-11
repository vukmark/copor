import {GetUserGroupDTO} from './dto/GetUserGroupDTO';
import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class GetUserGroupList extends ListItemsUseCase<GetUserGroupDTO> {}
