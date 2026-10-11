import {GetContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/GetContractTypeRepo';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetContractType} from '@copor/core/domain/Components/ContractType/interactor/GetContractType';

describe('get Contract Type interactor test', () => {
	const mockRepo: jest.Mocked<GetContractTypeRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetContractTypeDTO = {
		id: 'id',
		name: 'name',
		file: 'file',
		description: 'description',
		publishStatus: PublishStatus.published
	};
	const getContractType: GetContractType = new GetContractType('unique-id', mockRepo);

	it('should return Contract Type based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getContractType.execute()).toEqual(expectedResponse);
	});
});
