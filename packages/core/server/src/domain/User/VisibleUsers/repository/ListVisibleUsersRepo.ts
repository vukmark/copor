import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';

export interface ListVisibleUsersRepoInput {
	filters: GetFilterDTO[];
	actorId: string;
	// Whose scope decides which users the actor sees.
	permissionType: PermissionType;
	// Leave out deactivated users.
	activeOnly: boolean;
	limit?: string;
	offset?: string;
}

export interface ListVisibleUsersRepo {
	list(input: ListVisibleUsersRepoInput): Promise<VisibleUserDTO[]>;
}
