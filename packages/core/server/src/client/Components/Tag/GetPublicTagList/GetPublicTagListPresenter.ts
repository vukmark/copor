import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetPublicTagViewModel} from '@copor/core/client/Components/Tag/GetPublicTagList/GetPublicTagViewModel';

export class GetPublicTagListPresenter extends PresenterInstance<GetTagDTO[], GetPublicTagViewModel[]> {
	public present(): GetPublicTagViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			name: dto.name,
			color: dto.color,
			colorSet: dto.colorSet,
			description: dto.description,
			isPrivate: Boolean(dto.isPrivate)
		}));
	}
}

