import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {GetNewsViewModel} from '@copor/news/client/News/GetNews/GetNewsViewModel';

export class GetNewsPresenter extends PresenterInstance<GetNewsDTO, GetNewsViewModel> {
	present(): GetNewsViewModel {
		return {
			id: this.input.id,
			title: this.input.title,
			summary: this.input.summary,
			content: this.input.content,
			publishDate: this.input.publishDate,
			role: this.input.role,
			publishStatus: this.input.publishStatus
		};
	}
}