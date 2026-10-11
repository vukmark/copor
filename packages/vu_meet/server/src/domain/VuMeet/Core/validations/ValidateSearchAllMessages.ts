import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

import {ValidateCanSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateCanSearchAllMessages';

export class ValidateSearchAllMessages extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanSearchAllMessages(this.permissionRepo, this.input)];
	}
}
