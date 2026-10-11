import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/ValidateGetContractTypeRepo';
import {ValidateGetContractTypeDTO} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateGetContractTypeDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateGetContractType';
import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';

describe('Validate get contract type test', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetContractTypeRepo>;
	let input: ValidateGetContractTypeDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidContractType: jest.fn()
		};
		input = {
			actorId: 'actorId',
			contractType: 'contractType'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidContractType.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission to get Contract Type', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetContractType = new ValidateGetContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if Contract Type is invalid', async() => {
		const errorList = new ErrorList([new InvalidContractTypeException()]);
		const validator = new ValidateGetContractType(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidContractType.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});