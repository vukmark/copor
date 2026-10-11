import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {GetNewsViewModel} from '@copor/news/client/News/GetNews/GetNewsViewModel';

export class GetNewsListPresenter
	extends PresenterInstance<GetNewsDTO[], GetNewsViewModel[]> {
	public present(): GetNewsViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			title: dto.title,
			summary: dto.summary,
			content: dto.content,
			publishDate: dto.publishDate,
			role: dto.role,
			publishStatus: dto.publishStatus
		}));
	}
}