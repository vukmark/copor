import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export class ValidateCanMarkChatMessagesSeen extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return VuMeetPermission.canMarkMessagesSeen;
	}
}
