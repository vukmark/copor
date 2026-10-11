import {GetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/GetChecklistItemListRepo';
import {GetChecklistItemList} from '@copor/checklist/domain/ChecklistItem/interactor/GetChecklistItemList';
import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';

describe('Get list of activity types', () => {
	const mockRepo: jest.Mocked<GetChecklistItemListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetChecklistItemDTO[] = [{
		id: 'id',
		checklistId: 'checklistId',
		description: 'description',
		isChecked: false
	}];
	const getChecklistItemList: GetChecklistItemList = new GetChecklistItemList('id', mockRepo);

	it('Should list all Checklist Items', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getChecklistItemList.execute()).toEqual(expectedResponse);
	});
});