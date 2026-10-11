import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

import {ValidateCanGetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanGetUserChatList';

export class ValidateGetUserChatList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetUserChatList(this.permissionRepo, this.input)];
	}
}
