import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateSignContract} from '@copor/core/domain/Contract/validation/ValidateSignContract';
import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';
import {ValidateSignContractDTO} from '@copor/core/domain/Contract/validation/dto/ValidateSignContractDTO';
import {ValidateSignContractRepo} from '@copor/core/domain/Contract/repository/ValidateSignContractRepo';

describe('sign contract validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateSignContractRepo> = {
		isInvalidContractType: jest.fn()
	};
	const input: ValidateSignContractDTO = {
		userId: 'uid',
		contractType: ContractType.TERMS_AND_CONDITIONS,
		actorId: 'actorId'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidContractType.mockResolvedValue(false);
	});
	it('Should throw error if contract type is invalid', async () => {
		const errorList = new ErrorList([new InvalidContractTypeException()]);

		mockStorageRepo.isInvalidContractType.mockResolvedValue(true);
		const validator = new ValidateSignContract(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});