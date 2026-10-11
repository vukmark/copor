import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdatePrivateToDo, LogUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogUpdatePrivateToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('Log todo update', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdatePrivateToDo>> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdatePrivateToDo = {
		id: 'unique-id',
		title: 'title',
		tagList: ['tag'],
		priority: Priority.HIGH,
		isDisplayedInCalendar: true,
		progress: Progress.ALMOST_DONE,
		deadline: new Date(12, 12, 2025),
		scheduledTime: new Date(11, 11, 2012),
		isPinned: true
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdatePrivateToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updatePrivateToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdatePrivateToDo = new LogUpdatePrivateToDo(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});