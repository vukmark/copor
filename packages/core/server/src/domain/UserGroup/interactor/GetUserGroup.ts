import {GetUserGroupDTO} from './dto/GetUserGroupDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetUserGroup extends GetItemUseCase<GetUserGroupDTO> {}
