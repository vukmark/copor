import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRoleViewModel} from './GetRoleViewModel';
import i18next from 'i18next';

export class GetRolePresenter extends PresenterInstance<GetRoleDTO, GetRoleViewModel> {
	present(): GetRoleViewModel {
		i18next.setDefaultNamespace('role');
		return {
			... this.input,
			type: {
				name: this.input.type,
				translation: i18next.t(this.input.type)
			},
			name: i18next.t(this.input.name)
		};
	}
}
