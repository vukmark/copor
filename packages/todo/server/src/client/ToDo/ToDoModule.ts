import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {toDoEventSubscribers} from '@copor/todo/client/ToDo/events/ToDoEventSubscribers';
import {toDoPermissionDefinitions} from '@copor/todo/domain/ToDo/ToDoPermissionDefinitions';
import {toDoFeatureDefinitions} from '@copor/todo/domain/ToDo/ToDoFeatureDefinitions';
import {ToDoRouter} from '@copor/todo/client/ToDo/router/ToDoRouter';
import {ToDoFilterListHelper} from '@copor/todo/client/ToDo/repositoryHelper/ToDoFilterListHelper';

export const toDoModule: CoporModule = {
	name: 'todo',
	localesFolder: path.join(__dirname, 'locales'),
	// The ToDo page shows the VuMeet chat list and opens attachments in Cloud's
	// file viewer (frontend), so an app with ToDo needs both.
	dependsOn: ['vu_meet', 'cloud'],
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: toDoPermissionDefinitions,
	features: toDoFeatureDefinitions,
	eventSubscribers: toDoEventSubscribers,
	filterLists: {
		TODO: (actorId) => ToDoFilterListHelper.getToDoFilterList(actorId)
	},
	routes: [
		{path: '/todo', router: ToDoRouter}
	]
};
