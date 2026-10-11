import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {GetContentItemViewModel} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemViewModel';

export class GetContentItemPresenter
	extends PresenterInstance<GetContentItemDTO, GetContentItemViewModel> {
	present(): GetContentItemViewModel {
		return {
			id: this.input.id,
			title: this.input.title,
			summary: this.input.summary,
			content: this.input.content,
			contentType: this.input.contentType,
			publishDate: this.input.publishDate,
			publishStatus: this.input.publishStatus,
			role: this.input.role
		};
	}
}