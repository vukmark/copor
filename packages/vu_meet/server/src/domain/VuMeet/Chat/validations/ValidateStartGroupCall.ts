import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateStartGroupCallDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateStartGroupCallDTO';
import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';
import {ValidateChat} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChat';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';

class ValidateCanStartGroupCall extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return VuMeetPermission.canStartGroupCall;
	}
}

// "Group" and "private" calls both validate against the same chat/chat_user_map
// entity (see ChatKyselyHelper) - this reuses ValidateStartPrivateCall's shared
// ValidateChat/ValidateIsChatMember validators rather than duplicating them.
export class ValidateStartGroupCall extends ValidationWithPermissionAndRepo<ValidateStartGroupCallDTO, ValidateStartPrivateCallRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanStartGroupCall(this.permissionRepo, this.input.actorId),
			new ValidateChat(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.actorId, chatId: this.input.chatId})
		];
	}
}