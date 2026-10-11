import {IsNotValidUserRepo} from '@copor/core/client/Core/Repository/IsNotValidUserRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyGetContactInfoForUserValidatorStorageRepo implements IsNotValidUserRepo {
	public isNotValidUser(userId: string): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
