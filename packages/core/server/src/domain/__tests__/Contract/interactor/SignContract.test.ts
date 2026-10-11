import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {SignContract} from '@copor/core/domain/Contract/interactor/SignContract';
import {SignContractRepo} from '@copor/core/domain/Contract/repository/SignContractRepo';
import {SignContractDTO} from '@copor/core/domain/Contract/interactor/dto/SignContractDTO';

describe('sign contract interactor tests', () => {
	const mockRepo: jest.Mocked<SignContractRepo> = {
		sign: jest.fn()
	};
	const input: SignContractDTO = {
		contractType: ContractType.TERMS_AND_CONDITIONS,
		userId: 'uid'
	};

	it('should sign contract', async () => {
		const interactor = new SignContract(input, mockRepo);

		await interactor.execute();
		expect(mockRepo.sign).toHaveBeenCalledWith(input);
	});
});