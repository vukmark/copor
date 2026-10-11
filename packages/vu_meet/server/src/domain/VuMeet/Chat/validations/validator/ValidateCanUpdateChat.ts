import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export class ValidateCanUpdateChat extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return VuMeetPermission.canUpdateChat;
	}
}
