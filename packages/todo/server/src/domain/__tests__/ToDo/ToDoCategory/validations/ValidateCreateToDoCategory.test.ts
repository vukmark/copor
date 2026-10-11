import {ValidateCreateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/validations/ValidateCreateToDoCategory';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyTitleException} from '@copor/core/domain/Core/Exceptions/empty/EmptyTitleException';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {SaveToDoCategoryDTO} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/dto/SaveToDoCategoryDTO';

describe('validate can create todo category', () => {
	let mockRepo: jest.Mocked<PermissionRepository>;
	let inputDto: SaveToDoCategoryDTO;

	beforeEach(() => {
		mockRepo = {
			isAllowed: jest.fn()
		};
		inputDto = {
			id: 'unique-id',
			name: 'name',
			description: 'description',
			createdOn: new SimpleDate(2, 2, 2005),
			actorId: 'user-id'
		};
		mockRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user is not allowed to create todo category', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateCreateToDoCategory(inputDto, mockRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyTitleException()]);

		inputDto.name = '';
		const validator = new ValidateCreateToDoCategory(inputDto, mockRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should pass validation', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockRepo.isAllowed.mockResolvedValue(true);
		const validator = new ValidateCreateToDoCategory(inputDto, mockRepo);

		const result = await validator.validate();

		expect(result).not.toStrictEqual(errorList);
	});
});
