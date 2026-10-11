import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {checklistPermissionDefinitions} from '@copor/checklist/domain/Checklist/ChecklistPermissionDefinitions';
import {ChecklistRouter} from '@copor/checklist/client/Checklist/router/ChecklistRouter';

export const checklistModule: CoporModule = {
	name: 'checklist',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	dependsOn: ['todo'],
	permissions: checklistPermissionDefinitions,
	routes: [
		{path: '/checklist', router: ChecklistRouter}
	]
};
