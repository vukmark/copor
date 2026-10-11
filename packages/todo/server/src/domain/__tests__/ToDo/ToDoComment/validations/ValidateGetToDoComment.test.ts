import {ValidateGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateGetToDoComment';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {EmptyIdException} from '@copor/core/domain/Core/Exceptions/empty/EmptyIdException';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateGetToDoCommentDTO';

describe('test validate get comment', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if comment ID is empty', async () => {
		const errorList = new ErrorList([new EmptyIdException()]);

		const inputDTO: ValidateGetToDoCommentDTO = {
			actorId: 'actor-id',
			id: ''
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);

		const validator = new ValidateGetToDoComment(inputDTO, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to get comment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const inputDTO: ValidateGetToDoCommentDTO = {
			actorId: 'actor-id',
			id: 'comment-id'
		};
		const validator = new ValidateGetToDoComment(inputDTO, mockPermissionRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});