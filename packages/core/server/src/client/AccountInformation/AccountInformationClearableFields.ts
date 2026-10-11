import {AppContext} from '@copor/core/client/Interface/AppContext';
import {AccountFormVariant} from '@copor/core/client/Core/Form/AccountFormVariant';
import {
	AccountInformationFormPresenterMap
} from '@copor/core/client/AccountInformation/AccountInformationFormPresenterMap';

export class AccountInformationClearableFields {
	private static readonly cache = new Map<AccountFormVariant, ReadonlySet<string>>();

	static get(variant: AccountFormVariant, context: AppContext): ReadonlySet<string> {
		const cached = AccountInformationClearableFields.cache.get(variant);

		if (cached)
			return cached;

		const presenter = AccountInformationFormPresenterMap.byVariant(variant, context);
		const names: ReadonlySet<string> = new Set(presenter?.getClearableFieldNames() ?? []);

		AccountInformationClearableFields.cache.set(variant, names);

		return names;
	}
}
