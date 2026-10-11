import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetPermissionTreeViewModel} from '@copor/core/client/Components/Permission/GetPermissionTree/GetPermissionTreeViewModel';
import {
	PermissionGroupType,
	PermissionGroupViewModel
} from '@copor/core/client/Components/Permission/GetPermissionTree/PermissionGroupViewModel';
import i18next from 'i18next';

export interface GetPermissionTreeDTO {
	roleList: GetRoleDTO[]
	userGroupTree: GetUserGroupTreeDTO[]
}

export class GetPermissionTreePresenter
	extends PresenterInstance<GetPermissionTreeDTO, GetPermissionTreeViewModel> {
	public present(): GetPermissionTreeViewModel {
		i18next.setDefaultNamespace('user_group');
		return {
			roleList: this.input.roleList,
			userGroupTree: this.input.userGroupTree.map((group) => this.toViewModel(group))
		};
	}

	private toViewModel(group: GetUserGroupTreeDTO): PermissionGroupViewModel {
		const isSpecial = !group.canEditName;

		return {
			id: group.id,
			canEdit: group.canEditName || group.canEditMembers,
			name: isSpecial ? i18next.t('translationStringList.' + group.name) : group.name,
			children: group.children.map((child) => this.toViewModel(child)),
			groupType: PermissionGroupType.USER_GROUP
		};
	}
}
