import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

import {ValidateCanGetVuMeetContactList} from './permissions/ValidateCanGetVuMeetContactList';

export class ValidateGetVuMeetContactList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetVuMeetContactList(this.permissionRepo, this.input)
		];
	}
}