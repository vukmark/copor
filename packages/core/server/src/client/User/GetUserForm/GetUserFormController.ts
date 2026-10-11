import {
	GetAccountInformationFormController
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/GetAccountInformationFormController';

export interface GetUserFormParams {
	id: string;
}

export class GetUserFormController extends GetAccountInformationFormController {
	protected getUserId(): string {
		const params = this.request.params as GetUserFormParams;

		return params.id;
	}
}
