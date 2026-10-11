import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetTagViewModel} from './GetTagViewModel';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';

export class GetTagPresenter extends PresenterInstance<GetTagDTO, GetTagViewModel> {
	present(): GetTagViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			color: this.input.color,
			colorSet: this.input.colorSet,
			description: this.input.description,
			isPrivate: Boolean(this.input.isPrivate)
		};
	}
}
