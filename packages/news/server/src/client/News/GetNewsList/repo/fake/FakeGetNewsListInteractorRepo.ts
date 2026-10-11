import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';


export class FakeGetNewsListInteractorRepo implements
    ListItems<GetNewsDTO> {
	public list(input: ListRepoInputDTO): Promise<GetNewsDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: 'id1',
						title: 'title1',
						summary: 'summary1',
						content: 'content1',
						publishDate: new Date(),
						role: [{
							id: '',
							type: RoleType.USER,
							name: ''
						}],
						publishStatus: PublishStatus.published
					},
					{
						id: 'id2',
						title: 'title2',
						summary: 'summary2',
						content: 'content2',
						publishDate: new Date(),
						role: [{
							id: '',
							type: RoleType.USER,
							name: ''
						}],
						publishStatus: PublishStatus.published
					}
				]
			);
		});
	}
}