import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateSearchTag} from '@copor/core/domain/Components/Tag/validation/ValidateSearchTag';

describe('validate search tag tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	const actorId: string = 'actorId';

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
	});
	it('should throw error if user cannot search tags', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateSearchTag = new ValidateSearchTag(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
