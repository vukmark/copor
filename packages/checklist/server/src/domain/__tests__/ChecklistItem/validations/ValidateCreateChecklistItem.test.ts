import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateCreateChecklistItem';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateCreateChecklistItemRepo';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';
import {ValidateCreateChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateCreateChecklistItemDTO';

describe('Test create checklist', () => {
	let permissionRepo: jest.Mocked<PermissionRepository>;
	let storageRepo: jest.Mocked<ValidateCreateChecklistItemRepo>;
	let validator: ValidateCreateChecklistItem;
	let input: ValidateCreateChecklistItemDTO;

	beforeEach(() => {
		permissionRepo = {
			isAllowed: jest.fn()
		};
		storageRepo = {
			isInvalidChecklist: jest.fn()
		};
		input = {
			checklistId: 'checklistId',
			actorId: 'creator-id'
		};
		permissionRepo.isAllowed.mockResolvedValue(true);
		storageRepo.isInvalidChecklist.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to create checklist item', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		permissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateChecklistItem(input, permissionRepo, storageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist id is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistException()]);

		storageRepo.isInvalidChecklist.mockResolvedValue(true);
		validator = new ValidateCreateChecklistItem(input, permissionRepo, storageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});