import {AccountFormVariant} from '../../../../Core/Form/AccountFormVariant';
import {
	AccountInformationClearableFields
} from '../../../../AccountInformation/AccountInformationClearableFields';
import {AppContext} from '../../../../Interface/AppContext';

const context = {envVariables: {}} as unknown as AppContext;

describe('AccountInformationClearableFields', () => {
	it.each(Object.values(AccountFormVariant))('builds a clearable field list for %s', (variant) => {
		expect(() => AccountInformationClearableFields.get(variant, context)).not.toThrow();
	});

	it('never marks a required field clearable', () => {
		const fields = AccountInformationClearableFields.get(AccountFormVariant.PERSONAL, context);

		expect(fields.has('firstName')).toBe(false);
		expect(fields.has('lastName')).toBe(false);
	});

	it('never marks a free-text field clearable', () => {
		const fields = AccountInformationClearableFields.get(AccountFormVariant.PERSONAL, context);

		expect(fields.has('email')).toBe(false);
		expect(fields.has('formVariant')).toBe(false);
	});
});
