import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {GetFeatureList} from '@copor/core/domain/FeatureList/interactor/GetFeatureList';
import {GetFeatureListRepo} from '@copor/core/domain/FeatureList/repository/GetFeatureListRepo';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';

describe('Get ContentList tests', () => {
	const mockRepo: jest.Mocked<GetFeatureListRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetFeatureListDTO = {
		featureList: [CoreFeature.ADMINISTRATION, '/vu-meet']
	};
	const getContentList: GetFeatureList = new GetFeatureList('unique-id', mockRepo);

	it('Should return ContentList based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getContentList.execute()).toEqual(expectedResponse);
	});
});