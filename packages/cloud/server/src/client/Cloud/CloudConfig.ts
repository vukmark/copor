import {AppContext} from '@copor/core/client/Interface/AppContext';

// Cloud's upload limit in MB (CLOUD_MAX_FILE_SIZE_MB): enforced by its upload
// routes and validator, and handed to the app as `moduleConfig.cloud.maxFileSize`.
export function cloudMaxFileSizeMb(appContext: AppContext): number {
	return Number(appContext.envVariables!.CLOUD_MAX_FILE_SIZE_MB);
}
