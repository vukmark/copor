import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {CreateToDoController} from '@copor/todo/client/ToDo/CreateToDo/CreateToDoController';
import {CreateToDoReqBodyDTO} from '@copor/todo/client/ToDo/CreateToDo/dto/CreateToDoReqBodyDTO';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

describe('test CreateToDoController', () => {
	const requestBody: CreateToDoReqBodyDTO = {
		title: 'Title of a ToDo',
		priority: Priority.HIGH,
		isDisplayedInCalendar: true,
		isPinned: true,
		progress: Progress.TO_DO,
		type: ToDoType.PRIVATE
	};

	testController(CreateToDoController, requestBody, undefined);
});
