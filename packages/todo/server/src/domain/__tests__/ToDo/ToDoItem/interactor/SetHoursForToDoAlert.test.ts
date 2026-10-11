import Mocked = jest.Mocked;
import {SetHoursForToDoAlertRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/SetHoursForToDoAlertRepo';
import {SetHoursForToDoAlertDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SetHoursForToDoAlertDTO';
import {SetHoursForToDoAlert} from '@copor/todo/domain/ToDo/ToDoItem/interactor/SetHoursForToDoAlert';

describe('set hours for todo alert', () => {
	let mockRepo: Mocked<SetHoursForToDoAlertRepo>;
	const inputDto: SetHoursForToDoAlertDTO = {
		hours: 4,
		userId: 'user-id'
	};
	let setHoursForToDoAlert: SetHoursForToDoAlert;

	beforeEach(() => {
		mockRepo = {
			setHours: jest.fn()
		};
		setHoursForToDoAlert = new SetHoursForToDoAlert(inputDto, mockRepo);
	});
	it('should set hours for todo alert for user', async () => {
		await setHoursForToDoAlert.execute();
		expect(mockRepo.setHours).toHaveBeenCalledWith(inputDto);
	});
});
