import {SaveToDoCategoryRepo} from '@copor/todo/domain/ToDo/ToDoCategory/repository/SaveToDoCategoryRepo';
import {CreateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/CreateToDoCategory';
import {SaveToDoCategoryDTO} from '@copor/todo/domain/ToDo/ToDoCategory/interactor/dto/SaveToDoCategoryDTO';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';

describe('Create to-do category tests', () => {
	let inputDto: SaveToDoCategoryDTO;
	let mockRepo: jest.Mocked<SaveToDoCategoryRepo>;
	let createToDoCategory: CreateToDoCategory;

	beforeEach(() => {
		inputDto = {
			id: 'unique-id',
			name: 'name',
			description: 'description',
			createdOn: new SimpleDate(5, 4, 2002),
			actorId: 'user-id'
		};
		mockRepo = {
			save: jest.fn()
		};
		createToDoCategory = new CreateToDoCategory(inputDto, mockRepo);
	});
	it('should save todo category', async () => {
		const saveDTO: SaveToDoCategoryDTO = {
			id: 'unique-id',
			name: 'name',
			description: 'description',
			createdOn: new SimpleDate(5, 4, 2002),
			actorId: 'user-id'
		};

		const result = await createToDoCategory.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(saveDTO);
	});
});
