import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidateGetState} from '@copor/core/domain/Components/State/validations/ValidateGetState';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetStateRepo} from '@copor/core/domain/Components/State/repository/ValidateGetStateRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidStateException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidStateException';

describe('test validate get state', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetStateRepo>;

	const inputDTO: ValidateGetStateDTO = {
		actorId: 'actor-id',
		stateId: 'state-id'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidState: jest.fn(),
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidState.mockResolvedValue(false);
	});

	it('should throw error if user has no permission to get state', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetState = new ValidateGetState(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if state is invalid', async () => {
		const errorList = new ErrorList([new InvalidStateException()]);

		mockStorageRepo.isInvalidState.mockResolvedValue(true);
		const validator = new ValidateGetState(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});