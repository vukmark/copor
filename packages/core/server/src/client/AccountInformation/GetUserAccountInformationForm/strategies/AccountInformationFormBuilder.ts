import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {Container} from '@copor/core/client/Interface/Container';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import AccountInformationFormBuilderBase from
	'@copor/core/client/AccountInformation/GetUserAccountInformationForm/strategies/AccountInformationFormBuilderBase';
import {
	GenericAccountInformationFormBuilder
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/strategies/generic/GenericAccountInformationFormBuilder';

export class AccountInformationFormBuilder {
	static get(
		roleType: RoleType,
		accountInformation: GetUserAccountInformationDTO,
		container: Container
	): AccountInformationFormBuilderBase {
		return new GenericAccountInformationFormBuilder(accountInformation, container);
	}
}
