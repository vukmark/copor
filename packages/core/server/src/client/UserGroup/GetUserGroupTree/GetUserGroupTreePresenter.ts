import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserGroupTreeViewModel} from '@copor/core/client/UserGroup/GetUserGroupTree/GetUserGroupTreeViewModel';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import i18next from 'i18next';

export class GetUserGroupTreePresenter extends PresenterInstance<GetUserGroupTreeDTO[], GetUserGroupTreeViewModel[]> {
	public present(): GetUserGroupTreeViewModel[] {
		i18next.setDefaultNamespace('user_group');
		return this.input.map((dto) => this.toViewModel(dto));
	}

	private toViewModel(dto: GetUserGroupTreeDTO): GetUserGroupTreeViewModel {
		const isSpecial = !dto.canEditName;

		return {
			id: dto.id,
			canEdit: dto.canEditName || dto.canEditMembers,
			canCreateChildren: dto.canCreateChildren,
			name: isSpecial ? i18next.t('translationStringList.' + dto.name) : dto.name,
			children: dto.children.map((child) => this.toViewModel(child))
		};
	}
}
