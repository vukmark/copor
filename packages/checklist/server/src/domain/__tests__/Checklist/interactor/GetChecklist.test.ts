import {GetChecklistRepo} from '@copor/checklist/domain/Checklist/repository/GetChecklistRepo';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';
import {GetChecklist} from '@copor/checklist/domain/Checklist/interactor/GetChecklist';

describe('test get checklist', () => {
	it('should return checklist', async() => {
		const mockGetChecklistRepo: jest.Mocked<GetChecklistRepo> = {
			load: jest.fn()
		};
		const uniqueId = 'checklist-id';
		const mockedReturnChecklist: GetChecklistDTO = {
			id: uniqueId,
			title: 'title'
		};

		mockGetChecklistRepo.load.mockResolvedValue(mockedReturnChecklist);
		const getChecklist = new GetChecklist(uniqueId, mockGetChecklistRepo);
		const result = await getChecklist.execute();

		expect(result).toEqual(mockedReturnChecklist);
		expect(mockGetChecklistRepo.load).toHaveBeenCalledWith(uniqueId);
	});
});