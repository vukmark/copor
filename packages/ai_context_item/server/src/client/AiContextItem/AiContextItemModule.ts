import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {aiContextItemPermissionDefinitions} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermissionDefinitions';
import {aiContextItemFeatureDefinitions} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeatureDefinitions';
import {AiContextItemRouter} from '@copor/ai_context_item/client/AiContextItem/router/AiContextItemRouter';

export const aiContextItemModule: CoporModule = {
	name: 'ai_context_item',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: aiContextItemPermissionDefinitions,
	features: aiContextItemFeatureDefinitions,
	routes: [
		{path: '/ai-context-item', router: AiContextItemRouter}
	]
};
