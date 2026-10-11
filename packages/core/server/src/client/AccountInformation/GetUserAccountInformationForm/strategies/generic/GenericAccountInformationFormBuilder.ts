import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import AccountInformationFormBuilderBase from
	'@copor/core/client/AccountInformation/GetUserAccountInformationForm/strategies/AccountInformationFormBuilderBase';

export class GenericAccountInformationFormBuilder extends AccountInformationFormBuilderBase {
	buildPresenter(actorRoleType: RoleType) {
		return Promise.resolve(this.container.getPresenter(this.resolvePresenter(actorRoleType), {
			accountInformation: this.accountInformation
		}));
	}
}
