import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetAllTagsForUser} from '@copor/core/domain/Components/Tag/validation/ValidateGetAllTagsForUser';

describe('Get all tags for user validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user is not allowed to get all tags', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetAllTagsForUser = new ValidateGetAllTagsForUser('actorId', mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
