import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetPublicTagListInteractorRepo implements ListItems<GetTagDTO> {
	public list(input: ListRepoInputDTO): Promise<GetTagDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'tag-001',
					name: 'Frontend Development',
					color: Color.orange,
					colorSet: ColorSet.SET18,
					description: 'All things related to frontend technologies',
					isPrivate: false
				},
				{
					id: 'tag-002',
					name: 'Backend Services',
					color: Color.black,
					colorSet: ColorSet.SET18,
					description: 'Server-side programming and architecture',
					isPrivate: false
				},
				{
					id: 'tag-003',
					name: 'Personal Notes',
					color: Color.brown,
					colorSet: ColorSet.SET18,
					isPrivate: false
				},
				{
					id: 'tag-004',
					name: 'DevOps',
					color: Color.red,
					colorSet: ColorSet.SET18,
					description: 'CI/CD pipelines and infrastructure',
					isPrivate: false
				},
				{
					id: 'tag-005',
					name: 'Team Meeting Minutes',
					color: Color.amber,
					colorSet: ColorSet.SET18,
					isPrivate: false
				},
				{
					id: 'tag-006',
					name: 'UI/UX Design',
					color: Color.pink,
					colorSet: ColorSet.SET18,
					description: 'User interface and experience design principles',
					isPrivate: false
				},
				{
					id: 'tag-007',
					name: 'Security',
					color: Color.purple,
					colorSet: ColorSet.SET18,
					description: 'Application security best practices',
					isPrivate: false
				}]
			);
		});
	}
}
