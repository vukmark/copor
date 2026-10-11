import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {helpPermissionDefinitions} from '@copor/help/domain/Help/HelpPermissionDefinitions';
import {helpFeatureDefinitions} from '@copor/help/domain/Help/HelpFeatureDefinitions';
import {HelpRouter} from '@copor/help/client/Help/router/HelpRouter';

// Help, About (changelog + app installation) and Tools pages. The server
// declares the features and their view permissions, so an app without Help
// gets no menu entry for them, and serves the changelog (public, read from
// `changelog/*.md`).
export const helpModule: CoporModule = {
	name: 'help',
	localesFolder: path.join(__dirname, 'locales'),
	permissions: helpPermissionDefinitions,
	features: helpFeatureDefinitions,
	routes: [
		{path: '/help', router: HelpRouter}
	]
};
