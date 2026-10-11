import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateUpdateContractTypeRepo
} from '@copor/core/domain/Components/ContractType/repository/ValidateUpdateContractTypeRepo';
import {ValidateUpdateContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateUpdateContractType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyFileNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyFileNameException';

describe('validate update Contract Type', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateContractTypeRepo>;
	let validator: ValidateUpdateContractType;
	let input: SaveContractTypeDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidContractType: jest.fn()
		};
		input = {
			id: 'id',
			name: 'name',
			file: 'file',
			description: 'description',
			actorId: 'actorId',
			publishStatus: PublishStatus.published
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidContractType.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update Contract Type', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateUpdateContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if Contract Type is invalid', async () => {
		const errorList = new ErrorList([new InvalidContractTypeException()]);

		mockStorageRepo.isInvalidContractType.mockResolvedValue(true);
		validator = new ValidateUpdateContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		validator = new ValidateUpdateContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if file name is empty', async () => {
		const errorList = new ErrorList([new EmptyFileNameException()]);

		input.file = '';
		validator = new ValidateUpdateContractType(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});