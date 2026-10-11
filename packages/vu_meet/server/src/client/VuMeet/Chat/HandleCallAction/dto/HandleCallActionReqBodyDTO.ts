import {CallType} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallType';
import {CallAction} from '@copor/vu_meet/client/VuMeet/Chat/HandleCallAction/dto/CallAction';

export interface HandleCallActionReqBodyDTO {
	chatId: string;
	type: CallType;
	action: CallAction;
	// Only meaningful for END_CALL: how long the call actually lasted, computed
	// by whichever side ends it and relayed to the other participant so both
	// screens show the same duration instead of each timing its own teardown.
	durationSeconds?: number;
}