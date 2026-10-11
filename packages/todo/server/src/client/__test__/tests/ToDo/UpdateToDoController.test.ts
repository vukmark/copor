import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {UpdateToDoReqBodyDTO} from '@copor/todo/client/ToDo/UpdateToDo/dto/UpdateToDoReqBodyDTO';
import {UpdateToDoController} from '@copor/todo/client/ToDo/UpdateToDo/UpdateToDoController';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

describe('test UpdateToDoController', () => {
	const requestBody: UpdateToDoReqBodyDTO = {
		id: 'some-id',
		type: ToDoType.PRIVATE,
		title: 'A title',
		priority: Priority.HIGH,
		isDisplayedInCalendar: false,
		isPinned: false,
		progress: Progress.TO_DO
	};

	testController(UpdateToDoController, requestBody, undefined);
});
