import {ValidateUpdateToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateUpdateToDoCommentDTO';
import {ValidateUpdateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/validations/repository/ValidateUpdateToDoComment';
import {ValidateUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateUpdateToDoComment';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {InvalidToDoCommentException} from '@copor/todo/domain/ToDo/ToDoComment/exception/InvalidToDoCommentException';

describe('validate update comment tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockRepo: jest.Mocked<ValidateUpdateToDoCommentRepo>;
	let inputDTO: ValidateUpdateToDoCommentDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockRepo = {
			isInvalidToDoComment: jest.fn(),
			isInvalidToDo: jest.fn()
		};

		inputDTO = {
			id: 'id',
			toDoId: 'tID',
			content: 'content',
			actorId: 'cID'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockRepo.isInvalidToDoComment.mockResolvedValue(false);
		mockRepo.isInvalidToDo.mockResolvedValue(false);
	});

	it('should throw error if user does not have permission to update comment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateUpdateToDoComment(inputDTO, mockPermissionRepo, mockRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if task id is not valid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		const validator = new ValidateUpdateToDoComment(inputDTO, mockPermissionRepo, mockRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockRepo.isInvalidToDo.mockResolvedValue(true);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if comment id is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoCommentException()]);

		const validator = new ValidateUpdateToDoComment(inputDTO, mockPermissionRepo, mockRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockRepo.isInvalidToDoComment.mockResolvedValue(true);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
