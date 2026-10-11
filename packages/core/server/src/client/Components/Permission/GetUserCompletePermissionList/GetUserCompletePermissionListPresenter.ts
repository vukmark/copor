import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {FeatureScopedPermissionPresenter} from '@copor/core/client/Core/Presenter/FeatureScopedPermissionPresenter';

export class GetUserCompletePermissionListPresenter extends PresenterInstance<ScopedPermission[], FeatureScopedPermissionViewModel[]> {
	public present(): FeatureScopedPermissionViewModel[] {
		const presenter = new FeatureScopedPermissionPresenter(
			this.input,
			this.appContext
		);

		return presenter.present();
	}
}