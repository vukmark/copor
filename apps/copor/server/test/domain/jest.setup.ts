jest.mock('@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate', () => {
	return {
		CurrentUTCDate: jest.fn().mockImplementation(() => ({
			currentUTCDate: new Date('2024-11-01T00:00:01.509Z')
		}))
	};
});

import {registerAllModuleDefinitions} from './helpers/allModuleDefinitions';

registerAllModuleDefinitions();
