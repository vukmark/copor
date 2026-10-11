import {GetToDoCategoryListRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/GetToDoCategoryListRepo';
import {GetToDoCategoryList} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/GetToDoCategoryList';
import {GetToDoCategoryDTO} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/dto/GetToDoCategoryDTO';

describe('get todo category list test', () => {
	const mockGetToDoCategoryListRepo: jest.Mocked<GetToDoCategoryListRepo> = {
		list: jest.fn()
	};
	const listToDoCategoryList: GetToDoCategoryList = new GetToDoCategoryList([], mockGetToDoCategoryListRepo);

	it('should return list of todo categories', async () => {
		mockGetToDoCategoryListRepo.list.mockResolvedValue(mockListResponse());
		const result = await listToDoCategoryList.execute();

		expect(result).toEqual(mockListResponse());
	});
});
function mockListResponse(): GetToDoCategoryDTO[] {
	return [{id: 'id1',
		name: 'name1',
		description: 'description1'}, {id: 'id2',
		name: 'name2',
		description: 'description2'}];
}
