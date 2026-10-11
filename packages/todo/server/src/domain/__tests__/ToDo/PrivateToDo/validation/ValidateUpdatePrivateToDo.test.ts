import {ValidateUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateUpdatePrivateToDo';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {ValidateUpdatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateUpdatePrivateToDoRepo';
import {InvalidToDoException} from '@copor/todo/domain/ToDo/ToDoItem/exception/InvalidToDoException';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {EmptyTitleException} from '@copor/core/domain/Core/Exceptions/empty/EmptyTitleException';
import {InvalidTagException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTagException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidUserIdException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidUserIdException';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('Validate update todo', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdatePrivateToDoRepo>;
	let validator: ValidateUpdatePrivateToDo;
	let input: SavePrivateToDoDTO;

	beforeEach(() => {
		input = {
			id: 'some-id',
			title: 'todo',
			actorId: 'creator-id',
			tagList: ['tag'],
			priority: Priority.HIGH,
			isDisplayedInCalendar: true,
			isPinned: false,
			progress: Progress.HALF_WAY
		};
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidToDo: jest.fn(),
			isInvalidTag: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidToDo.mockResolvedValue(false);
		mockStorageRepo.isInvalidTag.mockResolvedValue(false);
	});

	it('Should throw error if no permission to update the todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if title is empty', async () => {
		const errorList = new ErrorList([new EmptyTitleException()]);

		input.title = '';
		validator = new ValidateUpdatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if actorId is empty', async () => {
		const errorList = new ErrorList([new InvalidUserIdException()]);

		input.actorId = '';
		validator = new ValidateUpdatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw if ToDo is invalid', async () => {
		const errorList = new ErrorList([new InvalidToDoException()]);

		mockStorageRepo.isInvalidToDo.mockResolvedValue(true);
		validator = new ValidateUpdatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw if tagList is invalid', async () => {
		const errorList = new ErrorList([new InvalidTagException()]);

		input.tagList = ['some-tag-id'];
		mockStorageRepo.isInvalidTag.mockResolvedValue(true);
		validator = new ValidateUpdatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
