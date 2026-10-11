import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRoleViewModel} from '@copor/core/client/Components/Role/GetRole/GetRoleViewModel';
import {GetRolePresenter} from '@copor/core/client/Components/Role/GetRole/GetRolePresenter';

export class GetRoleListPresenter extends PresenterInstance<GetRoleDTO[], GetRoleViewModel[]> {
	public present(): GetRoleViewModel[] {
		return this.input.map((inputDTO) => {
			const presenter = new GetRolePresenter(inputDTO, this.appContext);

			return presenter.present();
		});
	}
}