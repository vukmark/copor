import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class FakeGetContentItemInteractorRepo
implements GetItem<GetContentItemDTO> {
	load(id: string): Promise<GetContentItemDTO> {
		return Promise.resolve({
			id: 'id',
			title: 'title',
			summary: 'summary',
			content: 'content',
			publishDate: new Date(),
			contentType: ContentType.NEWS,
			publishStatus: PublishStatus.published,
			role: [{
				id: 'id',
				type: RoleType.USER,
				name: 'name'
			}]
		});
	}
}