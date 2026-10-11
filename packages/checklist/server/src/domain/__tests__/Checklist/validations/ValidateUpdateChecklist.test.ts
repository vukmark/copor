import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateUpdateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateUpdateChecklist';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateUpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateUpdateChecklistRepo';
import {InvalidChecklistException} from '@copor/checklist/domain/Checklist/exception/InvalidChecklistException';

describe('Test edit checklist validator', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateChecklistRepo>;
	let validator: ValidateUpdateChecklist;
	let input: SaveChecklistDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidChecklist: jest.fn()
		};
		input = {
			id: 'someId',
			title: 'title',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChecklist.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update checklist', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if checklist is invalid', async () => {
		const errorList = new ErrorList([new InvalidChecklistException()]);

		mockStorageRepo.isInvalidChecklist.mockResolvedValue(true);
		validator = new ValidateUpdateChecklist(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});