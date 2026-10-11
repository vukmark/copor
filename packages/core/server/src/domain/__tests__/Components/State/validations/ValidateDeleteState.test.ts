import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteStateRepo} from '@copor/core/domain/Components/State/repository/ValidateDeleteStateRepo';
import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidateDeleteState} from '@copor/core/domain/Components/State/validations/ValidateDeleteState';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete state', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteStateRepo>;
	let input: ValidateGetStateDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidState: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			stateId: 'unique-id',
			actorId: 'user-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized for deleting', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if state id is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		const validator = new ValidateDeleteState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
