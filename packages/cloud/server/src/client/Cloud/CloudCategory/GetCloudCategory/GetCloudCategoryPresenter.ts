import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetCloudCategoryViewModel} from './GetCloudCategoryViewModel';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';

export class GetCloudCategoryPresenter extends PresenterInstance<GetCloudCategoryDTO, GetCloudCategoryViewModel> {
	present(): GetCloudCategoryViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			description: this.input.description,
			publishStatus: this.input.publishStatus,
			categoryType: this.input.categoryType
		};
	}
}
