import {GetAllToDosForUserDTO} from '@copor/todo/domain/ToDo/Core/interactor/dto/GetAllToDosForUserDTO';
import {GetAllToDosForUserRepo} from '@copor/todo/domain/ToDo/Core/repository/GetAllToDosForUserRepo';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export class FakeGetAllToDosForUserInteractorRepo implements GetAllToDosForUserRepo {
	load(userId: string, filterList: GetFilterDTO[]): Promise<GetAllToDosForUserDTO[]> {
		return Promise.resolve([
			{
				id: 'id',
				title: 'Daily Checklist',
				isPrivate: true,
				tagList: [
					{id: 'tag1', name: 'Errands', color: Color.green, colorSet: ColorSet.SET9, isPrivate: true},
					{id: 'tag2', name: 'Projects', color: Color.blue, colorSet: ColorSet.SET9, isPrivate: true}
				],
				priority: Priority.NORMAL,
				progress: Progress.STARTED,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id2',
				title: 'Project & Group Work Tasks',
				isPrivate: true,
				tagList: [
					{id: 'tag1', name: 'Errands', color: Color.amber, colorSet: ColorSet.SET5, isPrivate: true},
					{id: 'tag2', name: 'Physics', color: Color.purple, colorSet: ColorSet.SET5, isPrivate: true},
					{id: 'tag3', name: 'Lab Reports', color: Color.black, colorSet: ColorSet.SET5, isPrivate: true}
				],
				priority: Priority.HIGH,
				progress: Progress.TO_DO,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id3',
				title: 'Exam Prep To-Do List',
				isPrivate: true,
				priority: Priority.URGENT,
				progress: Progress.HALF_WAY,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id4',
				title: 'Class Notes & Revisions',
				isPrivate: true,
				priority: Priority.HIGH,
				progress: Progress.ALMOST_DONE,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id5',
				title: 'The Ultimate Master Plan for Conquering All My Tasks, Projects, Reviews, and Deadlines While Staying Organized and Stress-Free This Quarter',
				isPrivate: true,
				priority: Priority.NORMAL,
				progress: Progress.STARTED,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id6',
				title: 'Practice free throws for 20 minutes',
				isPrivate: true,
				tagList: [
					{id: 'tag1', name: 'Errands', color: Color.amber, colorSet: ColorSet.SET5, isPrivate: true},
					{id: 'tag2', name: 'Sport', color: Color.brown, colorSet: ColorSet.SET5, isPrivate: true}
				],
				priority: Priority.NORMAL,
				progress: Progress.HALF_WAY,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			},
			{
				id: 'id7',
				title: 'Learn and memorize the chorus of "Al Compas De Mi Caballo" on the guitar',
				isPrivate: true,
				tagList: [
					{id: 'tag1', name: 'Errands', color: Color.amber, colorSet: ColorSet.SET5, isPrivate: true},
					{id: 'tag2', name: 'Music', color: Color.blue, colorSet: ColorSet.SET5, isPrivate: true}
				],
				priority: Priority.NORMAL,
				progress: Progress.HALF_WAY,
				isDisplayedInCalendar: true,
				isPinned: true,
				toDoListName: 'listName',
				type: ToDoType.PRIVATE
			}
		]);
	}
}
