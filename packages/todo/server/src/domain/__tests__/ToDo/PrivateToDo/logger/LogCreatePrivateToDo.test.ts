import {LogCreatePrivateToDo, LogDataForCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogCreatePrivateToDo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

describe('log create todo', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreatePrivateToDo>> = {
		save: jest.fn()
	};

	const logData: LogDataForCreatePrivateToDo = {
		id: 'unique-id',
		title: 'title',
		actorId: 'aID',
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

	const expectedLog: LogForSave<LogDataForCreatePrivateToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createPrivateToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreatePrivateToDo = new LogCreatePrivateToDo(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});