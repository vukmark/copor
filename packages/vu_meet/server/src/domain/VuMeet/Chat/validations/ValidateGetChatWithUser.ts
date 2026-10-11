import {ValidateGetChatWithUserDTO} from './dto/ValidateGetChatWithUserDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetChatForUsers
} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanGetChatForUsers';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGroupChatName} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateGroupChatName';
import {ValidateChatMemberCount} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateChatMemberCount';
import {
	ValidateNoDuplicateChatMembers
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateNoDuplicateChatMembers';
import {ValidateGetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatWithUserRepo';
import {ValidateUserIsVisible} from '@copor/core/domain/User/VisibleUsers/validation/ValidateUserIsVisible';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export class ValidateGetChatWithUser
	extends ValidationWithPermissionAndRepo<ValidateGetChatWithUserDTO, ValidateGetChatWithUserRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetChatForUsers(this.permissionRepo, this.input.actorId),
			new ValidateChatMemberCount(this.input.users.length + 1),
			new ValidateNoDuplicateChatMembers([...this.input.users, this.input.actorId]),
			new ValidateGroupChatName(this.input.users.length + 1, this.input.groupName),
			// Every member must be one VuMeet's contact list could list for the actor.
			...this.input.users.map((userId) => new ValidateUserIsVisible(this.storageRepo, {
				actorId: this.input.actorId,
				userId,
				permissionType: VuMeetPermission.canGetVuMeetContactList,
				activeOnly: true
			}))
		];
	}
}
