
import {ValidateGetUserSpecificPermissionListRepo}
	from '@copor/core/domain/Components/Permission/repository/ValidateGetUserSpecificPermissionListRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyGetUserSpecificPermissionListValidatorStorageRepo implements ValidateGetUserSpecificPermissionListRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
