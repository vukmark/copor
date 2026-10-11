import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsUserNotVisibleRepo} from '@copor/core/domain/User/VisibleUsers/repository/IsUserNotVisibleRepo';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatRepo';
import {ValidateUserIsVisible} from '@copor/core/domain/User/VisibleUsers/validation/ValidateUserIsVisible';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export interface ValidateAddedChatMemberIsVisibleDTO {
	actorId: string;
	chatId: string;
	userId: string;
}

// A user added to an existing chat must be one VuMeet's contact list could list
// for the actor. Members already in the chat are kept as they are, even if
// they've left the actor's scope since, so renaming a group or removing someone
// never fails because of them.
export class ValidateAddedChatMemberIsVisible
	extends ValidatorWithRepo<IsUserNotInChatRepo & IsUserNotVisibleRepo, ValidateAddedChatMemberIsVisibleDTO> {
	public async validate(): Promise<void> {
		const input = this.input!;

		if (!await this.repository.isUserNotInChat(input.userId, input.chatId))
			return;

		await new ValidateUserIsVisible(this.repository, {
			actorId: input.actorId,
			userId: input.userId,
			permissionType: VuMeetPermission.canGetVuMeetContactList,
			activeOnly: true
		}).validate();
	}
}
