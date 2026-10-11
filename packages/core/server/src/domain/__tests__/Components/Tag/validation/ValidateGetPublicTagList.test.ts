import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetPublicTagList} from '@copor/core/domain/Components/Tag/validation/ValidateGetPublicTagList';

describe('Validate get public tag list tests', () => {
	it('Should throw error if user is not allowed to get the list', async () => {
		const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
			isAllowed: jest.fn()
		};
		const actorId: string = 'actorId';
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetPublicTagList(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});