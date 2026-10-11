import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetTag} from '@copor/core/domain/Components/Tag/interactor/GetTag';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

describe('get tag test', () => {
	const mockRepo: jest.Mocked<GetItem<GetTagDTO>> = {
		load: jest.fn()
	};
	const expectedResponse: GetTagDTO = {
		colorSet: ColorSet.SET9,
		id: 'uId',
		name: 'tName',
		color: Color.blue,
		description: 'description',
		isPrivate: true
	};
	const getTag: GetTag = new GetTag('tagId', mockRepo);

	it('should return tag based on id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getTag.execute()).toEqual(expectedResponse);
	});
});
