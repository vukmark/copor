import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateCreateContractType';
import {
	ValidateCreateContractTypeDTO
} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateCreateContractTypeDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyFileNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyFileNameException';

describe('validate create ContractType tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateContractType;
	let input: ValidateCreateContractTypeDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		input = {
			name: 'name',
			file: 'file',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not authorized to create ContractType', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateContractType(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateCreateContractType(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if file name is empty', async () => {
		const errorList = new ErrorList([new EmptyFileNameException()]);

		input.file = '';
		validator = new ValidateCreateContractType(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
