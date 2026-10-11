import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {GetToDoController, GetToDoParams} from '@copor/todo/client/ToDo/GetToDo/GetToDoController';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

describe('Test Get ToDo Controller', () => {
	const requestParams: GetToDoParams = {
		id: '11',
		type: ToDoType.PRIVATE
	};

	testController(GetToDoController, undefined, requestParams);
});