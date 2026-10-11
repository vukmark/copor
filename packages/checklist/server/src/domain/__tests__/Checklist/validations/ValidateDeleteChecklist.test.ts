import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateDeleteChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateDeleteChecklistDTO';
import {ValidateDeleteChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateDeleteChecklistRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeleteChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateDeleteChecklist';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('Test validate delete checklist', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteChecklistRepo>;
	let input: ValidateDeleteChecklistDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklist: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'actor-id',
			checklistId: 'someId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklist.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist with provided id does not exist', async () => {
		const errorList = new ErrorList([new InvalidChecklistException()]);

		mockStorageRepo.isInvalidChecklist.mockResolvedValue(true);
		const validator = new ValidateDeleteChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if checklist has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});