import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {PermissionGroupViewModel} from '@copor/core/client/Components/Permission/GetPermissionTree/PermissionGroupViewModel';

export interface GetPermissionTreeViewModel {
	roleList: GetRoleDTO[];
	userGroupTree: PermissionGroupViewModel[]
}