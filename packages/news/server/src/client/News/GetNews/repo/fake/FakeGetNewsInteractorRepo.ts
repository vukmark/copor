import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetNewsInteractorRepo implements GetItem<GetNewsDTO> {
	load(id: string): Promise<GetNewsDTO> {
		return Promise.resolve({
			id: 'string',
			title: 'string',
			summary: 'string',
			content: 'string',
			publishDate: new Date(),
			role: [{
				id: 'id',
				type: RoleType.USER,
				name: 'id'
			}],
			publishStatus: PublishStatus.published
		});
	}
}