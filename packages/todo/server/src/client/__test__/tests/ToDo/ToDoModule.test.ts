import {toDoModule} from '@copor/todo/client/ToDo/ToDoModule';

describe('ToDoModule', () => {
	it('cleans up its tag references when a tag is deleted', () => {
		expect(toDoModule.eventSubscribers?.tagDeleted).toBeDefined();
	});

	it('serves the TODO filter list', () => {
		expect(Object.keys(toDoModule.filterLists ?? {})).toEqual(['TODO']);
	});
});
