import {GetUserFullNameRepo} from '@copor/core/domain/User/repository/GetUserFullNameRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyGetUserFullNameInteractorRepo implements GetUserFullNameRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async load(id: string): Promise<string> {
		const userData = await UserKyselyHelper.getUserData(id, this.appContext);

		if (!userData)
			throw new Error('No user found');
		return userData.userFirstName + ' ' + userData.userLastName;
	}
}
