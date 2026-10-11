import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {GetContentItemViewModel} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemViewModel';

export class GetContentItemListPresenter
	extends PresenterInstance<GetContentItemDTO[], GetContentItemViewModel[]> {
	public present(): GetContentItemViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			title: dto.title,
			summary: dto.summary,
			content: dto.content,
			publishDate: dto.publishDate,
			role: dto.role,
			contentType: dto.contentType,
			publishStatus: dto.publishStatus
		}));
	}
}