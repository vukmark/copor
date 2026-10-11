import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {GetPublicTagList} from '@copor/core/domain/Components/Tag/interactor/GetPublicTagList';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('get public tag list test', () => {
	const mockRepo: jest.Mocked<ListItems<GetTagDTO>> = {
		list: jest.fn()
	};

	const expectedResponse: GetTagDTO[] = [
		{
			id: 'tag-001',
			name: 'Frontend Development',
			color: Color.amber,
			isPrivate: false,
			colorSet: ColorSet.SET9
		},
		{
			id: 'tag-002',
			name: 'Backend Services',
			color: Color.blue,
			isPrivate: false,
			colorSet: ColorSet.SET9
		},
		{
			id: 'tag-003',
			name: 'Personal Notes',
			color: Color.red,
			isPrivate: true,
			colorSet: ColorSet.SET9
		}
	];

	const getPublicTagList: GetPublicTagList = new GetPublicTagList([], mockRepo);

	it('Should list all public tags', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getPublicTagList.execute()).toEqual(expectedResponse);
	});
});