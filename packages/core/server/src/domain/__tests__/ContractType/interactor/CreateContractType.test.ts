import {CreateContractType} from '@copor/core/domain/Components/ContractType/interactor/CreateContractType';
import {SaveContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/SaveContractTypeRepo';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Create ContractType User', () => {
	let createContractType: CreateContractType;
	let mockRepo: jest.Mocked<SaveContractTypeRepo>;
	let inputDTO: SaveContractTypeDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'id',
			name: 'name',
			file: 'file',
			description: 'description',
			publishStatus: PublishStatus.published,
			actorId: 'actorId'
		};
		createContractType = new CreateContractType(inputDTO, mockRepo);
	});
	it('should save ContractType', async () => {
		const result = await createContractType.execute();

		expect(result).toEqual('id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
