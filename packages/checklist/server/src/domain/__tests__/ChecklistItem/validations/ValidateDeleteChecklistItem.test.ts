import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeleteChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateDeleteChecklistItemDTO';
import {ValidateDeleteChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateDeleteChecklistItemRepo';
import {ValidateDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateDeleteChecklistItem';
import {InvalidChecklistItemException} from '@copor/checklist/domain/ChecklistItem/exception/InvalidChecklistItemException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';


describe('Validate delete checklistItem item', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteChecklistItemRepo>;
	let input: ValidateDeleteChecklistItemDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklistItem: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'actor-id',
			checklistItemId: 'someId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklistItem.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklistItem with provided id does not exist', async () => {
		const errorList = new ErrorList([new InvalidChecklistItemException()]);

		mockStorageRepo.isInvalidChecklistItem.mockResolvedValue(true);
		const validator = new ValidateDeleteChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklistitem has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteChecklistItem(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});