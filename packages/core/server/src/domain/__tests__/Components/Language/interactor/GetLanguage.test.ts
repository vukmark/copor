import {GetLanguageRepo} from '@copor/core/domain/Components/Language/repository/GetLanguageRepo';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {GetLanguage} from '@copor/core/domain/Components/Language/interactor/GetLanguage';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('get language tests', () => {
	const mockGetLanguageRepo: jest.Mocked<GetLanguageRepo> = {
		load: jest.fn()
	};
	const uniqueId = 'level-id';
	const mockedReturnLanguage: GetLanguageDTO = {
		id: 'unique-id',
		name: 'Country',
		code: 'code',
		nativeName: 'nativeName',
		publishStatus: PublishStatus.published
	};
	const getLanguage = new GetLanguage(uniqueId, mockGetLanguageRepo);

	it('should return level', async () => {
		mockGetLanguageRepo.load.mockResolvedValue(mockedReturnLanguage);

		expect(await getLanguage.execute()).toEqual(mockedReturnLanguage);
		expect(mockGetLanguageRepo.load).toHaveBeenCalledWith(uniqueId);
	});
});