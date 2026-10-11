import {
	GetAccountInformationFormController
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/GetAccountInformationFormController';

export interface GetUserAccountInformationFormParams {
	id: string;
}

export class GetUserAccountInformationFormController extends GetAccountInformationFormController {
	protected getUserId(): string {
		const params = this.request.params as GetUserAccountInformationFormParams;

		return params.id;
	}
}
