import {SetHoursForToDoAlertDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SetHoursForToDoAlertDTO';
import {ValidateSetHoursForToDoAlert} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateSetHoursForToDoAlert';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate set hours for todo alert tests', () => {
	let mockRepo: jest.Mocked<PermissionRepository>;
	let inputDto: SetHoursForToDoAlertDTO;

	beforeEach(() => {
		mockRepo = {
			isAllowed: jest.fn()
		};
		inputDto = {
			userId: 'user-id',
			hours: 6
		};
		mockRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user is not allowed to set todo alert hours', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateSetHoursForToDoAlert(inputDto, mockRepo);

		mockRepo.isAllowed.mockResolvedValue(false);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
