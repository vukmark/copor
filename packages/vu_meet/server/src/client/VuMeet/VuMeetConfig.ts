import {AppContext} from '@copor/core/client/Interface/AppContext';

// VuMeet's attachment limit in MB (VU_MEET_MAX_FILE_SIZE_MB): enforced by its
// message upload route and validator, and handed to the app as
// `moduleConfig.vu_meet.maxFileSize`.
export function vuMeetMaxFileSizeMb(appContext: AppContext): number {
	return Number(appContext.envVariables!.VU_MEET_MAX_FILE_SIZE_MB);
}
