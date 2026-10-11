import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {UpdateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/UpdateToDoCategory';
import {SaveToDoCategoryDTO} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/dto/SaveToDoCategoryDTO';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';

describe('update todo category tests', () => {
	const mockRepo: jest.Mocked<SaveItem<SaveToDoCategoryDTO>> = {
		save: jest.fn()
	};
	const input: SaveToDoCategoryDTO = {
		id: 'id',
		name: 'name',
		description: 'description',
		createdOn: new SimpleDate(5, 4, 2002),
		actorId: 'creator-id'
	};
	const updateToDoCategory = new UpdateToDoCategory(input, mockRepo);

	it('should update todo category', async () => {
		await updateToDoCategory.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
