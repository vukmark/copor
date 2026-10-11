import {DeleteCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/DeleteCalendarEntryRepo';
import {DeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/DeleteCalendarEntry';

describe('Delete CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<DeleteCalendarEntryRepo> = {
		delete: jest.fn()
	};
	const deleteCalendarEntry = new DeleteCalendarEntry('CalendarEntry-id', mockRepo);

	it('Should delete a CalendarEntry', async () => {
		await deleteCalendarEntry.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('CalendarEntry-id');
	});
});
