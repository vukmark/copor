import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {DeleteToDoController, DeleteToDoParams} from '@copor/todo/client/ToDo/DeleteToDo/DeleteToDoController';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

describe('test DeleteToDo', () => {
	const deleteToDoRequestParams: DeleteToDoParams = {
		id: '1',
		type: ToDoType.PRIVATE
	};

	testController(DeleteToDoController, undefined, deleteToDoRequestParams);
});