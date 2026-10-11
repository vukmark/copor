import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeleteTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateDeleteTagRepo';
import {ValidateDeleteTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateDeleteTagDTO';
import {ValidateDeleteTag} from '@copor/core/domain/Components/Tag/validation/ValidateDeleteTag';
import {InvalidTagException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTagException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('Validate delete tag tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteTagRepo>;
	let input: ValidateDeleteTagDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTag: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'unique-id',
			tagId: 'unique-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidTag.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});
	it('Should throw error if user has no permission to delete tag', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if tag id is invalid', async() => {
		const errorList = new ErrorList([new InvalidTagException()]);

		mockStorageRepo.isInvalidTag.mockResolvedValue(true);
		const validator = new ValidateDeleteTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if tag has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
