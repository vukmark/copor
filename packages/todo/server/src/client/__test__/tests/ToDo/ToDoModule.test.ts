import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {toDoModule} from '@copor/todo/client/ToDo/ToDoModule';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {ToDoFeature} from '@copor/todo/domain/ToDo/ToDoFeature';

describe('ToDoModule', () => {
	it('cleans up its tag references when a tag is deleted', () => {
		expect(toDoModule.eventSubscribers?.tagDeleted).toBeDefined();
	});

	it('serves the TODO filter list', () => {
		expect(Object.keys(toDoModule.filterLists ?? {})).toEqual(['TODO']);
	});
});

testModuleDefinitions(toDoModule, ToDoPermission, ToDoFeature);
