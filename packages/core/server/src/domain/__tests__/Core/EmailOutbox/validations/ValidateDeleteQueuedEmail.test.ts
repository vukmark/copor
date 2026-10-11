import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeleteQueuedEmailRepo} from '@copor/core/domain/Core/EmailOutbox/repository/ValidateDeleteQueuedEmailRepo';
import {ValidateDeleteQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/validation/dto/ValidateDeleteQueuedEmailDTO';
import {ValidateDeleteQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/validation/ValidateDeleteQueuedEmail';
import {InvalidQueuedEmailException} from '@copor/core/domain/Core/EmailOutbox/exception/InvalidQueuedEmailException';

describe('Validate deletion of a QueuedEmail', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteQueuedEmailRepo>;
	let input: ValidateDeleteQueuedEmailDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidQueuedEmail: jest.fn()
		};
		input = {
			actorId: 'someUserId',
			emailId: 'deletedQueuedEmailId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidQueuedEmail.mockResolvedValue(false);
	});

	it('Should throw if user has no permission to delete a QueuedEmail', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const validator = new ValidateDeleteQueuedEmail(input, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if QueuedEmail is invalid', async () => {
		const errorList = new ErrorList([new InvalidQueuedEmailException()]);

		const validator = new ValidateDeleteQueuedEmail(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidQueuedEmail.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});