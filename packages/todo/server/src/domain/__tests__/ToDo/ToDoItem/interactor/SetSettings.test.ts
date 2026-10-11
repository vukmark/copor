import {SetSettingsRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/SetSettingsRepo';
import {SetSettingsDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SetSettingsDTO';
import {SetSettings} from '@copor/todo/domain/ToDo/ToDoItem/interactor/SetSettings';

describe('Test set default properties for todo', () => {
	const mockRepo: jest.Mocked<SetSettingsRepo> = {
		update: jest.fn()
	};
	const input: SetSettingsDTO = {
		alarmExists: false,
		displayedInCalendar: true
	};

	const settings = new SetSettings(input, mockRepo);

	it('Should change default propeties for todo', async () => {
		await settings.execute();
		expect(mockRepo.update).toHaveBeenCalledWith(input);
	});
});