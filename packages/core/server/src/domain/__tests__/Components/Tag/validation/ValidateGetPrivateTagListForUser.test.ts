import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/validation/ValidateGetPrivateTagListForUser';

describe('Get private tag list for user validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user is not allowed to get private tags', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetPrivateTagListForUser = new ValidateGetPrivateTagListForUser('actorId', mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
