import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {GetLanguageList} from '@copor/core/domain/Components/Language/interactor/GetLanguageList';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('get language list tests', () => {
	const mockRepo: jest.Mocked<ListItems<GetLanguageDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetLanguageDTO[] = [{
		id: 'unique-id',
		name: 'Country',
		code: 'code',
		nativeName: 'nativeName',
		publishStatus: PublishStatus.published
	}];
	const getLanguageList: GetLanguageList = new GetLanguageList([], mockRepo);

	it('should list all languages', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);

		expect(await getLanguageList.execute()).toEqual(expectedResponse);
	});
});
