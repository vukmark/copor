import {SaveContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/SaveContractTypeRepo';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {UpdateContractType} from '@copor/core/domain/Components/ContractType/interactor/UpdateContractType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('update Contract Type test', () => {
	let mockRepo: jest.Mocked<SaveContractTypeRepo>;
	let inputDTO: SaveContractTypeDTO;
	let updateContractType: UpdateContractType;

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
		updateContractType = new UpdateContractType(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateContractType.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});