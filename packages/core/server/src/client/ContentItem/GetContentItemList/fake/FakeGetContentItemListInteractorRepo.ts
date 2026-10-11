import {GetContentItemViewModel} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemViewModel';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';

export class FakeGetContentItemListInteractorRepo implements
	ListItems<GetContentItemDTO> {
	public list(): Promise<GetContentItemViewModel[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'id1',
					title: 'title1',
					summary: 'summary1',
					content: 'content1',
					publishDate: new Date(),
					publishStatus: PublishStatus.published,
					contentType: ContentType.NEWS,
					role: []
				},
				{
					id: 'id2',
					title: 'title2',
					summary: 'summary2',
					content: 'content2',
					publishDate: new Date(),
					publishStatus: PublishStatus.published,
					contentType: ContentType.NEWS,
					role: []
				}
			]);
		});
	}
}