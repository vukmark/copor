import {ValidateDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateDeleteToDoComment';
import {ValidateDeleteToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateDeleteToDoCommentRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidToDoCommentException} from '@copor/todo/domain/ToDo/ToDoComment/exception/InvalidToDoCommentException';
import {ValidateDeleteToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateDeleteToDoCommentDTO';

describe('Test delete entry', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteToDoCommentRepo>;
	let inputDTO: ValidateDeleteToDoCommentDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDoComment: jest.fn()
		};
		inputDTO = {
			actorId: 'actor-id',
			id: 'comment-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDoComment.mockResolvedValue(false);
	});

	it('should throw error if todo comment id is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoCommentException()]);

		mockStorageRepo.isInvalidToDoComment.mockResolvedValue(true);
		const validator = new ValidateDeleteToDoComment(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to delete comment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteToDoComment(inputDTO, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
