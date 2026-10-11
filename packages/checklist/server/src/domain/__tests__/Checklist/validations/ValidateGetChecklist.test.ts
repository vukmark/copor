import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';
import {ValidateGetChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateGetChecklistRepo';
import {ValidateGetChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateGetChecklistDTO';
import {ValidateGetChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateGetChecklist';


describe('Validate get checklist tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetChecklistRepo>;
	let input: ValidateGetChecklistDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklist: jest.fn()
		};
		input = {
			actorId: 'actorID',
			checklistId: 'checklistID'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklist.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission to get checklist', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetChecklist = new ValidateGetChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistException()]);
		const validator = new ValidateGetChecklist(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidChecklist.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});