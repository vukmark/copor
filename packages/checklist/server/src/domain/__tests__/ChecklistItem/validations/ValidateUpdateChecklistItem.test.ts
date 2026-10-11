import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidChecklistItemException} from '@copor/checklist/domain/ChecklistItem/exception/InvalidChecklistItemException';
import {ValidateUpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateUpdateChecklistItem';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';
import {ValidateUpdateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateUpdateChecklistItemRepo';

describe('Test edit checklistItem validator', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateChecklistItemRepo>;
	let validator: ValidateUpdateChecklistItem;
	let input: SaveChecklistItemDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklistItem: jest.fn(),
			isInvalidChecklist: jest.fn()
		};
		input = {
			id: 'someId',
			description: 'some description',
			isChecked: true,
			checklistId: 'checklistId',
			actorId: 'some-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklistItem.mockResolvedValue(false);
		mockStorageRepo.isInvalidChecklist.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update checklist item', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if checklistItem is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistItemException()]);

		mockStorageRepo.isInvalidChecklistItem.mockResolvedValue(true);
		validator = new ValidateUpdateChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistItemException()]);

		mockStorageRepo.isInvalidChecklistItem.mockResolvedValue(true);
		validator = new ValidateUpdateChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});