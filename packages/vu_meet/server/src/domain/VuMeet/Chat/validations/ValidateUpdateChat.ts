import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUpdateChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateUpdateChatDTO';
import {ValidateCanUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateCanUpdateChat';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateUpdateChatRepo';
import {ValidateGroupChatName} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateGroupChatName';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {ValidateChatMemberCount} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateChatMemberCount';
import {
	ValidateNoDuplicateChatMembers
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateNoDuplicateChatMembers';
import {
	ValidateAddedChatMemberIsVisible
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/validator/ValidateAddedChatMemberIsVisible';

export class ValidateUpdateChat extends ValidationWithPermissionAndRepo<ValidateUpdateChatDTO, ValidateUpdateChatRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateChat(this.permissionRepo, this.input.actorId),
			new ValidateChatMemberCount(this.input.userList.length + 1),
			new ValidateNoDuplicateChatMembers([...this.input.userList, this.input.actorId]),
			new ValidateGroupChatName(this.input.userList.length + 1, this.input.name),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.actorId, chatId: this.input.id}),
			...this.input.userList.map((userId) => new ValidateAddedChatMemberIsVisible(this.storageRepo, {
				actorId: this.input.actorId,
				chatId: this.input.id,
				userId
			}))
		];
	}
}
