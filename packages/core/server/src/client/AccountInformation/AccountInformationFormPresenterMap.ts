import {AppContext} from '@copor/core/client/Interface/AppContext';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {AccountFormVariant} from '@copor/core/client/Core/Form/AccountFormVariant';
import {
	GenericAccountInformationFormPresenter
} from './GetUserAccountInformationForm/strategies/generic/GenericAccountInformationFormPresenter';

interface AccountFormDescriptor {
	getVariant(): AccountFormVariant;
	getClearableFieldNames(): string[];
}

export type AccountFormPresenterConstructor = new (
	input: never,
	context: AppContext
) => AccountFormDescriptor;

const emptyFormInput = {
	accountInformation: {address: {}, tenant: {}},
	countryList: [],
	citizenshipList: [],
	stateList: [],
	nativeLanguageList: []
} as never;

export class AccountInformationFormPresenterMap {
	private static readonly instanceCache = new Map<AccountFormPresenterConstructor, AccountFormDescriptor>();

	private static variantIndex?: Map<AccountFormVariant, AccountFormDescriptor>;

	static resolve(targetRoleType: RoleType, actorRoleType: RoleType): AccountFormPresenterConstructor | undefined {
		return GenericAccountInformationFormPresenter;
	}

	static instantiate(
		presenterConstructor: AccountFormPresenterConstructor,
		context: AppContext
	): AccountFormDescriptor {
		const cached = AccountInformationFormPresenterMap.instanceCache.get(presenterConstructor);

		if (cached)
			return cached;

		const presenter = new presenterConstructor(emptyFormInput, context);

		AccountInformationFormPresenterMap.instanceCache.set(presenterConstructor, presenter);

		return presenter;
	}

	static byVariant(variant: AccountFormVariant, context: AppContext): AccountFormDescriptor | undefined {
		return AccountInformationFormPresenterMap.getVariantIndex(context).get(variant);
	}

	private static getVariantIndex(context: AppContext): Map<AccountFormVariant, AccountFormDescriptor> {
		if (AccountInformationFormPresenterMap.variantIndex)
			return AccountInformationFormPresenterMap.variantIndex;

		const index = new Map<AccountFormVariant, AccountFormDescriptor>();
		const presenter = AccountInformationFormPresenterMap.instantiate(GenericAccountInformationFormPresenter, context);

		index.set(presenter.getVariant(), presenter);
		AccountInformationFormPresenterMap.variantIndex = index;

		return index;
	}
}
