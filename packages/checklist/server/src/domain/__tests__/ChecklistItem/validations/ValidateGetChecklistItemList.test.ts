import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateGetChecklistItemListRepo';
import {ValidateGetChecklistItemListDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateGetChecklistItemListDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetChecklistItemList} from '@copor/checklist/domain/ChecklistItem/validations/ValidateGetChecklistItemList';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';

describe('Validate Get checklist item tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetChecklistItemListRepo>;
	let input: ValidateGetChecklistItemListDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklist: jest.fn()
		};
		input = {
			actorId: 'actorId',
			checklistId: 'checklistId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklist.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission to get checklist item', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetChecklistItemList = new ValidateGetChecklistItemList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist item is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistException()]);
		const validator = new ValidateGetChecklistItemList(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidChecklist.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});