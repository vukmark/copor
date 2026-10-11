import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {FeatureScopedPermissionPresenter} from '@copor/core/client/Core/Presenter/FeatureScopedPermissionPresenter';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';

export class GetUserSpecificPermissionListPresenter
	extends PresenterInstance<ScopedPermission[], FeatureScopedPermissionViewModel[]> {
	public present(): FeatureScopedPermissionViewModel[] {
		const presenter = new FeatureScopedPermissionPresenter(
			this.input,
			this.appContext
		);

		return presenter.present();
	}
}