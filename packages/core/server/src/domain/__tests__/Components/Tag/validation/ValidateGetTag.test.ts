import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetTagRepo} from '@copor/core/domain/Components/Tag/repository/ValidateGetTagRepo';
import {ValidateGetTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateGetTagDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetTag} from '@copor/core/domain/Components/Tag/validation/ValidateGetTag';
import {InvalidTagException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTagException';

describe('test validate get tag', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetTagRepo>;
	const input: ValidateGetTagDTO = {
		actorId: 'actorId',
		tagId: 'tagId'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTag: jest.fn()
		};
		mockStorageRepo.isInvalidTag.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error f user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetTag = new ValidateGetTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if tag is invalid', async () => {
		const errorList = new ErrorList([new InvalidTagException()]);

		mockStorageRepo.isInvalidTag.mockResolvedValue(true);
		const validator = new ValidateGetTag(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});