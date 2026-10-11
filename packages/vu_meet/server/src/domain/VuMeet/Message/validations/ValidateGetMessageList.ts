import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateChatExists} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateChatExists';
import {ValidateIsChatMember} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateIsChatMember';
import {ValidateCanGetMessageList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanGetMessageList';
import {ValidateGetMessageListDTO} from './dto/ValidateGetMessageListDTO';
import {ValidateGetMessageListRepo} from '../repository/ValidateGetMessageListRepo';

export class ValidateGetMessageList extends ValidationWithPermissionAndRepo <ValidateGetMessageListDTO, ValidateGetMessageListRepo> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetMessageList(this.permissionRepo, this.input.userId),
			new ValidateChatExists(this.storageRepo, this.input.chatId),
			new ValidateIsChatMember(this.storageRepo, {userId: this.input.userId, chatId: this.input.chatId})];
	}
}
