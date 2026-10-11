import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {contentItemPermissionDefinitions} from '@copor/core/domain/ContentItem/ContentItemPermissionDefinitions';
import {contentItemFeatureDefinitions} from '@copor/core/domain/ContentItem/ContentItemFeatureDefinitions';
import {ContentItemRouter} from '@copor/core/client/ContentItem/router/ContentItemRouter';

export const contentItemModule: CoporModule = {
	name: 'content_item',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: contentItemPermissionDefinitions,
	features: contentItemFeatureDefinitions,
	routes: [
		{path: '/content-item', router: ContentItemRouter}
	]
};
