import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {cloudPermissionDefinitions} from '@copor/cloud/domain/Cloud/CloudPermissionDefinitions';
import {cloudFeatureDefinitions} from '@copor/cloud/domain/Cloud/CloudFeatureDefinitions';
import {CloudRouter} from '@copor/cloud/client/Cloud/router/CloudRouter';
import {CloudCategoryRouter} from '@copor/cloud/client/Cloud/CloudCategory/router/CloudCategoryRouter';
import {cloudPreferenceDefinitions} from '@copor/cloud/domain/Cloud/CloudPreferenceDefinitions';
import {cloudMaxFileSizeMb} from '@copor/cloud/client/Cloud/CloudConfig';

export const cloudModule: CoporModule = {
	name: 'cloud',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: cloudPermissionDefinitions,
	features: cloudFeatureDefinitions,
	routes: [
		{path: '/cloud/', router: CloudRouter},
		{path: '/cloud-category', router: CloudCategoryRouter}
	],
	preferences: cloudPreferenceDefinitions,
	clientConfig: (appContext) => ({maxFileSize: cloudMaxFileSizeMb(appContext)})
};
