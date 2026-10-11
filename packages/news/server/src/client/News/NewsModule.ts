import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {newsPermissionDefinitions} from '@copor/news/domain/News/NewsPermissionDefinitions';
import {newsFeatureDefinitions} from '@copor/news/domain/News/NewsFeatureDefinitions';
import {NewsRouter} from '@copor/news/client/News/router/NewsRouter';

export const newsModule: CoporModule = {
	name: 'news',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: newsPermissionDefinitions,
	features: newsFeatureDefinitions,
	routes: [
		{path: '/news', router: NewsRouter}
	]
};
