import {ValidateGetToDoCategoryList} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateGetToDoCategoryList';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate list todo categories test', () => {
	const mockRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};

	it('should throw error if user is not allowed to list todo categories', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetToDoCategoryList('unique-id', mockRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
