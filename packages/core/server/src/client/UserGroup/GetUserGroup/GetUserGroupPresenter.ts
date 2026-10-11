import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {GetUserGroupViewModel} from './GetUserGroupViewModel';
import i18next from 'i18next';

export class GetUserGroupPresenter extends PresenterInstance<GetUserGroupDTO, GetUserGroupViewModel> {
	present(): GetUserGroupViewModel {
		i18next.setDefaultNamespace('user_group');
		return {
			id: this.input.id,
			name: this.input.isSpecial ? i18next.t('translationStringList.' + this.input.name) : this.input.name,
			isSpecial: Boolean(this.input.isSpecial)
		};
	}
}
