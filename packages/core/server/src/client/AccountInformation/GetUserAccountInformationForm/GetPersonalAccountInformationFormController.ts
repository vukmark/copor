import {
	GetAccountInformationFormController
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/GetAccountInformationFormController';

export class GetPersonalAccountInformationFormController extends GetAccountInformationFormController {
	protected getUserId(): string {
		return this.actorId;
	}
}
