import {GetPrivateToDoRepo} from '@copor/todo/domain/ToDo/PrivateToDo/repository/GetPrivateToDoRepo';
import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {GetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/GetPrivateToDo';

describe('test get entry', () => {
	const mockGetEntryRepo: jest.Mocked<GetPrivateToDoRepo> = {
		load: jest.fn()
	};
	const mockedReturnEntry: GetPrivateToDoDTO = {
		id: 'unique-id',
		title: 'entry',
		priority: Priority.NORMAL,
		isDisplayedInCalendar: true,
		isPinned: false
	};

	it('should return entry', async () => {
		const getEntry = new GetPrivateToDo('unique-id', mockGetEntryRepo);

		mockGetEntryRepo.load.mockResolvedValue(mockedReturnEntry);
		expect(await getEntry.execute()).toEqual(mockedReturnEntry);
	});
});