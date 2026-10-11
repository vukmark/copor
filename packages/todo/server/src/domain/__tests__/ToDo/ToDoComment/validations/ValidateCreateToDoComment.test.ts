import {ValidateCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateCreateToDoComment';
import {ValidateCreateToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/ValidateCreateToDoCommentRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyContentException} from '@copor/core/domain/Core/Exceptions/EmptyContentException';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate create todo comment tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateToDoCommentRepo>;
	let inputDto: SaveToDoCommentDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDo: jest.fn()
		};
		inputDto = {
			id: 'unique-id',
			toDoId: 'entry-id',
			content: 'content',
			createdAt: new Date(1, 1, 1998, 22, 11),
			actorId: 'unique-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to create todo comment', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateCreateToDoComment(inputDto, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if content is empty', async () => {
		const errorList = new ErrorList([new EmptyContentException()]);

		inputDto.content = '';
		const validator = new ValidateCreateToDoComment(inputDto, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if todo id is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		const validator = new ValidateCreateToDoComment(inputDto, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
