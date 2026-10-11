import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';

import {ListItemsByIdRepo} from '@copor/core/domain/Core/Repository/ListItemsByIdRepo';

export type GetUserGroupUserListRepo = ListItemsByIdRepo<GetUserGroupUserListDTO>;
