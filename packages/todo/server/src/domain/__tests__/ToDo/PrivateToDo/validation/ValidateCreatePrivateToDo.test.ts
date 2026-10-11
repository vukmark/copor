import {ValidateCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateCreatePrivateToDo';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {ValidateCreatePrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/ValidateCreatePrivateToDoRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidTagException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTagException';
import {EmptyTitleException} from '@copor/core/domain/Core/Exceptions/empty/EmptyTitleException';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidUserIdException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidUserIdException';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('test create todo validator', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreatePrivateToDo;
	let mockStorageRepo: jest.Mocked<ValidateCreatePrivateToDoRepo>;
	let input: SavePrivateToDoDTO;

	beforeEach(() => {
		input = {
			id: 'id',
			title: 'title',
			actorId: 'actorID',
			tagList: ['tag'],
			priority: Priority.HIGH,
			isDisplayedInCalendar: true,
			progress: Progress.HALF_WAY,
			deadline: new Date(1, 1, 2001, 12, 55),
			scheduledTime: new Date(1, 1, 2001, 12, 55),
			isPinned: true
		};
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTag: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidTag.mockResolvedValue(false);
	});

	it('should throw error if one tag id from tag list is invalid', async () => {
		const errorList = new ErrorList([new InvalidTagException()]);

		mockStorageRepo.isInvalidTag.mockResolvedValue(true);
		validator = new ValidateCreatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if dont have permission to create todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		validator = new ValidateCreatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if actorId is empty', async () => {
		const errorList = new ErrorList([new InvalidUserIdException()]);

		input.actorId = '';
		validator = new ValidateCreatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if title is empty', async () => {
		const errorList = new ErrorList([new EmptyTitleException()]);

		input.title = '';
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		validator = new ValidateCreatePrivateToDo(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
