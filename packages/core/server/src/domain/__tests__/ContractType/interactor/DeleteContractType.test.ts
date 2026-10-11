import {DeleteContractType} from '@copor/core/domain/Components/ContractType/interactor/DeleteContractType';
import {DeleteContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/DeleteContractTypeRepo';

describe('Delete Contract Type', () => {
	const mockRepo: jest.Mocked<DeleteContractTypeRepo> = {
		delete: jest.fn()
	};
	const deleteContractType = new DeleteContractType('contractType-id', mockRepo);

	it('Should delete a Contract Type', async () => {
		await deleteContractType.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('contractType-id');
	});
});
