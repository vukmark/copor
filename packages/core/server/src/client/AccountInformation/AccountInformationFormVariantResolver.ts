import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {AccountFormVariant} from '@copor/core/client/Core/Form/AccountFormVariant';
import {
	AccountInformationFormPresenterMap
} from '@copor/core/client/AccountInformation/AccountInformationFormPresenterMap';

export class AccountInformationFormVariantResolver {
	static resolve(
		targetRoleType: RoleType,
		actorRoleType: RoleType,
		context: AppContext
	): AccountFormVariant | undefined {
		const presenterConstructor = AccountInformationFormPresenterMap.resolve(targetRoleType, actorRoleType);

		if (!presenterConstructor)
			return undefined;

		return AccountInformationFormPresenterMap.instantiate(presenterConstructor, context).getVariant();
	}
}
