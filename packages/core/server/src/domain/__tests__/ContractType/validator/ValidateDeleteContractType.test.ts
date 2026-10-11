import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateDeleteContractTypeRepo
} from '@copor/core/domain/Components/ContractType/repository/ValidateDeleteContractTypeRepo';
import {
	ValidateDeleteContractTypeDTO
} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateDeleteContractTypeDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeleteContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateDeleteContractType';
import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('Validate deletion of a contract type', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteContractTypeRepo>;
	let input: ValidateDeleteContractTypeDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidContractType: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'actorId',
			contractTypeId: 'contractTypeId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidContractType.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw if user has no permission to delete a Contract Type', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const validator = new ValidateDeleteContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if Contract Type is invalid', async () => {
		const errorList = new ErrorList([new InvalidContractTypeException()]);
		const validator = new ValidateDeleteContractType(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidContractType.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if Contract Type is referenced', async() => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);
		const validator = new ValidateDeleteContractType(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});