import {SearchTagRepo} from '@copor/core/domain/Components/Tag/repository/SearchTagRepo';
import {SearchTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SearchTagDTO';
import {SearchTag} from '@copor/core/domain/Components/Tag/interactor/SearchTag';
import {Color} from '@copor/core/domain/Core/enum/Color';

describe('SearchTag tests', () => {
	it('should return tag', async() => {
		const mockGetTagRepo: jest.Mocked<SearchTagRepo> = {
			search: jest.fn()
		};
		const toBeSearched = {search: 'some string', actorId: 'someActorId'};
		const mockedReturnTag: SearchTagDTO[] = [{
			id: 'tagId',
			name: 'title',
			color: Color.blue
		}];

		mockGetTagRepo.search.mockResolvedValue(mockedReturnTag);
		const getTag = new SearchTag(toBeSearched, mockGetTagRepo);
		const result = await getTag.execute();

		expect(result).toEqual(mockedReturnTag);
		expect(mockGetTagRepo.search).toHaveBeenCalledWith('some string', 'someActorId');
	});
});
