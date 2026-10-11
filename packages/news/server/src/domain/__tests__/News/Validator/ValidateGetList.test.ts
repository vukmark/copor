import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetNewsList} from '@copor/news/domain/News/validations/ValidateGetNewsList';

describe('Validate get News list tests', () => {
	it('Should throw error if user has no permission', async () => {
		const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
			isAllowed: jest.fn()
		};
		const actorId: string = 'actorId';
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetNewsList(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
