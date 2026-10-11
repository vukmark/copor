import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetUserGroupRepo = GetItem<GetUserGroupDTO>;